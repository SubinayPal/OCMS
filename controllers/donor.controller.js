const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User=mongoose.model('raiseFund')
const donorUsers=mongoose.model('donorUsers')
const session = require('express-session')
const multer = require("multer");
//const { path } = require('express/lib/application')
const path = require('path');
var image_name=''
const storage = multer.diskStorage({
    // Destination to store image     
    destination: (req, file, cb) => {
          cb(null,'public/upload_images')
    },
    filename:(req,file,cb)=>{
        image_name=Date.now()+path.extname(file.originalname)
        cb(null,image_name)
    }
});
const upload = multer({storage:storage})
router.use(session({
    secret: "Secret Key",
    saveUninitialized: true,
    resave: false
}));

router.get("/donorHome",(req,res)=>{
    User.find((err,data)=>{
        if(!err)
        {
            console.log(data);
            res.render('donorDashboard.ejs',{data:data});
        }
        
    })
    
    })

router.post('/',upload.single('image'),(req,res)=>{
    const obj= new User(req.body);
    obj.imgname=image_name
    obj.save((err,data)=>{
        if(!err)
        {
            
        }
        console.log("Data Saved");
        /*console.log(data);*/
        /*res.render('raiseFund');*/
    })
})

router.get('/donorsignin',(req,res)=>{
    res.render('donorSignIn',{msg:''});
})

router.get('/donorsignup',(req,res)=>{
    res.render('donorSignUp');
})

router.post('/donorregister',(req,res)=>{
    const obj= new donorUsers(req.body);
    obj.save((err,data)=>{
        console.log("Data Saved");
        console.log(data);
        //res.redirect('ngoHome');
        
    })
    
    
})

router.post('/donorsignincheck',(req,res)=>{
    const uid =req.body.uid;
    const pwd =req.body.pwd;
    //console.log(uid);
    var query = { $and:[{uid:uid},{pwd:pwd}]}
    donorUsers.find(query,(err,data)=>{
        if(data.length==0)
        {
            res.render('donorSignIn',{msg:'Unauthorized User'})
        }
        else{
            res.render('donationPage')
        }
    })
})


module.exports=router