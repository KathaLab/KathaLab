import * as React from "react";
import { useEffect, useState } from "react";

// importing the two pages
import { Gallery, Playground, Settings } from "./pages"

// importing stuff related to the localization
import localizationContext from "./context/LocalizationContext";
import { Language, LanguageToLocalization } from "./localization";
import { createRoot } from "react-dom/client";

// importing styles
import themes from "./theme/_theme.scss"
import themeContext from "./context/ThemeContext";
import { TitleBar } from "./components/TitleBar/TitleBar";

// SnackBarContext
import SnackBarContext from "./context/SnackbarContext";
import { SnackBar, snackBarMessageType } from "./components/SnackBar/SnackBar";
import { useDelayQueue } from "./hooks/useDelayQueue";

export type themeNames = keyof typeof themes
export enum Pages {
    Gallery,
    Playground,
    Settings,
}

const App = () => {
    const [page, setPage] = useState<Pages>(Pages.Settings)
    const [localization, setLocalization] = useState<Language>(Language.EN)
    const [theme, setTheme] = useState<themeNames>("theme-dark2")
    const [snackbarVisibility, setSnackbarVisibility] = useState(false)

    // handle snackbar
    const handleSnackBarMessage = (message: snackBarMessageType) => {
        setSnackbarVisibility(true)
        return new Promise<void>((resolve) => setTimeout(() => {
            setSnackbarVisibility(false)
            setTimeout(resolve, 200);
        }, message.duration - 200))
    }
    const [[currentElement], addElement] = useDelayQueue<snackBarMessageType>(handleSnackBarMessage);

    return <main className={themes[theme]}>
        <localizationContext.Provider value={{ language: localization, languageDico: LanguageToLocalization[localization], updateContext: setLocalization }}>
            <themeContext.Provider value={{ theme, updateContext: setTheme }}>
                <SnackBarContext.Provider value={{ updateContext: addElement }}>
                                <TitleBar switchPage={setPage}></TitleBar>
                <div className="pageWrapper">
                    {
                        page == Pages.Gallery ? <Gallery switchPage={setPage} />
                            : page == Pages.Playground ? <Playground switchPage={setPage} />
                                : page == Pages.Settings ? <Settings switchPage={setPage} /> : null
                    }
                    <SnackBar visibility={snackbarVisibility} {...currentElement} />
                </SnackBarContext.Provider>
            </themeContext.Provider>
        </localizationContext.Provider>
    </main>
}

createRoot(document.querySelector('#root')).render(<App />,);
