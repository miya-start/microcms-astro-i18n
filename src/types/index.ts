export const defaultLang = 'ja'

export const langsObj = {
  [defaultLang]: {
    labelSimple: 'JP',
    labelDetail: '日本語',
  },
  en: {
    labelSimple: 'EN',
    labelDetail: 'English',
  },
} as const

export const langsArr = Object.keys(langsObj) as (keyof typeof langsObj)[]

export type Lang = keyof typeof langsObj
