import * as React from "react";
import {useState} from "react";

// importing the two pages
import {Gallery, Playground, Settings} from "./pages"

// importing stuff related to the localization
import localizationContext from "./context/LocalizationContext";
import {Language, LanguageToLocalization} from "./localization";
import {createRoot} from "react-dom/client";

// importing styles
import themes from "./theme/_theme.scss"
import themeContext from "./context/ThemeContext";

export type themeNames = keyof typeof themes
export enum Pages {
    Gallery,
    Playground,
    Settings,
}

const App = () => {
    const [page, setPage] = useState<Pages>(Pages.Gallery)
    const [localization, setLocalization] = useState<Language>(Language.EN)
    const [theme, setTheme] = useState<themeNames>("theme-light")

    return <main className={themes[theme]}>
        <localizationContext.Provider value={{language: localization, languageDico: LanguageToLocalization[localization] , updateContext: setLocalization}}>
        <themeContext.Provider value={{theme, updateContext: setTheme}}>
        {
            page == Pages.Gallery ? <Gallery switchPage={setPage}/>
            : page == Pages.Playground ? <Playground switchPage={setPage}/>
            : page == Pages.Settings ? <Settings switchPage={setPage}/> : null

        }
        </themeContext.Provider>
        </localizationContext.Provider>
    </main>
}

createRoot(document.querySelector('#root')).render(<App />, );
