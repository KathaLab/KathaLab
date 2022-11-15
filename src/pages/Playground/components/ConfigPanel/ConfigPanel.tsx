import React, { useState } from 'react'
import style from './ConfigPanel.module.scss'
import { Button } from '../../../../components/Button/Button'


export const ConfigPanel = () => {

    const [expanded, setExpanded] = useState(false)

  return (
    <div className={style.panel} data-expanded={expanded}>
        <Button className={style.toggleExpand} type='icon' value={expanded ? "navigate_next" : "navigate_before"} onclick={() => setExpanded(old => !old)}></Button>
    </div>
  )
}
