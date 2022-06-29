const internModel= require("../models/internModel")
const {isValid, isValidName,isValidEmail,isValidMobile,isValidObjectId}=require("../middleware/validation")

const createInterns=async function(req,res){
    try{
        let{name,email,mobile,collegeId}=req.body

        if(Object.keys(req.body).length<1) {
            return res.status(400).send({msg:"Insert data :Bad request"})
        }

        if (!isValid(name)) {
            return res.status(400).send({ msg: "Enter College Name" })
        }
        if (!isValidName(name)) {
            return res.status(400).send({ msg: "Enter a valid Name" })
        }
        if (!isValid(email)) {
            return res.status(400).send({ msg: "Enter a Email" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ msg: "Enter a valid email" })
        }
        let checkEmail=await internModel .findOne({email:email})
        if(checkEmail) return res.status(400).send({msg :"Email Already Registered"})

        if (!isValid(mobile)) {
            return res.status(400).send({ msg: "Enter Mobile Number" })
        }
        if (!isValidMobile(mobile)) {
            return res.status(400).send({ msg: "Enter Valid Mobile Number" })
        }
        let checkMobile=await internModel .findOne({mobile:mobile})
        if(checkMobile) return res.status(400).send({msg :"Mobile Already Registered"})

        if (!isValid(collegeId)) {
            return res.status(400).send({ msg: "Enter College Logo-Link" })
        }
        if (!isValidObjectId(collegeId)) {
            return res.status(400).send({ msg: "Enter a valid url" })
        }

        
        let internData=await internModel.create(req.body)
        res.status(201).send({ status: true, data: internData })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createInterns=createInterns