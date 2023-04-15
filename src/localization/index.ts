export enum LocalizationName {
    action,
    command,
    galleryExplication,
    titleHeader,
    EN,
    FR,
    globalSettings,
    keybindSettings,
    languageParameterLabel,
    save,
    storagePlaceLabel,
    themeParameterLabel,
    themeLight,
    themeDark,
    themeDark2,
    titleGallery,
    titlePlayground,
    titleSettings,
    exportlabNameError,
    exportdeviceNameError,
    exportInterfaceNameError,
    exportCollisionDomainError,
    exportlabParameterError32,
    exportlabParameterError128,
    exportlabParameterError256,
    exportlabParameterIntergerError,
    exportlabParameterIPError,
    exportlabParameterCIDRError,
    exportSuccessFully,
    exportError,
    importSuccessFully,
    importDirectoryError,
    titleSearch,
    newLab,
    openLab,
    saveLab,
    importLab,
    exportLab,
    warning,
    duplicateLab
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
