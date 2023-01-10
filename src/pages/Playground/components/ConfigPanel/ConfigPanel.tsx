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
import { Value } from 'sass';
import { string } from 'prop-types';

type ComponentType = {
  device: Device;
  updateDevices: () => void;
  allCollisionDomain: string[];
}

export const ConfigPanel = ({ device, updateDevices, allCollisionDomain }: ComponentType) => {

  const [expanded, setExpanded] = useState(false)

  const [getImg] = useColoredImage();
  const color = useCssVar("--clr-main-primary");
  const imageRef = useRef(null);
  
  useLayoutEffect(() => {
    if(device?.type) imageRef.current.src = getImg(device.type, color).src;
  }, [device])

  const setInterface = () => {
    device.interfaces = device.interfaces || [];
    device.interfaces.push(
      { ip: '',
        cidr: 0,
        is_up: false,
        collision_domain: "",
        bridged: false
      }
    );
    updateDevices();
  }

  const deleteInterface = (index: number) => {
    device.interfaces.splice(index, 1)
  }

  const setStartupsCommands = () => {
    device.startups_commands = device.startups_commands || [];
  }

  const getStartupCommands = (commands: string[]) => {
    console.log(commands.filter(word => word !== ''))
    device.startups_commands = commands.filter(word => word !== '')
  }

  const setShutdownCommands = () => {
    device.shutdown_commands = device.shutdown_commands || [];
  }

  const maskToCidr = (mask: string) => {
    const bin = mask.split('.')
    
    const bits = [...bin.map(oct => parseInt(oct, 10).toString(2))].join('')
    
    let cidr = 0;
    while(bits[cidr] === '1') cidr++;
    return cidr
  }

  const cidrToMask = (cidr: number) => {
    const bin = "1".repeat(cidr).padEnd(32, '0')

    const oct1 = parseInt(bin.slice(0, 8),2).toString().padEnd(3, '0')
    const oct2 = parseInt(bin.slice(8, 16),2).toString().padEnd(3, '0')
    const oct3 = parseInt(bin.slice(16, 24),2).toString().padEnd(3, '0')
    const oct4 = parseInt(bin.slice(24, 32),2).toString().padEnd(3, '0')
  
    const result = oct1.concat('.', oct2,'.', oct3,'.', oct4)
    return result
  }

  return (
     <div className={style.panel} data-expanded={expanded}>
      <Button className={style.toggleExpand} 
        type='icon' 
        value={expanded ? "navigate_next" : "navigate_before"} 
        onclick={() => setExpanded(old => !old)}></Button>

        <span className={style.title}>Configuration - {device.name}</span>
        <div className={style.container}>
          <p className={style.type}>{Object.entries(DeviceType).filter(t=>t[1]==device.type)[0]?.[0]}</p>
          <div className={style.image}>
            <img ref={imageRef} alt="img-device" />
          </div>
          <div className={style.form}>
            <TextInput value={device.name} 
              onBlur={(value: string) => { device.name = value, updateDevices()}} 
              placeholder="Device Name" 
              className={style.inputConfigPanel + " " + style.inputDeviceName}></TextInput>
            <Expanded title="Interfaces" classTitle={style.labelMenu}>
        
              <ul>
              {device.interfaces?.map((data, i) => (
                <li key={i}>
                  <Expanded title={"Eth" + i} classTitle={style.labelMenu}>
                    <div className={style.test}>
                      <p className={style.labelForm}>Ip address</p>
                      <TextInput type={"NUMBER"} 
                        value={device?.interfaces?.[i]?.ip} 
                        placeholder="127.0.0.1"
                        onBlur={(value: string) => {device.interfaces[i].ip = value, updateDevices()}} 
                        className={style.inputConfigPanel}></TextInput>
                    </div>
                    <div className={style.test}>
                      <p className={style.labelForm}>CIDR</p>
                      <TextInput type={"NUMBER"} 
                        value={device?.interfaces?.[i]?.cidr? device?.interfaces?.[i]?.cidr.toString() : null} 
                        placeholder="24" 
                        onBlur={(value: string) => {device.interfaces[i].cidr = Number(value), updateDevices()}} 
                        className={style.inputConfigPanel}></TextInput>
                    </div>
                    <div className={style.test}>
                      <p className={style.labelForm}>Mask</p>
                      <TextInput 
                        type={"NUMBER"}
                        value={device.interfaces?.[i]?.cidr? cidrToMask(device.interfaces?.[i]?.cidr).toString() : null}
                        placeholder="255.255.255.000"
                        onBlur={(value: string) => {device.interfaces[i].cidr = maskToCidr(value), updateDevices()}}
                        className={style.inputConfigPanel}></TextInput>
                    </div>
                    <div className={style.test}>
                      <p className={style.labelForm}>Collision domain</p>
                      <TextInput 
                        autocommplete={allCollisionDomain}
                        value={device?.interfaces?.[i]?.collision_domain}
                        placeholder="Autocomplete" 
                        onBlur={(value: string) => {device.interfaces[i].collision_domain =value, updateDevices()}}
                        className={style.inputConfigPanel}></TextInput>
                    </div>
                    <div className={style.test}>
                      <p className={style.labelForm}>Ip Active</p>
                      <Switch 
                        onChange={() => {device.interfaces[i].is_up = !device.interfaces[i].is_up, updateDevices()}} 
                        state={device.interfaces[i].is_up}></Switch>
                    </div>
                    <div className={style.test}>
                      <p className={style.labelForm}>Bridged</p>
                      <Switch 
                        onChange={() => {device.interfaces[i].bridged = !device.interfaces[i].bridged, updateDevices()}} 
                        state={device.interfaces[i].bridged}></Switch>
                    </div>
                  </Expanded>
                  <button onClick={() => {deleteInterface(i), updateDevices()}}>Supp</button>
                </li>
                ))}
              </ul>
              <button onClick={setInterface}>new interface</button>
            </Expanded>
            </div>
            <Expanded title="Startup command" classTitle={style.labelMenu}>
                <ListCommand 
                  onBlur={setStartupsCommands} 
                  list={device.startups_commands ? device.startups_commands : []}
                  getCommands={(commands: string[]) => getStartupCommands(commands)}
                  className={style.inputConfigPanel}></ListCommand>
            </Expanded>         
            <Expanded title="Shutdown command" classTitle={style.labelMenu}>
                <ListCommand 
                  onBlur={setShutdownCommands}
                  list={device.shutdown_commands ? device.shutdown_commands : []} 
                  className={style.inputConfigPanel}></ListCommand>
            </Expanded> 
        </div>
    </div> 
  )
}

