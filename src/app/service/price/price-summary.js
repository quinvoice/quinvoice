const {netto, vat, brutto} = require('./price-values');

const emptySummary = {
  netto: 0,
  vat: 0,
  brutto: 0
};

const reduceSummary = (summary, element) => {
  return {
    netto: summary.netto + netto.call(element),
    vat: summary.vat + vat.call(element),
    brutto: summary.brutto + brutto.call(element),
  };
};

const vatSummary = function() {
  const summary = this.invoice.elements.reduce((summary, element) => {
    const actual = summary[element.vatPercent] || emptySummary;

    return {
      ...summary,
      [element.vatPercent]: {
        vatPercent: element.vatPercent,
        ...reduceSummary(actual, element)
      }
    };
  }, {});

  return Object.values(summary);
};

const totalSummary = function() {
  return this.invoice.elements.reduce(reduceSummary, emptySummary);
};

module.exports = {
  vatSummary,
  totalSummary
};
