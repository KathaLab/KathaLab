import React, { useState } from 'react'
import style from './ConfigPanel.module.scss'
import { Button } from '../../../../components/Button/Button'


type ComponentType = {
  device: string
}

export const ConfigPanel = ({ device }: ComponentType) => {

  const [expanded, setExpanded] = useState(false)

  return (
    device && <div className={style.panel} data-expanded={expanded}>
      <Button className={style.toggleExpand} type='icon' value={expanded ? "navigate_next" : "navigate_before"} onclick={() => setExpanded(old => !old)}></Button>

      <span className={style.title}>Configuration - {device}</span>
    </div>
  )
}
