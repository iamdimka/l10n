export function translate(dict: { [key: string]: string }, key: string, vars: { [key: string]: string | number } = {}) {
  let result = dict[key]

  if (!result) {
    return ""
  }

  return result
    .replace(/\[@([a-z0-9_]+)\|(.+?)]/ig, (found, key, choices) => {
      const choice = plural(dict.code, vars[key] as number || 0)
      const values = choices.split("|")

      return  values[choice < values.length ? choice : 0]
    })
    .replace(/@([a-z0-9_]+)/ig, (found, key) => vars[key] as string)
}

export function plural(lang: string, n: number): number {
  switch (lang) {
    case "uk":
    case "be":
    case "bs":
    case "sr":
    case "ru":
    case "hr":
      return n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2

    case "fr":
      return n > 1 ? 1 : 0

    case "ja":
    case "zh-hant":  
    case "zh-hans":  
    case "zh-cn":  
    case "zh-hk":  
    case "zh-tw":
      return 0  

    default:
      return n === 1 ? 0 : 1
  }
}