import React, { useState, useContext} from 'react'
import style from './ConfigPanel.module.scss'
import { Button } from '../../../../components/Button/Button'
import { TextInput } from "../../../../components/TextInput/TextInput";
import LocalizationContext from "../../../../context/LocalizationContext"

type ComponentType = {
  device : string
}

export const ConfigPanel = ({device}: ComponentType) => {

  const [expanded, setExpanded] = useState(false)

  return (
    device && <div className={style.panel} data-expanded={expanded}>
        <Button className={style.toggleExpand} type='icon' value={expanded ? "navigate_next" : "navigate_before"} onclick={() => setExpanded(old => !old)}></Button>

        <span className={style.title}>Configuration - {device}</span>
        <div className={style.container}>
          <p className={style.type}>{device}</p>
          <div className={style.image}>
            <img src="/assets/laptop.svg" alt="img-device" />
          </div>
          <div className={style.form}>
            <TextInput placeholder={device} className={style.inputConfigPanel}></TextInput>
            <p className={style.labelInput}>Ip address</p>
            <TextInput placeholder="" className={style.inputConfigPanel}></TextInput>
            <p className={style.labelInput}>Mask</p>
            <TextInput placeholder="" className={style.inputConfigPanel}></TextInput>
            <p className={style.labelInput}>Gateway</p>
            <TextInput placeholder="" className={style.inputConfigPanel}></TextInput>
            <p className={style.labelInput}>Startup command</p>
            <TextInput placeholder="" className={style.inputConfigPanel}></TextInput>
          </div>

        </div>

    </div>
  )
}
