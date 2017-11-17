export function translate(dict: { [key: string]: string }, key: string, vars: { [key: string]: string | number }) {
  let result = dict[key]

  if (!result) {
    return ""
  }

  return result
    .replace(/\[@([a-z0-9_]+)\|(.+?)]/ig, (found, key, choices) => plural(dict._code, vars[key] as number || 0, choices.split("|")))
    .replace(/@([a-z0-9_]+)/ig, (found, key) => vars[key] as string)
}

export function plural(lang: string, value: number, choices: string[]): string {
  let i = 0
  let expected = 2

  switch (lang) {
    case "uk":
    case "ru":
      i = (value % 10 === 1 && value % 100 != 11) ? 0 : ((value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 10 || value % 100 >= 20)) ? 1 : 2)
      expected = 3
      break

    default: //en
      i = value === 1 ? 0 : 1
      break
  }

  if (choices.length > expected) {
    return value === 0 ? choices[0] : choices[i + 1]
  }

  return choices[i]
}