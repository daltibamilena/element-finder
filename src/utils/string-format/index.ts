export const removeBreakLines = (value: string) =>
  value.replace(/(\r\n|\n|\r)/gm, ' ').trim()
