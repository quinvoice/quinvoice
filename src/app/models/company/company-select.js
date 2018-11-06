const { emoji } = require('../../service/emoji/emoji');

const companySelect = companies => ({
  type: 'list',
  name: 'chosenCompany',
  message: `${emoji('🏬')} Choose the company:`,
  choices: companies.map(({name}) => name),
});

module.exports = {
  companySelect,
};
