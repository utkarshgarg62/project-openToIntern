const collegeModel= requre("../models/collegeModel")

const createCollege=async function(req,res){
    try{
        let data=req.body
        let collegeData=await collegeModel.create(data)
        res.status(201).send(collegeData)
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
