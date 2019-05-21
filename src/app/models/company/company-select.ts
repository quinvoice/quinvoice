import { emoji } from "../../service/emoji/emoji";
import { Company } from "./company";

export interface CompanySelect {
  chosenCompany: string;
}

export const companySelectQuestions = (companies: Company[]) => [
  {
    type: "list",
    name: "chosenCompany",
    message: `${emoji("🏬")} Choose the company:`,
    choices: companies.map(({ name }) => name)
  }
];
