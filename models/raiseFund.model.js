const mongoose = require('mongoose')

const raiseFundSchema = new mongoose.Schema({
    fundRiseTopic:String,
    startDate:String,
    endDate:String,
    ngoName:String,
    imgname:String
    /*address:String,
    state:String,
    pin:Number,
    country:String,
    dos:Date,
    countrycode:Number,
    phone:Number,
    uid:String,
    pwd:String*/
})

module.exports = mongoose.model('raiseFund',raiseFundSchema)