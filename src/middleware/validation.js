const mongoose = require("mongoose")

//clg Name Validation
const isValidClgName = function (name) {
    const nameRegex = /^[a-zA-Z]{2,30}$/
    return nameRegex.test(name)
}

//Name Validation
const isValidName = function (name) {
    const nameRegex = /^[a-zA-Z ]{2,30}$/
    return nameRegex.test(name)
}

//College Full Name Validation
const isValidCollegeName = function (name) {
    const nameRegex = /\w+([, ]+\w+){1,2}/
    return nameRegex.test(name)
}

//Email Validation
const isValidEmail = function (email) {
    const emailRegex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
    return emailRegex.test(email)
}

//Url Validation
const isValidLink = function (link) {
    const url = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return url.test(link)
}

//ObjectId Validation
const isValidObjectId = function (id) {
    var ObjectId = mongoose.Types.ObjectId;
    return ObjectId.isValid(id)
}

//Mobile Validation
const isValidMobile = function (mobile) {
    var re = /^((\+91)?|91)?[6789][0-9]{9}$/;
    return re.test(mobile);
}

//Value Validation
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value !== 'string' || value.trim().length === 0) return false
    return true
}




module.exports = { isValidName, isValidEmail, isValidObjectId, isValidMobile, isValid, isValidLink, isValidCollegeName, isValidClgName }