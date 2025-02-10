const { default: mongoose } = require("mongoose");

const CustomContactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

// Check if the model already exists
const CustomContact =  mongoose.models.CustomContact || mongoose.model('CustomContact', CustomContactSchema,'customContacts');
export default CustomContact;