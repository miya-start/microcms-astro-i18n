export const langsObj = {
  ja: '日本語',
  en: 'English',
} as const

export const langsArr = Object.keys(langsObj) as (keyof typeof langsObj)[]

export type Lang = keyof typeof langsObj
