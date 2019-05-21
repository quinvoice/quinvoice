import * as WordTable from "word-table";
import { InvoiceElement, Template } from "../../models";
import { money } from "../../service/pdf/formatters";
import { netto } from "../../service/price/price-values";
import * as storage from "../../service/storage/file.storage";
import { Action } from "../action.types";

// @ts-ignore
const getMoney = (value: InvoiceElement) => money()(netto.call(value), (moneyValue: number) => moneyValue);

export const templateListAction: Action = async () => {
  const templates = storage.read<Template[]>("templates") || [];
  const header = ["Name", "Seller", "Buyer", "Payment type", "Payment period", "Elements"];

  // tslint:disable-next-line:no-console
  console.log(
    new WordTable(
      header,
      templates.map(({ templateName, seller, buyer, elements, personIssuing, personReceiving, ...company }) => [
        templateName,
        seller.name,
        buyer.name,
        ...Object.values(company),
        elements.map(element => `${element.name} (${getMoney(element)})`).join(", ")
      ])
    ).string()
  );
};
