const moment = require('moment');
const inWordsPl = require('in-words').pl;
const currencyFormatter = require('currency-formatter');

const money = () => (text, render) => currencyFormatter.format(render(text), {code: 'PLN', symbol: 'PLN'});

const number = () => (text, render) => currencyFormatter.format(render(text), {locale: 'pl-PL', symbol: ''});

const date = () => (text, render) => moment(Date.parse(render(text))).format('YYYY-MM-DD');

const inWords = () => (text, render) => {
  const value = render(text);
  const trunc =  Math.trunc(value);

  const subCurrency = String(Number(value).toFixed(2)).replace(/^[\d]+\./, '');

  return `${inWordsPl(trunc)} PLN${subCurrency !== '00' ? ` ${subCurrency}/100`: ''}`;
};

module.exports = {
  money,
  number,
  inWords,
  date
};
