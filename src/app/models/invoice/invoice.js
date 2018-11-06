const { invoiceDate } = require('./invoice-date');
const { invoiceBuyer, invoiceSeller } = require('./invoice-company');
const { invoiceOptions } = require('./invoice-options');

const invoice = companies => ([
  ...invoiceDate(),
  ...invoiceSeller(companies),
  ...invoiceBuyer(companies),
  ...invoiceOptions(),
]);

module.exports = {
  invoice
};
