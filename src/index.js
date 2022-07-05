const express= require('express')
const bodyparser=require('body-parser')
const multer = require('multer')
const route=require('./route/route')
const mongoose=require('mongoose')
const app=express()


app.use(bodyparser.json())
app.use(multer().any());

app.use(bodyparser.urlencoded({extended:true}))

//===================================================Data-Base Connection=================================================================


mongoose.connect("mongodb+srv://functionup-radon-cohort:radon123@cluster0.zbsotuc.mongodb.net/group56Database?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


//========================================================================================================================================


app.use('/', route)  


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});