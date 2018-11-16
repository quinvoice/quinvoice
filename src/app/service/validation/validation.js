const required = value => !value || !String(value).length ? 'This field should not be blank' : true;
const nip = value => !value || !String(value).match(/^[\d]{3}-[\d]{3}-[\d]{2}-[\d]{2}$/) ? 'This field should contain valid NIP' : true;

module.exports = {
  required,
  nip,
};
