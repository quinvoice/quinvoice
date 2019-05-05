const { emoji } = require('../../service/emoji/emoji');
const { required } = require('../../service/validation/validation');
const { getNextNumber } = require('../../service/numeration/numeration');

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
    default: (choices) => getNextNumber(choices.date),
  },
]);

module.exports = {
  invoiceDate
};
