const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Invoice must have name'],
    },
    amount:{
        type:Number,
        required:[true, 'Invoice must have a amount']
    },
    date:{
        type:Date,
        required:[true, 'Invoice must have a date']
    },
    note:{
        type:String
    }
})

const Invoice = mongoose.model('Invoice', invoiceSchema)

module.exports = Invoice;