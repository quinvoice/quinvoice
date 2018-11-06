const { emoji } = require('../../service/emoji/emoji');
const { company } = require('../company/company');

const invoiceCompany = (companies, key, label) => ([
  {
    type: 'list',
    name: key,
    message: `${emoji('👨‍💼')} ${label}:`,
    choices: ['+ Add new', ...companies.map(({name}) => name)],
    filter: value => companies.find(({name}) => value === name),
  },
  ...company(companies).map(element => ({
    ...element,
    name: `${key}.${element.name}`,
    when: choices => !choices[key] || !choices[key][element.name],
  })),
]);

const invoiceBuyer = companies => invoiceCompany(companies, 'buyer', 'Buyer');
const invoiceSeller = companies => invoiceCompany(companies, 'seller', 'Seller');

module.exports = {
  invoiceBuyer,
  invoiceSeller,
};
