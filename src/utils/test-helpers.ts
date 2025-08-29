export const multiline = (s: TemplateStringsArray, ...args: any[]) =>
  String.raw(s, ...args).trim();
