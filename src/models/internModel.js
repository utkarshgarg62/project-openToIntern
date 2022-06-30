const mongoose = require("mongoose")  // importing mongoose
const ObjectId = mongoose.Schema.Types.ObjectId


const internSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    mobile: {
        type: String,
        required: true,
        unique: true
    },

    collegeId: {
        type: ObjectId,
        ref: "collegeModel"
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model("internModel", internSchema)
