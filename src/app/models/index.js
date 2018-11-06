const { company } = require('./company/company');
const { companySelect } = require('./company/company-select');
const { invoice } = require('./invoice/invoice');
const { invoiceDate } = require('./invoice/invoice-date');
const { invoiceElement } = require('./invoice/invoice-element');
const { template } = require('./template/template');
const { invoiceOptions } = require('./invoice/invoice-options');
const { templateSelect } = require('./template/template-select');

module.exports = {
  company,
  companySelect,
  invoice,
  invoiceDate,
  invoiceElement,
  template,
  invoiceOptions,
  templateSelect,
};
