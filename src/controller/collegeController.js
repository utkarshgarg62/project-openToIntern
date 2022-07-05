const collegeModel = require("../models/collegeModel")
const { isValid, isValidCollegeName, isValidLink, isValidClgName } = require("../middleware/validation")
const internModel = require("../models/internModel")

//================================================Create College Api===================================================================


const createCollege = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        let { name, fullName, logoLink } = req.body

        if (Object.keys(req.body).length < 1) { return res.status(400).send({ message: "Insert data :Bad request" }) }

        let Name = req.body.name.toLowerCase().trim()
        req.body.name=Name

        let FullName = fullName.trim()
        req.body.fullName=FullName

        let LogoLink = logoLink.trim() 
        req.body.logoLink=LogoLink

        if (!isValid(Name)) { 
            return res.status(400).send({ message: "Enter College Name" })
        }
        if (!isValidClgName(Name)) {
            return res.status(400).send({ message: "Enter a valid College Name" })
        }
        if (!isValid(FullName)) {
            return res.status(400).send({ message: "Enter College Full Name" })
        }
        if (!isValidCollegeName(FullName)) {
            return res.status(400).send({ message: "Enter a valid College Full Name" })
        }
        if (!isValid(LogoLink)) {
            return res.status(400).send({ message: "Enter College Logo-Link" })
        }
        if (!isValidLink(LogoLink)) {
            return res.status(400).send({ message: "Enter a valid url" })
        }

        let checkClg = await collegeModel.findOne({ name: Name, isDeleted: false });
        if (checkClg) return res.status(400).send({ status: false, message: "College Name Already Exists" });
       
        let collegeData = await collegeModel.create(req.body)
        res.status(201).send({ status: true, data: collegeData })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.createCollege = createCollege

//================================================Get College Details Api===================================================================


const getCollegeDetails = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        let data = req.query

        if (Object.keys(data).length<1) return res.status(400).send({ status: false, msg: "Please Enter The College Name", });
        let clgName = data.collegeName.toLowerCase().trim()

        let getClg = await collegeModel.findOne({ name: clgName, isDeleted: false })
        if (!getClg) return res.status(404).send({ status: false, msg: "No such college found", });
        
        let clgId = getClg._id

        let getData = await internModel.find({ collegeId: clgId, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
        if (!getData.length) return res.status(404).send({ status: false, msg: "No intern Apply for This College", });

        let collegeDetails = {
            name: getClg.name,
            fullName: getClg.fullName,
            logoLink: getClg.logoLink,
            interns: getData
        }
        res.status(200).send({ status: true, data: collegeDetails })

    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}
module.exports.getCollegeDetails = getCollegeDetails

//===============================================================================================================================
