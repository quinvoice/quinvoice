import * as storage from "../storage/file.storage";

interface Numeration {
  [key: string]: { [key: string]: number };
}

export const getNextNumber = (chosenDate: Date) => {
  const month = chosenDate.getMonth();
  const year = chosenDate.getFullYear();

  const actualNumeration = storage.read<Numeration>("numeration") || {};
  const actualNumber = ((actualNumeration[year] || {})[month] || 0) + 1;

  return `${actualNumber}/${month + 1}/${year}`;
};

export const saveNumber = (chosenNumber: string, chosenDate: Date) => {
  const invoiceNumber = (chosenNumber.match(/^\d+/) || [])[0];

  if (!invoiceNumber) {
    return;
  }

  const actualNumeration = storage.read<Numeration>("numeration") || {};

  const year = chosenDate.getFullYear();
  const month = chosenDate.getMonth();

  if (!actualNumeration[year]) {
    actualNumeration[year] = {};
  }

  actualNumeration[year][month] = Number(invoiceNumber);

  storage.write(actualNumeration, "numeration");
};
