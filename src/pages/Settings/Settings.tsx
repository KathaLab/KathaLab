import React, {useContext, useState} from "react"
import {Pages} from "../../app";
import LocalizationContext from "../../context/LocalizationContext";
import ThemeContext from "../../context/ThemeContext";
import style from "./Settings.module.scss"
import {Language, LocalizationName} from "../../localization";

type componentType = {
    switchPage: (page: Pages) => void
}

export const Settings = ({switchPage}: componentType) => {
    const {updateContext: updateLocalization, languageDico} = useContext(LocalizationContext);
    const {updateContext: updateTheme, theme} = useContext(ThemeContext);
    const [path, setPath] = useState("C:\\Users\\JhonDoe\\Desktop\\katharaConfiguration")

    const openDirectory = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setPath(await window.electronAPI.chooseDirectory());
    }
    // const windowSettings = new BrowserWindow({width: 800, height: 600})

    return <div className={style.page}>
      
        <div className={style.parameterGrid}>
            <div className={style.gridItemLeft}> <label htmlFor="language" className={style.label}>{languageDico[LocalizationName.languageParameterLabel]} : </label></div>
            <div className={style.gridItemRight}>
                <select id="language" name="language" className={style.select}  onChange={(e)=>updateLocalization(e.target.value as Language)}>
                    <option value={Language.EN}>
                        {languageDico[LocalizationName.languageEnglish]}
                    </option>
                    <option value={Language.FR}>
                        {languageDico[LocalizationName.languageFrench]}
                    </option>
                </select>
            </div>
            <div className={style.gridItemLeft}> <label htmlFor="theme" className={style.label}>{languageDico[LocalizationName.themeParameterLabel]} : </label></div>
            <div className={style.gridItemRight}>
                <select id="theme" name="theme" className={style.select} onChange={(e)=>updateTheme(e.target.value)} value={theme}>
                    <option  value="theme-light">
                        {languageDico[LocalizationName.themeLight]}
                    </option>
                    <option value="theme-dark">
                        {languageDico[LocalizationName.themeDark]}
                    </option>
                </select>
            </div>
            <div className={style.gridItemLeft}><label htmlFor="location" className={style.label}>{languageDico[LocalizationName.storagePlaceLabel]} : </label></div>
            <div className={style.gridItemRight}>
                <input id={"savePath"} onChange={(e) => setPath(e.target.value)} value={path} name="location"  type={"text"} className={style.storagePlaceInput}/>
                <button className={style.btnChooseDir+" material-icons material-symbols-outlined"+ style.gridItemRight} onClick={openDirectory}>folder</button>
            </div>
        </div>
    </div>
}

