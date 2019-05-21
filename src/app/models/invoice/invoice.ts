import { Company } from "../company/company";
import { invoiceBuyerQuestions, invoiceSellerQuestions } from "./invoice-company";
import { InvoiceDate, invoiceDateQuestions } from "./invoice-date";
import { InvoiceElement } from "./invoice-element";
import { InvoiceOptions, invoiceOptionsQuestions } from "./invoice-options";

export interface Invoice extends InvoiceDate, InvoiceOptions {
  buyer: Company;
  seller: Company;
  elements: InvoiceElement[];
}

export const invoiceQuestions = (companies: Company[]) => [
  ...invoiceDateQuestions(),
  ...invoiceSellerQuestions(companies),
  ...invoiceBuyerQuestions(companies),
  ...invoiceOptionsQuestions()
];
