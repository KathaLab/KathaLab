import React from 'react'
import style from './Tooltip.scss'

type componentType = {
    children: React.ReactNode,
    message: string
}

export const Tooltip = ({ children, message }: componentType) => {
  return (
    <div className={style.container}>
        {children}
        <span className={style.toolTip}>{message}</span>
    </div>
  )
}

