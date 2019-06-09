import { emoji } from "../../service/emoji/emoji";
import { nip, required } from "../../service/validation/validation";

export interface Company {
  name: string;
  street: string;
  city: string;
  postCode: string;
  nip: string;
}

export const companyQuestions = (companies: Company[]) => [
  {
    type: "input",
    name: "name",
    message: `${emoji("🏢")} Company name:`,
    default: matchCompany("name", companies),
    validate: required
  },
  {
    type: "input",
    name: "street",
    message: `${emoji("🏠")} Street and number:`,
    default: matchCompany("street", companies),
    validate: required
  },
  {
    type: "input",
    name: "city",
    message: `${emoji("🌃")} City:`,
    default: matchCompany("city", companies),
    validate: required
  },
  {
    type: "input",
    name: "postCode",
    message: `${emoji("📪")} Post code:`,
    default: matchCompany("postCode", companies),
    validate: required
  },
  {
    type: "input",
    name: "nip",
    message: `${emoji("💼")} NIP(optional):`,
    default: matchCompany("nip", companies),
    validate: nip
  }
];

const matchCompany = (field: keyof Company, companies: Company[]) => ({ chosenCompany }: { chosenCompany: string }) => {
  const foundCompany = companies.find(({ name }) => name === chosenCompany);

  return foundCompany ? foundCompany[field] : null;
};
