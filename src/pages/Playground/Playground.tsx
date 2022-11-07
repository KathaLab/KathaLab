import React, {useContext} from "react"
import {Pages} from "../../app";
import {Language, LocalizationName} from "../../localization";
import LocalizationContext from "../../context/LocalizationContext";
import styles from "./Playground.module.scss"
type componentType = {
    switchPage: (page: Pages) => void
}

export const Playground = ({switchPage}: componentType) => {

    const {updateContext, languageDico} = useContext(LocalizationContext);

    const handleLocalization = () => {
        updateContext(old => old == Language.FR ? Language.EN : Language.FR)
    }

    const handlePage = () => {
        switchPage(Pages.Gallery)
    }

    return <>
        <h1 className={styles.titre} >{languageDico[LocalizationName.titlePlayground]}</h1>
        <button onClick={handlePage}>{languageDico[LocalizationName.titleGallery]}</button>
        <button onClick={handleLocalization}>switch</button>
    </>
}