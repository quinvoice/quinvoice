const inquirer = require('inquirer');
const storage = require('../../service/storage/file.storage');
const models = require('../../models');

const companyUpdateAction = async () => {
  const companies = storage.read('companies') || [];

  const {chosenCompany, ...company} = await inquirer.prompt([
    models.companySelect(companies),
    ...models.company(companies),
  ]);

  storage.write(companies.map(element => element.name === chosenCompany ? company : element), 'companies');

  return Promise.resolve();
};

module.exports = {
  companyUpdateAction
};
