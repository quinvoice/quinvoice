export type Action = () => Promise<void>;
export type ActionFactory = (i18n: i18nAPI) => Action;
