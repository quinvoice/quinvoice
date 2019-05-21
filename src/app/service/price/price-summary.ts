import { brutto, netto, vat } from "./price-values";

const emptySummary = {
  netto: 0,
  vat: 0,
  brutto: 0
};

interface Summary {
  netto: number;
  vat: number;
  brutto: number;
}

const reduceSummary = (summary: Summary, element: any) => {
  return {
    netto: summary.netto + netto.call(element),
    vat: summary.vat + vat.call(element),
    brutto: summary.brutto + brutto.call(element)
  };
};

export const vatSummary = function(this: any) {
  const summary = this.invoice.elements.reduce((currentSummary: any, element: any) => {
    const actual = currentSummary[element.vatPercent] || emptySummary;

    return {
      ...currentSummary,
      [element.vatPercent]: {
        vatPercent: element.vatPercent,
        ...reduceSummary(actual, element)
      }
    };
  }, {});

  return Object.values(summary);
};

export const totalSummary = function(this: any) {
  return this.invoice.elements.reduce(reduceSummary, emptySummary);
};
