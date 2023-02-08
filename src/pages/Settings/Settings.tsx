import React, { useContext, useEffect, useState } from "react"
import { localizationContext } from "../../context/LocalizationContext";
import { themeContext } from "../../context/ThemeContext";
import themes from "../../theme/_theme.scss";
import style from "./Settings.module.scss"
import { Language, LocalizationName } from "../../localization";
import keybinds from "../../model/defaultKeybinds.json"
export const Settings = () => {
    const { updateContext: updateLocalization, languageDico, language } = useContext(localizationContext);
    const { updateContext: updateTheme, theme } = useContext(themeContext);
    const [path, setPath] = useState(null)

    useEffect(() => {
        (async () => setPath(`${await homeDirectory()}\\Kathalab`))();
    }, [])

    const concatKey = (keys: string[]) => {
        if (keys.length == 2) {
            return <p><kbd className={style.kbd
            }>{keys[0]}</kbd> +  <kbd className={style.kbd}>{keys[1]}</kbd> </p>;
        }
        return <p><kbd className={style.kbd}>{keys[0]}</kbd> +  <kbd className={style.kbd}>{keys[1]}</kbd> +  <kbd className={style.kbd}>{keys[2]}</kbd> </p>;
    }

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
            <ul className={style.navigation}>
                <li className={style.navigation__item}><a href="#settingsGlobal">{languageDico[LocalizationName.globalSettings]}</a></li>
                <li className={style.navigation__item}><a href="#settingsKeybind">{languageDico[LocalizationName.keybindSettings]}</a></li>
            </ul>

            <div className={style.list}>
                <section className={style.section}>
                    <h2 className={style.section__title} id="settingsGlobal">{languageDico[LocalizationName.globalSettings]}</h2>
                    <ul>
                        <li className={style.settingList__item}>
                            <label htmlFor="language">{languageDico[LocalizationName.languageParameterLabel]} : </label>
                            <select id="language" name="language" value={language}
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
                        </li>
                        <li className={style.settingList__item}>
                            <label htmlFor="theme">{languageDico[LocalizationName.themeParameterLabel]} : </label>
                            <select id="theme" name="theme"
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
                        </li>
                        <li className={style.settingList__item}>
                            <label htmlFor="location">{languageDico[LocalizationName.storagePlaceLabel]} : </label>
                            <input id={"savePath"} onChange={async (e) => {
                                setPath(e.target.value)
                                localStorage.setItem('path', e.target.value)
                            }}
                                value={path}
                                name="location" type={"text"} />
                            <button
                                className={style.btnIcone +" material-icons material-symbols-outlined"}
                                onClick={openDirectory}>folder
                            </button>
                        </li>
                    </ul>
                </section>
                <section className={style.section}>
                    <h2 className={style.section__title} id={"settingsKeybind"}>{languageDico[LocalizationName.keybindSettings]}</h2>

                    <table className={style.table}>
                        <tr >
                            <th>{languageDico[LocalizationName.action]}</th>
                            <th>{languageDico[LocalizationName.command]}</th>
                        </tr>
                        {
                            keybinds.map((keybind) => {
                                return <tr >
                                    <td >
                                        <label >{keybind.eventName}</label>
                                    </td>
                                    <td >{concatKey(keybind.code)}</td>
                                </tr>

                            })
                        }
                    </table>
                </section>
            </div>
        </div>
    </div>
}
