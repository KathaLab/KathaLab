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
            <div className={style.head}>
                <p className={classTitle}>{title}</p>
                <Button type='icon' value={expanded ? "expand_less" : "expand_more"} onclick={() => setExpanded(old => !old)}></Button>
            </div>
            <div className={style.list} data-expanded={expanded}>
                {children}
            </div>
        </div>
    )
};
