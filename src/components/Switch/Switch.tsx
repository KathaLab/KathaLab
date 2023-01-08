import React, { useEffect, useRef } from 'react'
import style from './Switch.scss'

type componentType = {
    className?: string,
    onChange?: () => void,
    state?: boolean
}

export const Switch = ({className, onChange, state}: componentType) => {
   
    return (
        <label className={style.switch}>
            <input type="checkbox" onChange={onChange} checked={state}/>
            <span className={style.slider}></span>
        </label>
    )
};