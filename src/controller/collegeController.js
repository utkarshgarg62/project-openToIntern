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
        if (!isValidCollegeName(name)) {
            return res.status(400).send({ msg: "Enter a valid College Name" })
        }
        if (!isValid(fullName)) {
            return res.status(400).send({ msg: "Enter College Full Name" })
        }
        // if (!isValidName(fullName)) {
        //     return res.status(400).send({ msg: "Enter a valid full Name contains only alphabets" })
        // }
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

        let  getClg = await collegeModel.find({name:clgName})
        if (!getClg) return res.status(404).send({ status: false, msg: "No such college Name found", });
        
        let clgId=getClg._id 
        console.log(clgId)

        let  getData = await internModel.find({collegeId:clgId}).select({_id:1,name:1,name:1,email:1,mobile:1,collegeId:0}).populate("collegeId")
        //if (!getData.length) return res.status(404).send({ status: false, msg: "No intern Apply for This College", });
        
            if (getClg.length > 0) {
                res.status(200).send({ status: true, data: getClg,getData})
            }
            else {
                res.status(404).send({ status: false, msg: "No data found" })
            }
    }
    catch (err) {
        res.status(500).send({ msg:err.message})
    }
}
module.exports.getCollegeDetails = getCollegeDetails

//.select({_id:0,name:1,fullName:1,logoLink:1})