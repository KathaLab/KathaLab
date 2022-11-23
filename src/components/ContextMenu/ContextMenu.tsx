import React from 'react'
import style from './ContextMenu.module.scss'

type componentType = {
    options: {
        label: string,
        onClick: () => void
    }[]
}

export const ContextMenu = ({ options }: componentType) => {
    return (
        <ul className={style.menu}>
            {
                options.map((option, index) => {
                    return <li key={index} onClick={option.onClick}>{option.label}</li>
                })
            }
        </ul>
    )
}
