import * as inquirer from "inquirer";
import { emoji } from "../../service/emoji/emoji";
import { ActionFactory } from "../action.types";

interface Action {
  subject: "Invoice" | "Company" | "Template";
  action: string;
}

export const creatorAction = (createActions: any): ActionFactory => (i18n: i18nAPI) => async () => {
  const possibleActions = {
    Invoice: ["Create"],
    Company: ["Create", "Update", "Delete", "List"],
    Template: ["Create", "List"]
  };

  const action = await inquirer.prompt<Action>([
    {
      type: "list",
      name: "subject",
      message: "Subject:",
      choices: [`${emoji("📝")} Invoice`, `${emoji("🏬")} Company`, `${emoji("📋")} Template`],
      filter: value => value.replace(/^[^\s]+\s/, "")
    },
    {
      type: "list",
      name: "action",
      message: "Action:",
      choices: (choices: Action) => possibleActions[choices.subject]
    }
  ]);

  const actionName = [action.subject, action.action].join(".").toLowerCase();

  const actions = createActions(i18n);

  await actions[actionName]();
};
