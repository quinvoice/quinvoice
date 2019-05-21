import * as inquirer from "inquirer";
import { Company, companyQuestions } from "../../models";
import * as storage from "../../service/storage/file.storage";
import { Action } from "../action.types";

export const companyCreateAction: Action = async () => {
  const companies = storage.read<Company[]>("companies") || [];

  const company = await inquirer.prompt<Company>(companyQuestions(companies));

  storage.write([...companies, company], "companies");
};
