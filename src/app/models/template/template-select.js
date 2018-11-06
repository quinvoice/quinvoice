const { emoji } = require('../../service/emoji/emoji');

const templateSelect = templates => ({
  type: 'list',
  name: 'name',
  message: `${emoji('📋')} Template:`,
  choices: ['- Without template', ...templates.map(({templateName}) => templateName)],
  filter: value => templates.find(({templateName}) => value === templateName),
});

module.exports = {
  templateSelect
};
