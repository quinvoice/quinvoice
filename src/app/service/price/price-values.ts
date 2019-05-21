export const netto = function(this: any) {
  return this.value * this.amount;
};

export const vat = function(this: any) {
  return (this.vatPercent / 100) * netto.call(this);
};

export const brutto = function(this: any) {
  return netto.call(this) + vat.call(this);
};
