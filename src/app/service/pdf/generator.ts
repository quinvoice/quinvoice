import { spawn } from "child_process";
import * as fs from "fs";
import * as mustache from "mustache";
import * as path from "path";
import { path as binPath } from "wkhtmltopdf-installer";
import { Invoice } from "../../models";
import * as priceSummary from "../price/price-summary";
import * as priceValues from "../price/price-values";
import * as formatters from "./formatters";

export const generate = (invoice: Invoice, i18n: i18nAPI) => {
  return new Promise((resolve, reject) => {
    let index = 0;

    const data = {
      invoice,
      ...priceValues,
      ...priceSummary,
      ...formatters,
      translate: () => (text: string, render: any) => i18n.__(render(text)),
      index() {
        return ++index;
      }
    };

    fs.readFile(path.join(__dirname, "..", "..", "..", "templates", "pdf.html"), (err, template) => {
      const rendered = mustache.render(template.toString(), data);

      const childArgs = [
        "--viewport-size",
        " 1280x1024",
        "-",
        path.join(process.cwd(), `Faktura VAT ${invoice.number.replace(/\//g, ":")}.pdf`)
      ];

      const wk = spawn(binPath, childArgs);

      wk.stdin.write(rendered);
      wk.stdin.end();

      wk.on("close", code => {
        if (code > 0) {
          return reject(new Error("Could not generate pdf."));
        }

        resolve();
      });
    });
  });
};
