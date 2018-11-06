const { emoji } = require('../../service/emoji/emoji');
const { required } = require('../../service/validation/validation');
const { invoiceBuyer, invoiceSeller } = require('../invoice/invoice-company');
const { invoiceOptions } = require('../invoice/invoice-options');

const template = companies => ([
  {
    type: 'input',
    name: 'templateName',
    message: `${emoji('🔠')} Template name:`,
    validate: required,
  },
  ...invoiceSeller(companies),
  ...invoiceBuyer(companies),
  ...invoiceOptions(),
]);

module.exports = {
  template
};
