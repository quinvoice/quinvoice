import { emoji } from "../../service/emoji/emoji";
import { required } from "../../service/validation/validation";
import { Invoice } from "./invoice";

export interface InvoiceElement {
  confirm: boolean;
  name: string;
  amount: number;
  value: number;
  vatPercent: number;
}

export const invoiceElementQuestions = (invoice: Invoice) => [
  {
    type: "confirm",
    name: "confirm",
    message: "Do you want to add invoice subject?"
  },
  {
    type: "input",
    name: "name",
    message: `${emoji("💡")} Description:`,
    when: (choices: InvoiceElement) => !invoice.elements.length || choices.confirm,
    validate: required
  },
  {
    type: "input",
    name: "amount",
    message: `${emoji("📈")} Amount:`,
    default: 1,
    when: (choices: InvoiceElement) => !invoice.elements.length || choices.confirm,
    filter: Number,
    validate: required
  },
  {
    type: "input",
    name: "value",
    message: `${emoji("💰")} Netto:`,
    when: (choices: InvoiceElement) => !invoice.elements.length || choices.confirm,
    filter: Number,
    validate: required
  },
  {
    type: "input",
    name: "vatPercent",
    message: `${emoji("🤑")} Vat [%]:`,
    default: 23,
    when: (choices: InvoiceElement) => !invoice.elements.length || choices.confirm,
    filter: Number,
    validate: required
  }
];
