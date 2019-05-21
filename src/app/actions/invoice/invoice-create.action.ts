import * as inquirer from "inquirer";
import * as inquirerDatepicker from "inquirer-datepicker-prompt";
import {
  Company,
  Invoice,
  InvoiceDate,
  invoiceDateQuestions,
  InvoiceElement,
  invoiceElementQuestions,
  invoiceQuestions,
  Template,
  TemplateSelect,
  templateSelectQuestions
} from "../../models";
import { saveNumber } from "../../service/numeration/numeration";
import { generate } from "../../service/pdf/generator";
import * as storage from "../../service/storage/file.storage";
import { ActionFactory } from "../action.types";

inquirer.registerPrompt("datetime", inquirerDatepicker);

export const invoiceCreateAction: ActionFactory = (i18n: i18nAPI) => async () => {
  const companies = storage.read<Company[]>("companies") || [];
  const templates = storage.read<Template[]>("templates") || [];

  if (templates.length) {
    const template = await inquirer.prompt<TemplateSelect>([templateSelectQuestions(templates)]);

    if (template.template) {
      return createFromTemplate(template.template, i18n);
    }
  }

  const invoice = await inquirer.prompt<Invoice>(invoiceQuestions(companies));

  invoice.elements = [];

  let newElement;

  do {
    const element = await inquirer.prompt<InvoiceElement>(invoiceElementQuestions(invoice));

    newElement = !invoice.elements.length || element.confirm;

    if (!invoice.elements.length || element.confirm) {
      invoice.elements.push(element);
    }
  } while (newElement);

  generate(invoice, i18n);
  saveNumber(invoice.number, invoice.date);
};

const createFromTemplate = async ({ templateName, ...invoiceTemplate }: Template, i18n: i18nAPI) => {
  const invoiceDate = await inquirer.prompt<InvoiceDate>(invoiceDateQuestions());

  generate({ ...invoiceTemplate, ...invoiceDate }, i18n);
  saveNumber(invoiceDate.number, invoiceDate.date);
};
