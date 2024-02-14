const express = require('express')
const router = express.Router()
const invoiceController = require('../controllers/invoiceController')


router
.route('/')
.get(invoiceController.getAllInvoices)
.post(invoiceController.createInvoice)
router
.route('/:id')
.get(invoiceController.getInvoice)
.patch(invoiceController.updateInvoice)
.delete(invoiceController.deleteInvoice)
router
.route('/:from/:to')
.get(invoiceController.getInvoicesFromPeriod)
router
.route('/sum/:from/:to')
.get(invoiceController.getInvoicesSumFromPeriod)

module.exports = router