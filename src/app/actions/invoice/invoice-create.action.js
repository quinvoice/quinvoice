const inquirer = require('inquirer');
const storage = require('../../service/storage/file.storage');
const { generate } = require('../../service/pdf/generator');
const models = require('../../models');

inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'));

const invoiceCreateAction = (params, i18n) => async () => {
  const companies = storage.read('companies') || [];
  const templates = storage.read('templates') || [];

  if (templates.length) {
    const template = await inquirer.prompt([models.templateSelect(templates)]);

    if (template.name) {
      return createFromTemplate(template.name, i18n);
    }
  }

  const invoice = await inquirer.prompt(models.invoice(companies));

  invoice.elements = [];

  let newElement;

  do {
    const {confirm, ...element} = await inquirer.prompt(models.invoiceElement(invoice));

    newElement = !invoice.elements.length || confirm;

    if (!invoice.elements.length || confirm) {
      invoice.elements.push(element);
    }
  } while(newElement);

  generate(invoice, i18n);

  return Promise.resolve();
};

const createFromTemplate = async (template, i18n) => {
  const invoice = await inquirer.prompt(models.invoiceDate());

  generate({...template, ...invoice}, i18n);

  return Promise.resolve();
};

module.exports = {
  invoiceCreateAction
};
