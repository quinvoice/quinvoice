import { emoji } from "../../service/emoji/emoji";
import { Company, companyQuestions } from "../company/company";

const invoiceCompany = (companies: Company[], key: "buyer" | "seller", label: string) => [
  {
    type: "list",
    name: key,
    message: `${emoji("👨‍💼")} ${label}:`,
    choices: ["+ Add new", ...companies.map(({ name }) => name)],
    filter: (value: string) => companies.find(({ name }) => value === name)
  },
  ...companyQuestions(companies).map(element => ({
    ...element,
    name: `${key}.${element.name}`,
    when: (choices: any) => !choices[key] || !choices[key][element.name]
  }))
];

export const invoiceBuyerQuestions = (companies: Company[]) => invoiceCompany(companies, "buyer", "Buyer");
export const invoiceSellerQuestions = (companies: Company[]) => invoiceCompany(companies, "seller", "Seller");
