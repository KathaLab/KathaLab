import React, {useContext} from "react"
import LocalizationContext from "../../../../context/LocalizationContext"
import { LocalizationName } from "../../../../localization"
import styles from "./HeaderGallery.scss"

export const HeaderGallery = () => {
  
    const { languageDico } = useContext(LocalizationContext);

    return <>
    <div className={styles.header}>
        <h1 className={styles.title}>{languageDico[LocalizationName.titleHeader]}</h1>
    </div>
    </>
}
