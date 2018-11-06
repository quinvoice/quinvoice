const WordTable = require('word-table');
const storage = require('../../service/storage/file.storage');
const { emoji } = require('../../service/emoji/emoji');

const companyListAction = async () => {
  const companies = storage.read('companies') || [];
  const header = [`${emoji('🏢')} Name`, `${emoji('🏠')} Street`, `${emoji('🌃')} City`, `${emoji('📪')} Post code`, `${emoji('💼')} NIP`];

  console.log(new WordTable(header, companies.map(company => Object.values(company))).string());

  return Promise.resolve();
};

module.exports = {
  companyListAction
};
