import React, { useState, useEffect, useLayoutEffect, useRef} from 'react'
import style from './ConfigPanel.module.scss'
import { Button } from '../../../../components/Button/Button'
import { TextInput, textInputType } from "../../../../components/TextInput/TextInput";
import { Switch } from "../../../../components/Switch/Switch";
import { Expanded } from '../../../../components/Expanded/Expanded';
import { ListCommand } from './ListCommand/ListCommand';
import { Device, DeviceType } from "../../../../model/Device";
import { useColoredImage } from "../../../../hooks/useColoredImage";
import { useCssVar } from "../../../../hooks/useCssVar";

type ComponentType = {
  device: Device;
}

export const ConfigPanel = ({ device }: ComponentType) => {

  const [expanded, setExpanded] = useState(false)

  const [getImg] = useColoredImage();
  const color = useCssVar("--clr-main-primary");
  const imageRef = useRef(null);
  
  useLayoutEffect(() => {
    if(device?.type) imageRef.current.src = getImg(device.type, color).src;
    console.log(device)
  }, [device])

  return (
    device && <div className={style.panel} data-expanded={expanded}>
      <Button className={style.toggleExpand} type='icon' value={expanded ? "navigate_next" : "navigate_before"} onclick={() => setExpanded(old => !old)}></Button>

        <span className={style.title}>Configuration - {device.name}</span>
        <div className={style.container}>
          <p className={style.type}>{Object.entries(DeviceType).filter(t=>t[1]==device.type)[0]?.[0]}</p>
          <div className={style.image}>
            <img ref={imageRef} alt="img-device" />
          </div>
          <div className={style.form}>
            <TextInput value={device.name} onBlur={(value: string) => device.name = value} placeholder="Device Name" className={style.inputConfigPanel + " " + style.inputDeviceName}></TextInput>
            <Expanded title="Interfaces" classTitle={style.labelMenu}>
              <Expanded title="Eth0" classTitle={style.labelMenu}>
                <div className={style.test}>
                  <p className={style.labelForm}>Ip address</p>
                  <TextInput type={"NUMBER"} placeholder={device?.interfaces?.[0]?.ip} className={style.inputConfigPanel}></TextInput>
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
                  <p className={style.labelForm}>Bridged</p>
                  <Switch></Switch>
                </div>
              </Expanded>
            </Expanded>
            </div>
            <Expanded title="Startup command" classTitle={style.labelMenu}>
                <ListCommand list={['cmd 1','cmd 2']} className={style.inputConfigPanel}></ListCommand>
            </Expanded>         
            <Expanded title="Shutdown command" classTitle={style.labelMenu}>
                <ListCommand list={['cmd 1','cmd 2']} className={style.inputConfigPanel}></ListCommand>
            </Expanded>         
        </div>
    </div> 
  )
}

