const inquirer = require('inquirer');
const storage = require('../../service/storage/file.storage');
const models = require('../../models');

const templateCreateAction = async () => {
  const companies = storage.read('companies') || [];
  const templates = storage.read('templates') || [];

  const template = await inquirer.prompt(models.template(companies));

  template.elements = [];

  let newElement;

  do {
    const {confirm, ...element} = await inquirer.prompt(models.invoiceElement(template));

    newElement = !template.elements.length || confirm;

    if (!template.elements.length || confirm) {
      template.elements.push(element);
    }
  } while(newElement);

  storage.write([...templates, template], 'templates');

  return Promise.resolve();
};

module.exports = {
  templateCreateAction
};
