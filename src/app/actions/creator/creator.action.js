const inquirer = require('inquirer');
const { emoji } = require('../../service/emoji/emoji');

const creatorAction = createActions => (params, i18n) => async () => {
  const possibleActions = {
    Invoice: ['Create'],
    Company: ['Create', 'Update', 'Delete', 'List'],
    Template: ['Create', 'List'],
  };

  const action = await inquirer.prompt([
    {
      type: 'list',
      name: 'subject',
      message: 'Subject:',
      choices: [`${emoji('📝')} Invoice`, `${emoji('🏬')} Company`, `${emoji('📋')} Template`],
      filter: value => value.replace(/^[^\s]+\s/, '')
    },
    {
      type: 'list',
      name: 'action',
      message: 'Action:',
      choices: choices => possibleActions[choices.subject],
    }
  ]);

  const actionName = [action.subject, action.action].join('.').toLowerCase();

  const actions = createActions(params, i18n);

  actions[actionName]();
};

module.exports = {
  creatorAction
};
