import { emoji } from "../../service/emoji/emoji";
import { required } from "../../service/validation/validation";

export interface InvoiceOptions {
  paymentType: string;
  bankAccount: string;
  paymentPeriod: string;
  personIssuing?: string;
  personReceiving?: string;
}

export const invoiceOptionsQuestions = () => [
  {
    type: "list",
    name: "paymentType",
    message: `${emoji("💵")} Payment type:`,
    choices: ["Transfer", "Cash"]
  },
  {
    type: "input",
    name: "bankAccount",
    message: `${emoji("🏦")} Bank account:`
  },
  {
    type: "list",
    name: "paymentPeriod",
    message: `${emoji("⌛")} Payment period:`,
    choices: ["3 days", "7 days", "14 days", "30 days"],
    filter: (value: string) => parseInt(value, 10)
  },
  {
    type: "input",
    name: "personIssuing",
    message: `${emoji("👨")} Person issuing:`,
    validate: required
  },
  {
    type: "input",
    name: "personReceiving",
    message: `${emoji("👨")} Person receiving:`
  }
];
