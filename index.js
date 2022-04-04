require('./models/db')
const express=require('express');
const bodyparser=require('body-parser');
const mongoose = require('mongoose')
const multer = require("multer");
const app=express();
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());

var ngoController=require('./controllers/ngo.controller.js')
var donorController=require('./controllers/donor.controller.js')
app.use("/ngo",ngoController)
app.use("/donor",donorController)

app.get("/",(req,res)=>{
    res.render('index');
})

app.get("/adminHome",(req,res)=>{
    res.render('adminHome.ejs');
})



app.get("/ngoHome",(req,res)=>{
    res.render('ngoHome.ejs');
})

app.get("/registerNgo",(req,res)=>{
    res.render('registerNgo.ejs');
})




app.listen(3000,()=>{
    console.log("Server is running at port 3000");
})

