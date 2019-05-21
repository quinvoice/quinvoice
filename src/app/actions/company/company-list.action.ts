import * as WordTable from "word-table";
import { Company } from "../../models";
import { emoji } from "../../service/emoji/emoji";
import * as storage from "../../service/storage/file.storage";
import { Action } from "../action.types";

export const companyListAction: Action = async () => {
  const companies = storage.read<Company[]>("companies") || [];
  const header = [
    `${emoji("🏢")} Name`,
    `${emoji("🏠")} Street`,
    `${emoji("🌃")} City`,
    `${emoji("📪")} Post code`,
    `${emoji("💼")} NIP`
  ];

  // tslint:disable-next-line:no-console
  console.log(new WordTable(header, companies.map(company => Object.values(company))).string());
};
