const express = require("express");
const mongoose = require("mongoose");
const app = express();
const axios = require("axios");
const path = require('path');
app.use(express.json());

const User = require("./models/UserSchema");
const Admin = require("./models/AdminSchema");
const Hospital = require("./models/HospitalSchema");
const Center = require("./models/CenterSchema");
app.use(express.urlencoded());

mongoose.connect("mongodb://0.0.0.0:27017/vaccine", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

  

app.use(express.static(__dirname + '/public'));

app.set("view-engine", "ejs");
app.set('views', path.join(__dirname, 'views')); 

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Sesh" });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/addcenter", (req, res) => {
  res.render("Addcenter.ejs");
});

app.get("/deletecenter", (req, res) => {
  res.render("Removecenter.ejs");
});

app.post("/verify", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email, password })
    .then(user => {
      if (user) {
        // User credentials are valid
        res.redirect("/search");
      } else {
        // User credentials are invalid
      
        res.redirect("/register");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
});

app.use("/Adminlogin", (req, res) => {
  res.render("Adminlogin.ejs");
});

app.post("/verifyadmin", (req, res) => {
  const { email, password } = req.body;
  Admin.findOne({ email, password })
    .then(admin => {
      if (admin) {
        // User credentials are valid
        //res.redirect("/Addcenter");
        res.render("choose.ejs");
      } else {
        // User credentials are invalid
      
        res.redirect("/register");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
});


app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/seshan", (req, res) => {
  // const { FirstName, LastName, email, password, phoneno, adhaarno, address, city, zipcode } = req.body;
  console.log("suru");
  console.log(req.body);

  // Validate the form data
  // Add any necessary validation checks here

  // Create a new User object
  const newUser = new User({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    email: req.body.email,
    password: req.body.password,
    phoneno: req.body.phoneno,
    aadharno: req.body.aadharno,
    address: req.body.address,
    city: req.body.city,
    zipcode: req.body.zipcode,
  });

  // Save the new user to the database
  newUser
    .save()
    .then(() => {
      res.redirect("/login"); // Redirect to the login page after successful registration
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
});

app.post("/Addcenter", (req, res) => {
  
  console.log("suru");
  console.log(req.body);

  // Validate the form data
  // Add any necessary validation checks here

  // Create a new User object
  const newCenter = new Center({
    centername: req.body.centername,
    address: req.body.address,
    morningslot: req.body.morningslot,
    eveningslot: req.body.eveningslot,
    city: req.body.city,
    pincode: req.body.pincode,
    availableslots: "10",
  });

  // Save the new user to the database
  newCenter
    .save()
    .then(() => {
      res.redirect("/login"); // Redirect to the login page after successful registration
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
});



app.get("/search", (req, res) => {
  res.render("search.ejs");
});


// Search nearby hospitals

app.post("/searchForm", (req, res) => {
  const { city } = req.body;
  console.log(city);
  Hospital.find({ city})
    .then((hospitals) => {
      console.log(hospitals);
      res.render("center.ejs", { appro: hospitals });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
});

app.post("/searchForm2", (req, res) => {
  const { cityy } = req.body;
  console.log(cityy);
  Hospital.find({ cityy})
    .then((hospitals) => {
      console.log(hospitals);
      res.render("deletecenter.ejs", { appro: hospitals });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
});

app.post('/deletee', (req, res) => {
  // Retrieve the centerId from the request body
  const centerId = req.body.centerId;
  
  Hospital.findByIdAndDelete(centerId)
    .then(() => {
      console.log("Deleted successfully");
      res.render("choose.ejs");
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.post('/availableslots', (req, res) => {
  // Retrieve the centerId from the request body
  const centerId = req.body.centerId;
  
  // Validate the centerId format
  if (!mongoose.Types.ObjectId.isValid(centerId)) {
    res.status(400).json({ message: 'Invalid center ID' });
    return;
  }

  // Query the database to get the center by its ID
  Hospital.findById(centerId)
    .then(center => {
      if (center) {
        if (center.availableSlots < 10) {
          res.render('Available');
        } else {
          res.render('NoSlots');
        }
      } else {
        res.status(404).json({ message: 'Vaccination center not found' });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});





app.listen(5000);
