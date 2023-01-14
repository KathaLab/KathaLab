import React from 'react'
import style from './Switch.scss'

type componentType = {
    onChange?: () => void,
    state?: boolean
}

export const Switch = ({onChange, state}: componentType) => {
   
    return (
        <label className={style.switch}>
            <input type="checkbox" onChange={onChange} checked={state}/>
            <span className={style.slider}></span>
        </label>
    )
};