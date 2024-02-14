const express = require('express');
const app = express();
app.use(express.json())
const invoiceRoutes = require('./routes/invoiceRoutes')
const morgan = require('morgan')


app.use(morgan('dev'))
 
 
//Mounting router
app.use('/api/v1/invoices',invoiceRoutes);

 
 


module.exports = app