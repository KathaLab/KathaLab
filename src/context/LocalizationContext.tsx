import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Language, LanguageToLocalization, LocalizationName } from "../localization";
import * as React from "react";


type contextType = {
    language: Language,
    languageDico: Record<LocalizationName, string>
    updateContext: Dispatch<SetStateAction<Language>>
}

export const localizationContext = createContext<contextType>({
    language: Language.EN,
    languageDico: LanguageToLocalization[Language.EN],
    updateContext: () => null
})

export const LocalizationContext = ({ children }: { children: ReactNode }) => {

    const [localization, setLocalization] = useState<Language>(localStorage.getItem('language') == null ? Language.EN : localStorage.getItem('language') as Language);

    return (
        <localizationContext.Provider value={{
            language: localization,
            languageDico: LanguageToLocalization[localization],
            updateContext: setLocalization
        }}>
            {children}
        </localizationContext.Provider>
    )
}