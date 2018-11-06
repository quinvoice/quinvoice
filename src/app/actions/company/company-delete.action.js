const inquirer = require('inquirer');
const storage = require('../../service/storage/file.storage');
const models = require('../../models');

const companyDeleteAction = async () => {
  const companies = storage.read('companies');

  const {chosenCompany, confirm} = await inquirer.prompt([
    models.companySelect(companies),
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Do you really want delete this company?',
    },
  ]);

  if (confirm) {
    storage.write(
      companies.map(element => element.name === chosenCompany ? null : element).filter(element => element),
      'companies'
    );
  }

  return Promise.resolve();
};

module.exports = {
  companyDeleteAction
};
