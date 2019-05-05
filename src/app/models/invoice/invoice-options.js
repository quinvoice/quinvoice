const { emoji } = require('../../service/emoji/emoji');
const { required } = require('../../service/validation/validation');

const invoiceOptions = () => ([
  {
    type: 'list',
    name: 'paymentType',
    message: `${emoji('💵')} Payment type:`,
    choices: ['Transfer', 'Cash'],
  },
  {
    type: 'input',
    name: 'bankAccount',
    message: `${emoji('🏦')} Bank account:`,
  },
  {
    type: 'list',
    name: 'paymentPeriod',
    message: `${emoji('⌛')} Payment period:`,
    choices: ['3 days', '7 days', '14 days', '30 days'],
    filter: value => parseInt(value),
  },
  {
    type: 'input',
    name: 'personIssuing',
    message: `${emoji('👨')} Person issuing:`,
    validate: required,
  },
  {
    type: 'input',
    name: 'personReceiving',
    message: `${emoji('👨')} Person receiving:`,
  },
]);

module.exports = {
  invoiceOptions
};
