import React from 'react'
import style from './ContextMenu.module.scss'

type componentType = {
    options: {
        label?: string,
        onClick?: () => void,
        separator?: boolean,
        disabled?: boolean
    }[]
}

export const ContextMenu = ({ options }: componentType) => {
    return (
        <ul className={style.menu}>
            {
                options.map((option, index) => {
                    if (option.separator) {
                        return <span key={index} className={style.separator}></span>
                    }
                    return <li key={index} className={option.disabled ? style.disabled : ""} onClick={option?.onClick}>{option?.label}</li>
                })
            }
        </ul>
    )
}
