const mongoose = require('mongoose')

const newNgoUserSchema = new mongoose.Schema({
    ngoname:String,
    ceoname:String,
    email:String,
    locality:String,
    address:String,
    state:String,
    pin:Number,
    country:String,
    dos:Date,
    countrycode:Number,
    phone:Number,
    uid:String,
    pwd:String
})

module.exports = mongoose.model('NgoUsers',newNgoUserSchema)