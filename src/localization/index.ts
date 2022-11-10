export enum LocalizationName {
    titleGallery,
    titlePlayground,
}

// import is after because language files need localizationName
import { fr } from "./fr"
import { en } from "./en"

export enum Language {
    FR = "fr",
    EN = "en"
}

export const LanguageToLocalization : Record<Language, Record<LocalizationName, string>> = {
    [Language.EN]: en,
    [Language.FR]: fr,
}