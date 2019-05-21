import { emoji } from "../../service/emoji/emoji";
import { getNextNumber } from "../../service/numeration/numeration";
import { required } from "../../service/validation/validation";

export interface InvoiceDate {
  date: Date;
  number: string;
}

export const invoiceDateQuestions = () => [
  {
    type: "datetime",
    name: "date",
    format: ["dd", "-", "mm", "-", "yyyy"],
    message: `${emoji("📆")} Date:`,
    validate: required
  },
  {
    type: "input",
    name: "number",
    message: `${emoji("🔢")} Number:`,
    default: (choices: InvoiceDate) => getNextNumber(choices.date)
  }
];
