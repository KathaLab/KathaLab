import React, {useContext} from "react"
import {Pages} from "../../app";
import LocalizationContext from "../../context/LocalizationContext";
import ThemeContext from "../../context/ThemeContext";
import style from "./Settings.module.scss"
import { Button } from "../../components/Button/Button";
import {Language, LocalizationName} from "../../localization";

type componentType = {
    switchPage: (page: Pages) => void
}

export const Settings = ({switchPage}: componentType) => {

    const {updateContext: updateLocalization, languageDico} = useContext(LocalizationContext);
    const {updateContext: updateTheme, theme} = useContext(ThemeContext);

    return <div className={style.page}>
        <header className={style.header}>
            <div className={style.left}>
                <Button type="icon" value="arrow_back" onclick={() => switchPage(Pages.Gallery)}></Button>
                <h1 className={style.headerTitle}>{languageDico[LocalizationName.titleSettings]}</h1>
            </div>
        </header>

        <div className={style.container}>
                <div className={style.ParameterContainer}>
                    <label htmlFor="language" className={style.label}>{languageDico[LocalizationName.languageParameterLabel]} : </label>
                    <select name="language" className={style.select}  onChange={(e)=>updateLocalization(e.target.value as Language)}>
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
                    <select name="theme" className={style.select} onChange={(e)=>updateTheme(e.target.value)} value={theme}>
                        <option  value="theme-light">
                           {languageDico[LocalizationName.themeLight]}
                        </option>
                        <option value="theme-dark">
                            {languageDico[LocalizationName.themeDark]}
                        </option>
                        <option value="theme-dark2">
                            {languageDico[LocalizationName.themeDark2]}
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
