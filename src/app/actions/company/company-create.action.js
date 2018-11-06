const inquirer = require('inquirer');
const storage = require('../../service/storage/file.storage');
const models = require('../../models');

const companyCreateAction = async () => {
  const companies = storage.read('companies') || [];

  const company = await inquirer.prompt(models.company(companies));

  storage.write([...companies, company], 'companies');

  return Promise.resolve();
};

module.exports = {
  companyCreateAction
};
