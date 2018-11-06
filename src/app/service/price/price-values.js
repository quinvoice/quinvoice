const netto = function () {
  return this.value * this.amount;
};

const vat = function () {
  return (this.vatPercent / 100) * netto.call(this);
};

const brutto = function () {
  return netto.call(this) + vat.call(this);
};

module.exports = {
  netto,
  vat,
  brutto,
};
