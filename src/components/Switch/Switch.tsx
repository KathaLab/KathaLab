import React from 'react'
import style from './Switch.scss'

type componentType = {
    className?: string
}

export const Switch = ({className}: componentType) => {
    return (
        <label className={style.switch}>
            <input type="checkbox"/>
            <span className={style.slider}></span>
        </label>
    )
};