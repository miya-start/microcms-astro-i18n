import { type Lang, defaultLang, langsArr, langsObj } from 'types'

export type Multilingual = Record<Lang, string>

export function useTranslations(lang: Lang) {
  return function t(multilingual: Multilingual): string {
    return multilingual[lang]
  }
}

type LocalePath = {
  path: string
  lang: Lang
  labelObj: (typeof langsObj)[Lang]
}

export function generateLocalePaths(url: URL): LocalePath[] {
  const normalizedPath = url.pathname.endsWith('/')
    ? url.pathname.slice(0, -1)
    : url.pathname
  const pathSegments = normalizedPath.split('/').filter(Boolean)
  const isLocalePresent = langsArr.includes(pathSegments[0] as Lang)

  return langsArr.map((lang) => ({
    // Determine the path based on whether the locale is already present in the URL
    path: isLocalePresent
      ? // If the default language is being used, do not include the language in the path
        lang === defaultLang
        ? `/${pathSegments.slice(1).join('/')}`
        : // Otherwise, include the language in the path
          `/${lang}/${pathSegments.slice(1).join('/')}`
      : // If the locale is not present and the default language is being used, use the normalized path
      lang === defaultLang
      ? normalizedPath
      : // If the locale is not present and it's not the default language, prefix the path with the language
        `/${lang}${normalizedPath}`,
    lang,
    labelObj: langsObj[lang],
  }))
}

export function generateLocaleUrls(url: URL): LocalePath[] {
  return generateLocalePaths(url).map((localePath) => ({
    ...localePath,
    path: `${url.origin}${localePath.path}`,
  }))
}
