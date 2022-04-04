const mongoose = require('mongoose')
const newDonorDetailSchema = new mongoose.Schema({
    donorname:String,
    donoremail:String,
    uid:String,
    pwd:String
})

module.exports = mongoose.model('donorUsers',newDonorDetailSchema)