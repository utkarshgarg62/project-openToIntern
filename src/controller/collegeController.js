const collegeModel= require("../models/collegeModel")
const {isValid, isValidName, isValidCollegeName,isValidLink}=require("../middleware/validation")
const internModel = require("../models/internModel")

const createCollege=async function(req,res){
    try{
        let{name,fullName,logoLink}=req.body
        
        if(Object.keys(req.body).length<1) {return res.status(400).send({msg:"Insert data :Bad request"})}

        if (!isValid(name)) {
            return res.status(400).send({ msg: "Enter College Name" })
        }
        if (!isValidName(name)) {
            return res.status(400).send({ msg: "Enter a valid College abrivation" })
        }

        let Name = req.body.name.toLowerCase().trim()
        let checkClg = await collegeModel.findOne({ name: Name });
        if (checkClg) return res.status(400).send({ status: false, msg: "College Name Already Exists" });


        if (!isValid(fullName)) {
            return res.status(400).send({ msg: "Enter College Full Name" })
        }
        if (!isValidCollegeName(fullName)) {
            return res.status(400).send({ msg: "Enter a valid College Name" })
        }
        if (!isValid(logoLink)) {
            return res.status(400).send({ msg: "Enter College Logo-Link" })
        }
        if (!isValidLink(logoLink)) {
            return res.status(400).send({ msg: "Enter a valid url" })
        }

        let collegeData=await collegeModel.create(req.body)
        res.status(201).send({status:true,data:collegeData})
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.createCollege=createCollege



const getCollegeDetails = async function (req, res) {
    try {
        let data=req.query
        if (!Object.keys(data).length) return res.status(400).send({ status: false, msg: "Please Enter The College Name", });
        let clgName=data.collegeName.toLowerCase()

        let  getClg = await collegeModel.findOne({name:clgName})
        if (!getClg) return res.status(404).send({ status: false, msg: "No such college Name found", });
        
        let clgId=getClg._id 
        console.log(clgId)

        let  getData = await internModel.find({collegeId:clgId}).select({_id:1,name:1,email:1,mobile:1,collegeId:1})
        if (!getData.length) return res.status(404).send({ status: false, msg: "No intern Apply for This College", });

        let Name=getClg.name
        let FullName=getClg.fullName
        let LogoLink=getClg.logoLink

        let collegeDetails={
        name:Name,
        fullName:FullName,
        logoLink:LogoLink,
        interns:getData
    }
    res.status(200).send({ status: true, data: collegeDetails})
          
    }
    catch (err) {
        res.status(500).send({ msg:err.message})
    }
}
module.exports.getCollegeDetails = getCollegeDetails

//.select({_id:0,name:1,fullName:1,logoLink:1})