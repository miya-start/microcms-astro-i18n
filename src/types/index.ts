export const langsObj = {
  ja: 'JP',
  en: 'EN',
} as const

export const langsArr = Object.keys(langsObj) as (keyof typeof langsObj)[]

export type Lang = keyof typeof langsObj
