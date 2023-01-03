import React, {useContext, useState} from "react"
import {Pages} from "../../app";
import LocalizationContext from "../../context/LocalizationContext";
import ThemeContext from "../../context/ThemeContext";
import themes  from "../../theme/_theme.scss";
import style from "./Settings.module.scss"
import { Button } from "../../components/Button/Button";
import {Language, LocalizationName} from "../../localization";

type componentType = {
    switchPage: (page: Pages) => void
}

export const Settings = ({switchPage}: componentType) => {
    const {updateContext: updateLocalization, languageDico, language} = useContext(LocalizationContext);
    const {updateContext: updateTheme, theme} = useContext(ThemeContext);
    const [path, setPath] = useState("C:\\Users\\JhonDoe\\Desktop\\katharaConfiguration")


    const openDirectory = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setPath(await window.electronAPI.chooseDirectory());
    }

    const saveSettings = async () => {
        /*await settings.set('language', language)
        await settings.set('theme', theme)
        await settings.set('savePath', path) */
        await localStorage.setItem('language', language)
        await localStorage.setItem('theme', theme)
        await localStorage.setItem('path', path)
        updateLocalization(language as Language)
        updateTheme(theme)
    }

    // const windowSettings = new BrowserWindow({width: 800, height: 600})

    return <div className={style.page}>
        <header className={style.header}>
            <div className={style.left}>
                <Button type="icon" value="arrow_back" onclick={() => switchPage(Pages.Gallery)}></Button>
                <h1 className={style.headerTitle}>{languageDico[LocalizationName.titleSettings]}</h1>
            </div>
        </header>


        <div className={style.settingsContainer}>
            <div className={style.settingsMenu}>
                    <h1><a className={style.settingsMenuTitle} href={"#settingsGlobal"}>{languageDico[LocalizationName.globalSettings]}</a></h1>
            </div>

            <div className={style.settingsGrid}>
                <h1 className={style.gridItemTitle} id={"settingsGlobal"}>{languageDico[LocalizationName.globalSettings]}</h1>
                <div className={style.gridItemLeft}> <label htmlFor="language" className={style.label}>{languageDico[LocalizationName.languageParameterLabel]} : </label></div>
                <div className={style.gridItemRight}>
                    <select id="language" name="language"  value={language} className={style.select}  onChange={(e)=> updateLocalization(e.target.value as Language)}>-
                        {
                            Object.values(Language).map((v, id) =>
                                localStorage.getItem("language") == v
                                    ?
                                    <option key={id} defaultValue={v}>
                                        {v.replace("-", " ")}
                                    </option>
                                    :
                                    <option key={id} value={v}>
                                        {v.replace("-", " ")}
                                    </option>
                                // <option key={id} value={v}>
                                //     {v.replace("-", " ")}
                                // </option>
                            )}

                    </select>
                </div>
                <div className={style.gridItemLeft}> <label htmlFor="theme" className={style.label}>{languageDico[LocalizationName.themeParameterLabel]} : </label></div>
                <div className={style.gridItemRight}>
                    <select id="theme" name="theme" className={style.select} onChange={(e)=>updateTheme(e.target.value)} value={theme}>
                        {  Object.keys(themes).map((key, id) =>

                            localStorage.getItem("theme") == key
                                ?
                                <option key={id} defaultValue={key}>
                                    {key.replace("-", " ")}
                                </option>
                                :
                                <option key={id} value={key}>
                                    {key.replace("-", " ")}
                                </option>
                            // <option key={id} value={key}>
                            //     {key.replace("-", " ")}
                            // </option>
                        )}
                    </select>
                </div>
                <div className={style.gridItemLeft}><label htmlFor="location" className={style.label}>{languageDico[LocalizationName.storagePlaceLabel]} : </label></div>
                <div className={style.gridItemRight}>
                    <input id={"savePath"} onChange={(e) => setPath(e.target.value)} value={localStorage.getItem("path") ? localStorage.getItem("path") : path} name="location"  type={"text"} className={style.storagePlaceInput}/>
                    <button className={style.btnChooseDir+" material-icons material-symbols-outlined"+ style.gridItemRight} onClick={openDirectory}>folder</button>
                </div>
                <button className={style.gridItemButton} onClick={saveSettings}>{languageDico[LocalizationName.save]}</button>
            </div>

        </div>
        <div className={style.gridItemTitle}>{localStorage.getItem("theme")}</div>
        <div className={style.gridItemTitle}>{localStorage.getItem("language")}</div>
        <div className={style.gridItemTitle}>{localStorage.getItem("path")}</div>
    </div>
}

