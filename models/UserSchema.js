const mongoose=require('mongoose');


const UserSchema=new mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:
    {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    
    password:{
        type:String,
        required:true
    },
    phoneno:{
        type:String,
        required:true
    },
    aadharno:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
   
    city:{
        type:String,
        required:true
    },
    zipcode:{
        type:String,
        required:true
    }

})



const User=mongoose.model('User',UserSchema,'Usercredentials');

module.exports=User;