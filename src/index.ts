import * as i18n from "i18n";
import { join } from "path";
import { actions } from "./app/actions";

i18n.configure({
  locales: ["pl"],
  defaultLocale: "pl",
  directory: join(__dirname, "locales")
});

export const execute = () => {
  actions((i18n as any) as i18nAPI)();
};
