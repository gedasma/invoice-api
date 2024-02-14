const fs = require('fs')
const Invoice = require('../models/invoiceModel')



//Callbacks

exports.getAllInvoices = async (req,res)=>{
    try{
        const invoices = await Invoice.find()
        console.log(invoices)
        res
        .status(200)
        .json({
            status:'success',
            results:invoices.length,
            data:{
              invoices: invoices
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
    
};
 
exports.createInvoice = async (req, res)=>{
    try{
        const newInvoice = await Invoice.create(req.body)
        res
        .status(201)
        .json({
            status:'success',
            message: "New invoice created",
            data: newInvoice
        })
    }catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
};
 
exports.getInvoice = async (req,res)=>{
    try{
        const invoice = await Invoice.findById(req.params.id)
        res
    .status(200)
    .json({
        status:'success',
        data:{
            invoice
        }
    })
    }
    catch(err){
        res.status(404).json({
            status: 'failed to get by id',
            message: err
        })
    }
 
};

exports.getInvoicesFromPeriod = async (req,res)=>{
    try{
        const fromDate = new Date(req.params.from)
        const toDate = new Date(req.params.to)
        const invoices = await Invoice.find({
            date: { $gt: fromDate, $lt: toDate }})
        res
        .status(200)
        .json({
            status:'success',
            data:{
                invoices
            }
        })
    }
    catch(err){
        res.status(404).json({
            status: 'failed to get invoices from period',
            message: err
        })
    }
 
};

exports.getInvoicesFromPeriod = async (req,res)=>{
    try{
        const fromDate = new Date(req.params.from)
        const toDate = new Date(req.params.to)
        const invoices = await Invoice.find({
            date: { $gt: fromDate, $lt: toDate }})
        res
        .status(200)
        .json({
            status:'success',
            results:invoices.length,
            data:{
                invoices
            }
        })
    }
    catch(err){
        res.status(404).json({
            status: 'failed to get invoices from period',
            message: err
        })
    }
 
};

exports.getInvoicesSumFromPeriod = async (req,res)=>{
    try{
        const fromDate = new Date(req.params.from)
        const toDate = new Date(req.params.to)
        const invoices = await Invoice.find({
            date: { $gt: fromDate, $lt: toDate }})
        console.log(invoices)
        const invoicesSUm = invoices.reduce((valueSum, currentValue) => {
            return valueSum + currentValue.amount;
          }, 0)
        res
        .status(200)
        .json({
            status:'success',
            data:{
                from: fromDate.toISOString().split('T')[0],
                to: toDate.toISOString().split('T')[0],
                amount: invoices.length,
                sum: invoicesSUm
            }
        })
    }
    catch(err){
        res.status(404).json({
            status: 'failed to get invoices sum from period',
            message: err
        })
    }
 
};


function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date) && dateString.trim() !== '' && date.toString() !== 'Invalid Date';
  }
 
exports.updateInvoice = async (req,res)=>{
    try{
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators: true
        })
        res
        .status(200)
        .json({
            status:'success',
            message: "Invoice Updated",
            data: {
                invoice
            }
    })
    }
    catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
    
};
 
exports.deleteInvoice = async (req,res)=>{
    try{
        await Invoice.findByIdAndDelete(req.params.id)
        res
        .status(200)
        .json({
            status:'success',
            message: "Invoice deleted",
            data: null
    })
    }
    catch(err){
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
    
};