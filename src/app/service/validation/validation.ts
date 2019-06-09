export const required = (value?: string) => (!value || !String(value).length ? "This field should not be blank" : true);
export const nip = (value?: string) =>
  !value || String(value).match(/^[\d]{3}-[\d]{3}-[\d]{2}-[\d]{2}$/) ?
      true : "Correct NIP format is ddd-ddd-dd-dd";
