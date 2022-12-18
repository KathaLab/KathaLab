export enum LocalizationName {
    galleryExplication,
    titleHeader,
    EN,
    FR,
    languageParameterLabel,
    storagePlaceLabel,
    themeParameterLabel,
    themeLight,
    themeDark,
    themeDark2,
    titleGallery,
    titlePlayground,
    titleSettings,
}

// import is after because language files need localizationName
import { fr } from "./fr"
import { en } from "./en"

export enum Language {
    FR = "Français",
    EN = "English"
}

export const LanguageToLocalization : Record<Language, Record<LocalizationName, string>> = {
    [Language.EN]: en,
    [Language.FR]: fr,
}
