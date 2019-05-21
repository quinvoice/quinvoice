import * as currencyFormatter from "currency-formatter";
import { pl as inWordsPl } from "in-words";

const leadingZero = (value: number) => ("0" + value).slice(-2);

export const money = () => (text: string, render: any) =>
  currencyFormatter.format(render(text), { code: "PLN", symbol: "PLN" });

// tslint:disable-next-line
export const number = () => (text: string, render: any) =>
  currencyFormatter.format(render(text), { locale: "pl-PL", symbol: "" });

export const date = () => (text: string, render: any) => {
  const renderedDate = new Date(render(text));
  const year = renderedDate.getFullYear();
  const month = renderedDate.getMonth() + 1;
  const day = renderedDate.getDate();

  return `${year}-${leadingZero(month)}-${leadingZero(day)}`;
};

export const inWords = () => (text: string, render: any) => {
  const value = render(text);
  const trunc = Math.trunc(value);

  const subCurrency = String(Number(value).toFixed(2)).replace(/^[\d]+\./, "");
  const subCurrencyText = subCurrency !== "00" ? ` ${subCurrency}/100` : "";

  return `${inWordsPl(trunc)} PLN${subCurrencyText}`;
};
