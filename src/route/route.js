const express = require('express');
const router = express.Router();
const collegeController=require("../controller/collegeController")
const internController=require("../controller/internController")

//================================================API's=========================================================================

router.post("/functionup/colleges",collegeController.createCollege)
router.post("/functionup/interns",internController.createInterns)
router.get("/functionup/collegeDetails",collegeController.getCollegeDetails)

//==============================================================================================================================


module.exports = router;