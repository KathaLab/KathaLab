import React, { useContext, useEffect, useState } from "react"
import { localizationContext } from "../../context/LocalizationContext";
import { themeContext } from "../../context/ThemeContext";
import themes from "../../theme/_theme.scss";
import style from "./Settings.module.scss"
import { Language, LocalizationName } from "../../localization";
export const Settings = () => {
    const { updateContext: updateLocalization, languageDico, language } = useContext(localizationContext);
    const { updateContext: updateTheme, theme } = useContext(themeContext);
    const [path, setPath] = useState(null)

    useEffect(() => {
        (async () => setPath(`${await homeDirectory()}\\Kathalab`))();
    }, [])

    const openDirectory = async () => {
        let path = "";
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        path = await window.electronAPI.chooseDirectory();
        setPath(path);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const homeDirectory = async () => { return await window.electronAPI.getHomeDirectory(); }

    return <div className={style.page}>
        <div className={style.settingsContainer}>
            <div className={style.settingsMenu}>
                <h1><a className={style.settingsMenuTitle}
                    href={"#settingsGlobal"}>{languageDico[LocalizationName.globalSettings]}</a></h1>
            </div>

            <div className={style.settingsGrid}>
                <h1 className={style.gridItemTitle}
                    id={"settingsGlobal"}>{languageDico[LocalizationName.globalSettings]}</h1>
                <div className={style.gridItemLeft}><label htmlFor="language"
                    className={style.label}>{languageDico[LocalizationName.languageParameterLabel]} : </label>
                </div>
                <div className={style.gridItemRight}>
                    <select id="language" name="language" value={language} className={style.select}
                        onChange={async (e) => {
                            updateLocalization(e.target.value as Language)
                            localStorage.setItem('language', e.target.value)
                        }}>
                        {
                            Object.values(Language).map((v, id) =>
                                <option key={id} value={v}>
                                    {v}
                                </option>
                            )}
                    </select>
                </div>
                <div className={style.gridItemLeft}><label htmlFor="theme"
                    className={style.label}>{languageDico[LocalizationName.themeParameterLabel]} : </label>
                </div>
                <div className={style.gridItemRight}>
                    <select id="theme" name="theme" className={style.select}
                        onChange={async (e) => {
                            updateTheme(e.target.value)
                            await localStorage.setItem('theme', e.target.value)
                        }}
                        value={theme}>
                        {Object.keys(themes).map((key, id) =>
                            <option key={id} value={key}>
                                {key.split('-')[1]}
                            </option>
                        )}
                    </select>
                </div>
                <div className={style.gridItemLeft}><label htmlFor="location"
                    className={style.label}>{languageDico[LocalizationName.storagePlaceLabel]} : </label>
                </div>
                <div className={style.gridItemRight}>
                    <input id={"savePath"} onChange={async (e) => {
                        setPath(e.target.value)
                        localStorage.setItem('path', e.target.value)
                    }}
                        value={path}
                        name="location" type={"text"} className={style.storagePlaceInput} />
                    <button
                        className={style.btnChooseDir + " material-icons material-symbols-outlined" + style.gridItemRight}
                        onClick={openDirectory}>folder
                    </button>
                </div>
            </div>
        </div>
    </div>
}
