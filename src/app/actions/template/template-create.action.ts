import * as inquirer from "inquirer";
import { Company, invoiceElementQuestions, Template, templateQuestions } from "../../models";
import * as storage from "../../service/storage/file.storage";
import { Action } from "../action.types";

export const templateCreateAction: Action = async () => {
  const companies = storage.read<Company[]>("companies") || [];
  const templates = storage.read<Template[]>("templates") || [];

  const template = await inquirer.prompt(templateQuestions(companies));

  template.elements = [];

  let newElement;

  do {
    const { confirm, ...element } = await inquirer.prompt(invoiceElementQuestions(template));

    newElement = !template.elements.length || confirm;

    if (!template.elements.length || confirm) {
      template.elements.push(element);
    }
  } while (newElement);

  storage.write([...templates, template], "templates");
};
