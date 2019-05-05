const moment = require('moment');
const storage = require('../storage/file.storage');

const getNextNumber = chosenDate => {
  const date = moment(chosenDate);
  const actualNumeration = storage.read('numeration') || {};

  const actualNumber = ((actualNumeration[date.year()] || {})[date.month()] || 0) + 1;

  return date.format(`${actualNumber}/M/YYYY`);
};

const saveNumber = (chosenNumber, chosenDate) => {
  const number = (chosenNumber.match(/^\d+/) || [])[0];

  if (!number) {
    return;
  }

  const date = moment(chosenDate);
  const actualNumeration = storage.read('numeration') || {};

  const year = date.year();
  const month = date.month();

  if (!actualNumeration[year]) {
    actualNumeration[year] = {};
  }

  actualNumeration[year][month] = Number(number);

  storage.write(actualNumeration, 'numeration');
};

module.exports = {
  getNextNumber,
  saveNumber,
};
