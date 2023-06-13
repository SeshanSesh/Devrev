const mongoose=require('mongoose');

const HospitalSchema = new mongoose.Schema({
    centername: String,
    address : String, 
    morningslot: String,
    eveningslot: String,
    city:String,
    pincode:Number,
    availableslots:Number
  });

  
const Hospital=mongoose.model('Hospital',HospitalSchema,'center');

module.exports=Hospital;