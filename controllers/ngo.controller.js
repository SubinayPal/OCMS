const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User=mongoose.model('NgoUsers')
const session = require('express-session')


router.post('/',(req,res)=>{
    const obj= new User(req.body);
    obj.save((err,data)=>{
        console.log("Data Saved");
        res.redirect('ngoHome');
        
    })
    
    console.log(obj);
})

router.use(session({
    secret: "Secret Key",
    saveUninitialized: true,
    resave: false
}));

router.post('/ngoLogin',(req,res)=>{
    var uid=req.body.uid;
    var pwd=req.body.pass;
    var query={$and : [{uid:uid},{pwd:pwd}]};
    User.find(query).then((result)=>{
        /*console.log(result)*/
        if(result==0)
    {
        console.log("Wrong input");
    }
    else{
        const sess=req.session;
        sess.uid=uid;
        //sess.ngoname=result[0].ngoname;
        sess.save();
        console.log("Login successful"+sess.uid);
        res.render('ngoPage',{uid:req.session.uid});
    }
    })
})

router.get('/changepass',(req,res)=>{
    res.render('changePass',{uid:req.session.uid});
})
router.get('/op',(req,res)=>{
    var pwd=req.query.pwd;
    var uid=req.session.uid;
    var query={$and : [{uid:uid, pwd:pwd}]}
    User.find(query,(err,result)=>{
        if(result.length==0)
        {
            
            res.send("Invalid Password")
        }
    })
    console.log(pwd)
})

router.post('/updatepass',(req,res)=>{
    var pwd=req.body.repass
    var uid=req.session.uid
    //console.log(pwd+" "+uid)
    var query={"uid":uid}
    User.updateOne(query,{$set:{pwd:pwd}},(err,result)=>{
        console.log(result);
    })
})

router.get("/updateprofile",(req,res)=>{
    var uid=req.session.uid;
    var query = {uid:uid}
    User.find(query,(err,result)=>{
        //console.log("Checked Data");
        //console.log(result);
        res.render('updateProfile',{uid:req.session.uid, data:result[0]})
    })
})

router.post("/updateprofile",(req,res)=>{
    const user=User(req.body);
    const id=req.body._id;
    var query={_id:id}
    User.findOneAndUpdate({_id:id},user,{new:true},(err,data)=>{
        if(!err){
            console.log(data);
        }
        else{
            console.log("Error");
        }
    })
})

router.get('/raisefund',(req,res)=>{
    res.render('raiseFund',{uid:req.session.uid});
})

module.exports=router