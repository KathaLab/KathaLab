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
  updateDevices: () => void
}

export const ConfigPanel = ({ device, updateDevices }: ComponentType) => {

  const [expanded, setExpanded] = useState(false)

  const [getImg] = useColoredImage();
  const color = useCssVar("--clr-main-primary");
  const imageRef = useRef(null);
  
  useLayoutEffect(() => {
    if(device?.type) imageRef.current.src = getImg(device.type, color).src;
  }, [device])

  useEffect(() => {console.log(device.name)},[device.name])

  const setInterface = () => {
    device.interfaces = device.interfaces || [];
    device.interfaces.push(
      { ip: '',
        cidr: '',
        is_up: false,
        collision_domain: '',
        bridged: false
      }
    );
  }

  const setStartupsCommands = () => {
    device.startups_commands = device.startups_commands || [];
  }

  const setShutdownCommands = () => {
    device.shutdown_commands = device.shutdown_commands || [];
  }

  return (
     <div className={style.panel} data-expanded={expanded}>
      <Button className={style.toggleExpand} type='icon' value={expanded ? "navigate_next" : "navigate_before"} onclick={() => setExpanded(old => !old)}></Button>

        <span className={style.title}>Configuration - {device.name}</span>
        <div className={style.container}>
          <p className={style.type}>{Object.entries(DeviceType).filter(t=>t[1]==device.type)[0]?.[0]}</p>
          <div className={style.image}>
            <img ref={imageRef} alt="img-device" />
          </div>
          <div className={style.form}>
            <TextInput value={device.name} onBlur={(value: string) => {device.name = value, updateDevices()}} placeholder="Device Name" className={style.inputConfigPanel + " " + style.inputDeviceName}></TextInput>
            <Expanded title="Interfaces" classTitle={style.labelMenu}>
      
            <ul>
            {device.interfaces?.map((data, i) => (
              <li key={i}>
                <Expanded title={"Eth" + i} classTitle={style.labelMenu}>
                  <div className={style.test}>
                    <p className={style.labelForm}>Ip address</p>
                    <TextInput type={"NUMBER"} value={device?.interfaces?.[i]?.ip} placeholder="127.0.0.1" onBlur={(value: string) => device.interfaces[i].ip = value} className={style.inputConfigPanel}></TextInput>
                  </div>
                  <div className={style.test}>
                    <p className={style.labelForm}>CIDR</p>
                    <TextInput type={"NUMBER"} value={device?.interfaces?.[i]?.cidr} placeholder="32" onBlur={(value: string) => device.interfaces[i].cidr = value} className={style.inputConfigPanel}></TextInput>
                  </div>
                  <div className={style.test}>
                    <p className={style.labelForm}>Mask</p>
                    <TextInput type={"NUMBER"} value="" className={style.inputConfigPanel}></TextInput>
                  </div>
                  <div className={style.test}>
                    <p className={style.labelForm}>Collision domain</p>
                    <TextInput autocommplete={['eth 0','eth 1']} placeholder="Autocomplete" className={style.inputConfigPanel}></TextInput>
                  </div>
                  <div className={style.test}>
                    <p className={style.labelForm}>Ip Active</p>
                    <Switch onChange={() => device.interfaces[i].is_up = !device.interfaces[i].is_up} state={device.interfaces[i].is_up}></Switch>
                  </div>
                  <div className={style.test}>
                    <p className={style.labelForm}>Bridged</p>
                    <Switch onChange={() => device.interfaces[i].bridged = !device.interfaces[i].bridged} state={device.interfaces[i].bridged}></Switch>
                  </div>
                </Expanded>
              </li>
              ))}
            </ul>
              <button onClick={setInterface}>new interface</button>
            </Expanded>
            </div>
            <Expanded title="Startup command" classTitle={style.labelMenu}>
                <ListCommand onBlur={setStartupsCommands} list={device.startups_commands ? device.startups_commands : []} className={style.inputConfigPanel}></ListCommand>
            </Expanded>         
            <Expanded title="Shutdown command" classTitle={style.labelMenu}>
                <ListCommand onBlur={setShutdownCommands} list={device.shutdown_commands ? device.shutdown_commands : []} className={style.inputConfigPanel}></ListCommand>
            </Expanded>         
        </div>
    </div> 
  )
}

