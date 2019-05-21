import { emoji } from "../../service/emoji/emoji";
import { Template } from "./template";

export interface TemplateSelect {
  template?: Template;
}

export const templateSelectQuestions = (templates: Template[]) => ({
  type: "list",
  name: "template",
  message: `${emoji("📋")} Template:`,
  choices: ["- Without template", ...templates.map(({ templateName }) => templateName)],
  filter: (value: string) => templates.find(({ templateName }) => value === templateName)
});
