const internModel= requre("../models/interModel")
const {isValid, isValidName}=require("../middleware/validation")

const createInterns=async function(req,res){
    try{
        let{name,email,mobile,collegeId}=req.body

        if (!isValid(name)) {
            return res.status(400).send({ msg: "Enter College Name" })
        }
        if (!isValidName(name)) {
            return res.status(400).send({ msg: "Enter a valid College Name" })
        }
        if (!isValid(fullName)) {
            return res.status(400).send({ msg: "Enter College Full Name" })
        }
        if (!isValidName(fullName)) {
            return res.status(400).send({ msg: "fullname only take alphabets" })
        }
        if (!isValid(logoLink)) {
            return res.status(400).send({ msg: "Enter College Logo-Link" })
        }
        if (!isValidLink(logoLink)) {
            return res.status(400).send({ msg: "Enter a valid url" })
        }

        let collegeData=await collegeModel.create(req.body)
        res.status(201).send(collegeData)
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createInterns=createInterns