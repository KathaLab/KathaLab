import React, {useContext} from "react"
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

    return <div className={style.page}>
        <header className={style.header}>
            <h1 className={style.headerTitle}>{languageDico[LocalizationName.titleSettings]}</h1>
        </header>

        <div className={style.container}>
                <div className={style.ParameterContainer}>
                    <label htmlFor="language" className={style.label}>{languageDico[LocalizationName.languageParameterLabel]} : </label>
                    <select name="language" className={style.select}  onChange={(e)=>updateLocalization(e.target.value)}>
                        <option value={Language.EN}>
                           {languageDico[LocalizationName.languageEnglish]}
                        </option>
                        <option value={Language.FR}>
                            {languageDico[LocalizationName.languageFrench]}
                        </option>
                    </select>
                </div>

                <div className={style.ParameterContainer}>
                    <label htmlFor="theme" className={style.label}>{languageDico[LocalizationName.themeParameterLabel]} : </label>
                    <select name="theme" className={style.select} onChange={(e)=>updateTheme(e.target.value)}>
                        <option  value="theme-light">
                           {languageDico[LocalizationName.themeLight]}
                        </option>
                        <option value="theme-dark">
                            {languageDico[LocalizationName.themeDark]}
                        </option>
                    </select>
                </div>
        </div>
        

        <div className={style.ParameterContainer}>
            <label htmlFor="location" className={style.label}>{languageDico[LocalizationName.storagePlaceLabel]} : </label>
            <input placeholder="C:\Users\JhonDoe\Desktop\katharaConfiguration" name="location"  type={"text"} className={style.storagePlaceInput}/>
        </div>
    </div>
}
