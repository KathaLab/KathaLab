import React, { useState, useContext} from 'react'
import style from './ConfigPanel.module.scss'
import { Button } from '../../../../components/Button/Button'
import { TextInput } from "../../../../components/TextInput/TextInput";
import { Switch } from "../../../../components/Switch/Switch";
import { Expanded } from '../../../../components/Expanded/Expanded';
import { ListCommand } from './ListCommand/ListCommand';

type ComponentType = {
  device: string
}

export const ConfigPanel = ({ device }: ComponentType) => {

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
            <Expanded title="Interface" classTitle={style.labelMenu}>
              <p className={style.labelForm}>Ip address</p>
              <div className={style.ip}>
                <TextInput placeholder="" className={style.inputConfigPanel}></TextInput>
                <span>/</span>
                <TextInput placeholder="cidr" className={style.inputConfigPanel}></TextInput>
              </div>
              <p className={style.labelForm}>Mask</p>
              <TextInput placeholder="" className={style.inputConfigPanel}></TextInput>
              <p className={style.labelForm}>Collision domain</p>
              <TextInput autocommplete={['eth 0','eth 1']} placeholder="autocomplete" className={style.inputConfigPanel}></TextInput>


              <div className={style.divSwitch}>
                <p className={style.labelForm}>Ip Active</p>
                <Switch></Switch>
              </div>
              <div className={style.divSwitch}>
                <p className={style.labelForm}>Gateway</p>
                <Switch></Switch>
              </div>
            </Expanded>

            <Expanded title="Startup command" classTitle={style.labelMenu}>
              <ListCommand list={['cmd 1','cmd 2']} className={style.inputConfigPanel}></ListCommand>
            </Expanded>
          </div>
        </div>
    </div>
  )
}
