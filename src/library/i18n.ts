import { type Lang, langsArr, langsObj } from 'types'

export type Multilingual = Record<Lang, string>

export function useTranslations(lang: Lang) {
  return function t(multilingual: Multilingual): string {
    return multilingual[lang]
  }
}

type LocalePath = {
  path: string
  lang: Lang
  label: (typeof langsObj)[Lang]
}

const regex = new RegExp(`^(${langsArr.join('|')})$`)
export function generateLocalePaths(url: URL): LocalePath[] {
  const pathnames = url.pathname.replace(/\/$/, '').split('/')

  return langsArr.map((lang) => ({
    path: pathnames
      .flatMap((pathname) => {
        if (pathname.match(regex)) return lang
        return pathname
      })
      .join('/'),
    lang,
    label: langsObj[lang],
  }))
}

export function generateLocaleUrls(url: URL): LocalePath[] {
  return generateLocalePaths(url).map((localePath) => ({
    ...localePath,
    path: url.origin + localePath.path,
  }))
}
