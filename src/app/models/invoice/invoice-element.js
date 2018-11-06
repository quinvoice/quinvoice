const { emoji } = require('../../service/emoji/emoji');
const { required } = require('../../service/validation/validation');

const invoiceElement = invoice => ([
  {
    type: 'confirm',
    name: 'confirm',
    message: 'Do you want to add invoice subject?',
  },
  {
    type: 'input',
    name: 'name',
    message: `${emoji('💡')} Description:`,
    when: choices => !invoice.elements.length || choices.confirm,
    validate: required,
  },
  {
    type: 'input',
    name: 'amount',
    message: `${emoji('📈')} Amount:`,
    default: 1,
    when: choices => !invoice.elements.length || choices.confirm,
    filter: value => Number(value),
    validate: required,
  },
  {
    type: 'input',
    name: 'value',
    message: `${emoji('💰')} Netto:`,
    when: choices => !invoice.elements.length || choices.confirm,
    filter: value => Number(value),
    validate: required,
  },
  {
    type: 'input',
    name: 'vatPercent',
    message: `${emoji('🤑')} Vat [%]:`,
    default: 23,
    when: choices => !invoice.elements.length || choices.confirm,
    filter: value => Number(value),
    validate: required,
  }
]);

module.exports = {
  invoiceElement,
};
