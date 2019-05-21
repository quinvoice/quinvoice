import * as inquirer from "inquirer";
import { Company, companySelectQuestions } from "../../models";
import * as storage from "../../service/storage/file.storage";
import { Action } from "../action.types";

export const companyDeleteAction: Action = async () => {
  const companies = storage.read<Company[]>("companies") || [];

  const { chosenCompany, confirm } = await inquirer.prompt([
    ...companySelectQuestions(companies),
    {
      type: "confirm",
      name: "confirm",
      message: "Do you really want delete this company?"
    }
  ]);

  if (confirm) {
    storage.write(
      companies.map(element => (element.name === chosenCompany ? null : element)).filter(element => element),
      "companies"
    );
  }
};
