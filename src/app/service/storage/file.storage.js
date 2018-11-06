const fs = require('fs');
const os = require('os');
const path = require('path');
const { version } = require('../../../../package');

const DIRECTORY = path.join(os.homedir(), '.quinvoice');

const write = (data, key) => {
  if (!fs.existsSync(DIRECTORY)) {
    fs.mkdirSync(DIRECTORY);
  }

  fs.writeFileSync(path.join(DIRECTORY, `${key}.json`), JSON.stringify({data, version}));
};

const read = (key) => {
  const file = path.join(DIRECTORY, `${key}.json`);

  if (!fs.existsSync(file)) {
    return null;
  }

  const buffer = fs.readFileSync(file);

  return JSON.parse(buffer.toString()).data;
};

module.exports = {
  write,
  read,
};
