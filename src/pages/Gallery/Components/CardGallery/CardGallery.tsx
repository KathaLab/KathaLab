import React from "react"
import styles from "./CardGallery.scss"

type ComponentType = {
    onClick: () => void
}

export const CardGallery = ({onClick}: ComponentType) => {

    return <div className={styles.card} onClick={onClick}>
            <img className={styles.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmf6NRBGvnf6CCrulwcD7Uta6gJitJtOs8tQ&usqp=CAU" alt="image de topologie"/>
            <h2 className={styles.cardTitle}>Topologie</h2>
        </div>
}
