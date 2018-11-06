const WordTable = require('word-table');
const storage = require('../../service/storage/file.storage');
const { netto } = require('../../service/price/price-values');
const { money } = require('../../service/pdf/formatters');

const getMoney = value => money()(netto.call(value), value => value);

const templateListAction = async () => {
  const templates = storage.read('templates') || [];
  const header = ['Name', 'Seller', 'Buyer', 'Payment type', 'Payment period', 'Elements'];

  /* eslint-disable-next-line no-unused-vars */
  console.log(new WordTable(header, templates.map(({templateName, seller, buyer, elements, personIssuing, personReceiving, ...company}) => [
    templateName,
    seller.name,
    buyer.name,
    ...Object.values(company),
    elements.map(element => `${element.name} (${getMoney(element)})`).join(', ')
  ])).string());

  return Promise.resolve();
};

module.exports = {
  templateListAction
};
