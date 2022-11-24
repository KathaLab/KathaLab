import React from "react"
import styles from "./CardGallery.scss"

type ComponentType = {
    onClick: () => void,
    name: string
}

export const CardGallery = ({onClick, name}: ComponentType) => {

    return <div className={styles.card} onClick={onClick}>
            <img className={styles.img} draggable="false" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmf6NRBGvnf6CCrulwcD7Uta6gJitJtOs8tQ&usqp=CAU" alt="image de topologie"/>
            <h2 className={styles.cardTitle}>{name || "Untitled"}</h2>
        </div>
}
