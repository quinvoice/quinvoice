const { companyCreateAction } = require('./company/company-create.action');
const { companyListAction } = require('./company/company-list.action');
const { companyUpdateAction } = require('./company/company-update.action');
const { companyDeleteAction } = require('./company/company-delete.action');
const { invoiceCreateAction } = require('./invoice/invoice-create.action');
const { templateCreateAction } = require('./template/template-create.action');
const { templateListAction } = require('./template/template-list.action');
const { creatorAction } = require('./creator/creator.action');

const createActions = (params, i18n) => ({
  'company.create': companyCreateAction,
  'company.list': companyListAction,
  'company.update': companyUpdateAction,
  'company.delete': companyDeleteAction,
  'invoice.create': invoiceCreateAction(params, i18n),
  'template.create': templateCreateAction,
  'template.list': templateListAction,
});

module.exports = {
  creatorAction: creatorAction(createActions)
};
