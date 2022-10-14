import * as React from "react";
import {useState} from "react";

import {Gallery} from "./pages/Gallery/Gallery";
import {Playground} from "./pages/Playground/Playground";

import localizationContext from "./context/LocalizationContext";
import {Language, LanguageToLocalization} from "./localization";
import {createRoot} from "react-dom/client";

export enum Pages {
    Gallery,
    Playground
}

const App = () => {

    const [page, setPage] = useState<Pages>(Pages.Gallery)
    const [localization, setLocalization] = useState<Language>(Language.FR)

    return <localizationContext.Provider value={{language: localization, languageDico: LanguageToLocalization[localization] , updateContext: setLocalization}}>
        {
            page == Pages.Gallery ? <Gallery switchPage={setPage}/>
                : page == Pages.Playground ? <Playground switchPage={setPage}/> : null
        }
    </localizationContext.Provider>



}

createRoot(document.querySelector('#root')).render(<App />, );
