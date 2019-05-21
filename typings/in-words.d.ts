declare module "in-words" {
  interface Pl {
    (value: number): string;
  }

  const inWords: { pl: Pl };

  export = inWords;
}
