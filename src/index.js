const i18n = require('i18n');
const path = require('path');
const { creatorAction } = require('./app/actions');

i18n.configure({
  locales:['pl'],
  defaultLocale: 'pl',
  directory: path.join(__dirname, 'locales')
});

const execute = (action, params) => {
  creatorAction(params, i18n)();
};

module.exports = {
  execute
};
