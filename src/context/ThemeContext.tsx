import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import * as React from "react";
import themes from "../theme/_theme.scss";

type contextType = {
    theme: string
    updateContext: Dispatch<SetStateAction<string>>
}

export type themeNames = keyof typeof themes;

export const themeContext = createContext<contextType>({
    theme: "",
    updateContext: () => null
})

export const ThemeContext = ({ children }: { children: ReactNode }) => {

    const [theme, setTheme] = useState<themeNames>(localStorage.getItem('theme') == null ? "theme-dark" : localStorage.getItem('theme') as themeNames);

    return (
        <themeContext.Provider value={{ theme, updateContext: setTheme }}>
            <main className={themes[theme]}>
                {children}
            </main>
        </themeContext.Provider>
    )
}
