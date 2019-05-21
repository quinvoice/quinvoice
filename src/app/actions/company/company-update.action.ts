import * as inquirer from "inquirer";
import { Company, companyQuestions, CompanySelect, companySelectQuestions } from "../../models";
import * as storage from "../../service/storage/file.storage";
import { Action } from "../action.types";

export const companyUpdateAction: Action = async () => {
  const companies = storage.read<Company[]>("companies") || [];

  const { chosenCompany, ...company } = await inquirer.prompt<CompanySelect & Company>([
    ...companySelectQuestions(companies),
    ...companyQuestions(companies)
  ]);

  storage.write(companies.map(element => (element.name === chosenCompany ? company : element)), "companies");

  return Promise.resolve();
};
