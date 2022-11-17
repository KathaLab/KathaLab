import {createContext, Dispatch, SetStateAction} from "react";
import {Language, LanguageToLocalization, LocalizationName} from "../localization";

type contextType = {
    language: Language,
    languageDico: Record<LocalizationName, string>
    updateContext: Dispatch<SetStateAction<Language>>
}

export default createContext<contextType>({
    language: Language.EN,
    languageDico: LanguageToLocalization[Language.EN],
    updateContext: () => null
})