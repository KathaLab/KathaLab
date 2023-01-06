import React, {useContext, useState} from "react"
import {Pages} from "../../app";
import LocalizationContext from "../../context/LocalizationContext";
import ThemeContext from "../../context/ThemeContext";
import themes  from "../../theme/_theme.scss";
import style from "./Settings.module.scss"
import { Button } from "../../components/Button/Button";
import {Language, LocalizationName} from "../../localization";

export const Settings = () => {
    const {updateContext: updateLocalization, languageDico, language} = useContext(LocalizationContext);
    const {updateContext: updateTheme, theme} = useContext(ThemeContext);
    const [path, setPath] = useState("C:\\Users\\JhonDoe\\Desktop\\katharaConfiguration")
    const [appParam, setAppParam] = useState({
        'language': localStorage.getItem('language'),
        'theme': localStorage.getItem('theme'),
        'path': localStorage.getItem('path')
    })
    const openDirectory = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        appParam.path = await window.electronAPI.chooseDirectory();
    }
    const saveSettings = async () => {
        await localStorage.setItem('language', appParam.language)
        await localStorage.setItem('theme', appParam.theme)
        await localStorage.setItem('path', appParam.path)
        updateLocalization(appParam.language as Language);
        updateTheme(appParam.theme);
        setPath(appParam.path);
    }
    const ifParamNotChange = () => {
        return localStorage.getItem('language') == appParam.language &&
            localStorage.getItem('theme') == appParam.theme &&
            localStorage.getItem('path') == appParam.path;
    }

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
                    <select id="language" name="language" value={appParam.language} className={style.select}
                            onChange={async (e) => {
                                setAppParam({
                                    language : e.target.value,
                                    theme : appParam.theme,
                                    path : appParam.path
                                })
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
                                setAppParam({
                                    language : appParam.language,
                                    theme : e.target.value,
                                    path : appParam.path
                                })
                            }}
                            value={appParam.theme}>
                        {Object.keys(themes).map((key, id) =>
                            <option key={id} value={key}>
                                {key}
                            </option>
                        )}
                    </select>
                </div>
                <div className={style.gridItemLeft}><label htmlFor="location"
                                                           className={style.label}>{languageDico[LocalizationName.storagePlaceLabel]} : </label>
                </div>
                <div className={style.gridItemRight}>
                    <input id={"savePath"} onChange={async (e) => {
                        setAppParam({
                            language : appParam.language,
                            theme : appParam.theme,
                            path : e.target.value
                        })
                    }}
                   value={appParam.path}
                   name="location" type={"text"} className={style.storagePlaceInput}/>
                    <button
                        className={style.btnChooseDir + " material-icons material-symbols-outlined" + style.gridItemRight}
                        onClick={openDirectory}>folder
                    </button>
                </div>
            </div>
        </div>
        <button className={style.saveButton} onClick={saveSettings}
                hidden={ifParamNotChange()}>{languageDico[LocalizationName.save]}</button>
    </div>
}
