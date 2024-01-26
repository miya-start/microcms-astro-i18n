import { type Lang, LANGS } from '../@types'

export type Multilingual = Record<Lang, string>

export function useTranslations(lang: Lang) {
  return function t(multilingual: Multilingual): string {
    return multilingual[lang]
  }
}

type LocalePath = {
  path: string
  lang: Lang
  label: (typeof LANGS)[Lang]
}

export function generateLocalePaths(url: URL): LocalePath[] {
  const pathnames = url.pathname.replace(/\/$/, '').split('/')
  console.log('pathnames', pathnames)

  return Object.keys(LANGS).map((lang) => {
    pathnames[pathnames.length - 1] = lang
    console.log('pathnames', pathnames)
    return {
      path: pathnames.join('/'),
      lang: lang as Lang,
      label: LANGS[lang as Lang],
    }
  })
}

export function generateLocaleUrls(url: URL): LocalePath[] {
  const baseOrigin = url.origin
  return generateLocalePaths(url).map((localePath) => ({
    ...localePath,
    path: baseOrigin + localePath.path,
  }))
}
