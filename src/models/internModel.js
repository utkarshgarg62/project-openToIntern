const mongoose = require("mongoose")  // importing mongoose
const ObjectId = mongoose.Schema.Types.ObjectId


const internSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, "Name is required here."],
        trim: true,
        
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        trim:true,
        unique:true
        
    },
    mobile:{
        type:String,
        required:[true, "Mobile no is required"],
        trim:true,
        unique:true
        
    },
    collegeId:{
        type:ObjectId,
        trim:true,
        refs: "College"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
}, {timestamps:true}
)
 module.exports = mongoose.model("Intern", internSchema)
