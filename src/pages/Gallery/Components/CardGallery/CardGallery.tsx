import React, {useContext} from "react"
import LocalizationContext from "../../../../context/LocalizationContext"
import { LocalizationName } from "../../../../localization"
import styles from "./CardGallery.scss"

export const CardGallery = () => {
  
    const { languageDico } = useContext(LocalizationContext);

    return <>
        <div className={styles.card}>
            <img className={styles.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmf6NRBGvnf6CCrulwcD7Uta6gJitJtOs8tQ&usqp=CAU" alt="image de topologie"/>
            <h2 className={styles.cardTitle}>Title CARD</h2>
        </div>
    </>
}