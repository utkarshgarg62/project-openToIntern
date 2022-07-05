const internModel = require("../models/internModel")
const { isValid, isValidName, isValidEmail, isValidMobile } = require("../middleware/validation")
const collegeModel = require("../models/collegeModel")


//================================================Create Intern Api===================================================================

const createInterns = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        let { name, email, mobile, collegeName } = req.body

        if (Object.keys(req.body).length < 1) {
            return res.status(400).send({ message: "Insert data :Bad request" })
        }

        let clgName = collegeName.toLowerCase().trim()
        req.body.collegeName=clgName

        if (!isValid(name)) {
            return res.status(400).send({ message: "Enter Intern Name" })
        }
        if (!isValidName(name)) {
            return res.status(400).send({ message: "Enter a valid Name" })
        }
        if (!isValid(email)) {
            return res.status(400).send({ message: "Enter a Email" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ message: "Enter a valid email" })
        }
        if (!isValid(mobile)) {
            return res.status(400).send({ message: "Enter Mobile Number" })
        }
        if (!isValidMobile(mobile)) {
            return res.status(400).send({ message: ` ${mobile} is not a vaild Mobile Number` })
        }
        if (!isValid(clgName)) {
            return res.status(400).send({ status: false, message: "Please Enter College Name" })
        }

        let checkEmail = await internModel.findOne({ email: email, isDeleted:false})
        if (checkEmail) return res.status(400).send({ message: "Email Already Registered" })

        let checkMobile = await internModel.findOne({ mobile: mobile, isDeleted:false})
        if (checkMobile) return res.status(400).send({ message: "Mobile Already Registered" })

        let checkClgName = await collegeModel.findOne({ name: clgName, isDeleted: false })
        if (!checkClgName) return res.status(404).send({ status: false, message: ` No such college Name Not Found!` });

        let clgId = checkClgName._id
        req.body.collegeId = clgId

        let internData = await internModel.create(req.body)
        res.status(201).send({ status: true, data: internData })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.createInterns = createInterns


//=====================================================================================================================================
