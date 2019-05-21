import { companyCreateAction } from "./company/company-create.action";
import { companyDeleteAction } from "./company/company-delete.action";
import { companyListAction } from "./company/company-list.action";
import { companyUpdateAction } from "./company/company-update.action";
import { creatorAction } from "./creator/creator.action";
import { invoiceCreateAction } from "./invoice/invoice-create.action";
import { templateCreateAction } from "./template/template-create.action";
import { templateListAction } from "./template/template-list.action";

export const createActions = (i18n: i18nAPI) => ({
  "company.create": companyCreateAction,
  "company.list": companyListAction,
  "company.update": companyUpdateAction,
  "company.delete": companyDeleteAction,
  "invoice.create": invoiceCreateAction(i18n),
  "template.create": templateCreateAction,
  "template.list": templateListAction
});

export const actions = creatorAction(createActions);
