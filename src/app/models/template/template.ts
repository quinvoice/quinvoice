import { emoji } from "../../service/emoji/emoji";
import { required } from "../../service/validation/validation";
import { Company } from "../company/company";
import { invoiceBuyerQuestions, invoiceSellerQuestions } from "../invoice/invoice-company";
import { InvoiceElement } from "../invoice/invoice-element";
import { InvoiceOptions, invoiceOptionsQuestions } from "../invoice/invoice-options";

export interface Template extends InvoiceOptions {
  seller: Company;
  buyer: Company;
  templateName: string;
  elements: InvoiceElement[];
}

export const templateQuestions = (companies: Company[]) => [
  {
    type: "input",
    name: "templateName",
    message: `${emoji("🔠")} Template name:`,
    validate: required
  },
  ...invoiceSellerQuestions(companies),
  ...invoiceBuyerQuestions(companies),
  ...invoiceOptionsQuestions()
];
