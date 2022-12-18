import React, { useState, useContext} from 'react'
import style from './ConfigPanel.module.scss'
import { Button } from '../../../../components/Button/Button'
import { TextInput, textInputType } from "../../../../components/TextInput/TextInput";
import { Switch } from "../../../../components/Switch/Switch";
import { Expanded } from '../../../../components/Expanded/Expanded';
import { ListCommand } from './ListCommand/ListCommand';
import { Device } from "../../../../model/Device";

type ComponentType = {
  device: Device
}

export const ConfigPanel = ({ device }: ComponentType) => {

  const [expanded, setExpanded] = useState(false)

  return (
    device && <div className={style.panel} data-expanded={expanded}>
      <Button className={style.toggleExpand} type='icon' value={expanded ? "navigate_next" : "navigate_before"} onclick={() => setExpanded(old => !old)}></Button>

        <span className={style.title}>Configuration - {device.name}</span>
        <div className={style.container}>
          <p className={style.type}>{device.type}</p>
          <div className={style.image}>
            <img src="/assets/laptop.svg" alt="img-device" />
          </div>
          <div className={style.form}>
            <TextInput value={device.name} placeholder="Device Name" className={style.inputConfigPanel + " " + style.inputDeviceName}></TextInput>
            <Expanded title="Interface" classTitle={style.labelMenu}>
              <div className={style.test}>
                <p className={style.labelForm}>Ip address</p>
                <TextInput type={"NUMBER"} placeholder="" className={style.inputConfigPanel}></TextInput>
              </div>
              <div className={style.test}>
                <p className={style.labelForm}>CIDR</p>
                <TextInput type={"NUMBER"} placeholder="" className={style.inputConfigPanel}></TextInput>
              </div>
              <div className={style.test}>
                <p className={style.labelForm}>Mask</p>
                <TextInput type={"NUMBER"} placeholder="" className={style.inputConfigPanel}></TextInput>
              </div>
              <div className={style.test}>
                <p className={style.labelForm}>Collision domain</p>
                <TextInput autocommplete={['eth 0','eth 1']} placeholder="Autocomplete" className={style.inputConfigPanel}></TextInput>
              </div>
              <div className={style.test}>
                <p className={style.labelForm}>Ip Active</p>
                <Switch></Switch>
              </div>
              <div className={style.test}>
                <p className={style.labelForm}>Gateway</p>
                <Switch></Switch>
              </div>
            </Expanded>
          </div>
          <Expanded title="Startup command" classTitle={style.labelMenu}>
            <ListCommand list={['cmd 1','cmd 2']} className={style.inputConfigPanel}></ListCommand>
          </Expanded>
        </div>
    </div>
  )
}
