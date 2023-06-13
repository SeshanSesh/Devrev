const mongoose=require('mongoose')

const ContactSchema=new mongoose.Schema({
   
    email:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    message:{
        type:String
    }

})

const Contact=mongoose.model('Contact',ContactSchema);
module.exports=Contact;