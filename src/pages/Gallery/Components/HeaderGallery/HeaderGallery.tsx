import React, {useContext} from "react"
import { Pages } from "../../../../app"
import { Button } from "../../../../components/Button/Button"
import LocalizationContext from "../../../../context/LocalizationContext"
import { LocalizationName } from "../../../../localization"
import styles from "./HeaderGallery.scss"

type componentType = {
    switchPage: (page: Pages) => void
  }

export const HeaderGallery = ({ switchPage }: componentType) => {
  
    const { languageDico } = useContext(LocalizationContext);

    return <>
    <div className={styles.header}>
        <h1 className={styles.title}>{languageDico[LocalizationName.titleHeader]}</h1>
        <Button className={styles.settingButton} type="icon" value="settings" onclick={() => switchPage(Pages.Settings)}></Button>
    </div>
    </>
}
