import React, { useState } from 'react'
import { Button } from '../Button/Button'
import style from './Expanded.scss'

type componentType = {
    children?: React.ReactNode
    classTitle?: string
    title?: string
}

export const Expanded = ({ children, classTitle, title }: componentType) => {

    const [expanded, setExpanded] = useState(false)

    return (
        <div className={style.expanded}>
            <div className={style.head} onClick={() => setExpanded(old => !old)} tabIndex={0}>
                <p className={classTitle}>{title}</p>
                <span className={"material-icons material-icons-outlined"}>{expanded ? "expand_less" : "expand_more"}</span>
            </div>
            <div className={style.list} data-expanded={expanded}>
                {children}
            </div>
        </div>
    )
};
