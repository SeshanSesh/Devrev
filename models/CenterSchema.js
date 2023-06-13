const mongoose=require('mongoose');


const CenterSchema=new mongoose.Schema({
    centername:{
        type:String,
        required:true
    },
    
    address:{
        type:String,
        required:true
    },

    morningslot:{
        type:String,
        required:true
    },
    eveningslot:{
        type:String,
        required:true
    },

    city:{
        type:String,
        required:true
    },

    pincode:{
        type:String,
        required:true
    },

    availableslots:{
        type:Number,
        required:true
    }

})
const Center=mongoose.model('Center',CenterSchema, 'center');
module.exports=Center;