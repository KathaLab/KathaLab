import React, {useContext} from "react"
import {Pages} from "../../app";
import LocalizationContext from "../../context/LocalizationContext";
import style from "./Settings.module.scss"
import {Language, LocalizationName} from "../../localization";

type componentType = {
    switchPage: (page: Pages) => void
}

export const Settings = ({switchPage}: componentType) => {

    const {updateContext, languageDico} = useContext(LocalizationContext);

    const handleLocalization = () => {
        console.log()
    }

    return <div className={style.page}>
        <header className={style.header}>
            <h1 className={style.headerTitle}>{languageDico[LocalizationName.titleSettings]}</h1>
        </header>

        <div className={style.container}>
            <div className={style.ParameterContainer}>
                <label className={style.label}>{languageDico[LocalizationName.languageParameterLabel]}</label>
                <select className={style.select}  onChange={handleLocalization}>
                    <option>
                        <label>{languageDico[LocalizationName.languageFrench]}</label>
                    </option>
                    <option>
                        <label>{languageDico[LocalizationName.languageEnglish]}</label>
                    </option>
                </select>
            </div>

            <div className={style.ParameterContainer}>
                <label className={style.label}>{languageDico[LocalizationName.themeParameterLabel]}</label>
                <select className={style.select}>
                    <option>
                        <label>{languageDico[LocalizationName.themeLight]}</label>
                    </option>
                    <option>
                        <label>{languageDico[LocalizationName.themeDark]}</label>
                    </option>
                </select>
            </div>

            <div className={style.ParameterContainer}>
                <label className={style.label}>{languageDico[LocalizationName.storagePlaceLabel]} : </label>
                <input  type={"text"} className={style.storagePlaceInput}/>
            </div>
        </div>
    </div>
}
