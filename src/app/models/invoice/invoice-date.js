const moment = require('moment');
const { emoji } = require('../../service/emoji/emoji');
const { required } = require('../../service/validation/validation');

const invoiceDate = () => ([
  {
    type: 'datetime',
    name: 'date',
    format: ['dd', '-', 'mm', '-', 'yyyy'],
    message: `${emoji('📆')} Date:`,
    validate: required,
  },
  {
    type: 'input',
    name: 'number',
    message: `${emoji('🔢')} Number:`,
    default: (choices) => moment(choices.date).format('1/M/YYYY'),
  },
]);

module.exports = {
  invoiceDate
};
