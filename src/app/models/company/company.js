const { emoji } = require('../../service/emoji/emoji');
const { required, nip } = require('../../service/validation/validation');

const matchCompany = (field, companies) => ({chosenCompany}) => {
  const company = companies.find(({name}) => name === chosenCompany);

  return company ? company[field] : null;
};

const company = companies => ([
  {
    type: 'input',
    name: 'name',
    message: `${emoji('🏢')} Company name:`,
    default: matchCompany('name', companies),
    validate: required,
  },
  {
    type: 'input',
    name: 'street',
    message: `${emoji('🏠')} Street and number:`,
    default: matchCompany('street', companies),
    validate: required,
  },
  {
    type: 'input',
    name: 'city',
    message: `${emoji('🌃')} City:`,
    default: matchCompany('city', companies),
    validate: required,
  },
  {
    type: 'input',
    name: 'postCode',
    message: `${emoji('📪')} Post code:`,
    default: matchCompany('postCode', companies),
    validate: required,
  },
  {
    type: 'input',
    name: 'nip',
    message: `${emoji('💼')} NIP:`,
    default: matchCompany('nip', companies),
    validate: nip,
  },
]);

module.exports = {
  company,
};
