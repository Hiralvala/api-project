const { default: mongoose } = require("mongoose");

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
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
const Contact =  mongoose.models.Contact || mongoose.model('Contact', contactSchema);
export default Contact;