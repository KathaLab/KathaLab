import React, { useState, useEffect, useLayoutEffect, useRef} from 'react'
import style from './ConfigPanel.module.scss'
import { Button } from '../../../../components/Button/Button'
import { TextInput, textInputType } from "../../../../components/TextInput/TextInput";
import { Switch } from "../../../../components/Switch/Switch";
import { Expanded } from '../../../../components/Expanded/Expanded';
import { ListCommand } from './ListCommand/ListCommand';
import { Device, DeviceType, OptionalParameters } from "../../../../model/Device";
import { useColoredImage } from "../../../../hooks/useColoredImage";
import { useCssVar } from "../../../../hooks/useCssVar";
import { Interface } from './Menu/Interfaces/Interface';
import { StartupCommands } from './Menu/StatupCommands/StartupCommands';
import { ShutdownCommands } from './Menu/ShutdownCommands/ShutdownCommands';
import { OptionalsParameters } from './Menu/OptionalsParameters/OptionalsParameters';

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

  return (
    <div className={style.panel} data-expanded={expanded}>
      <Button className={style.toggleExpand}
        type='icon' 
        value={expanded ? "navigate_next" : "navigate_before"} 
        onclick={() => setExpanded(old => !old)}></Button>

      <span className={style.title}>Configuration - {device.deviceName}</span>
      <div className={style.hideDeviceForm}>
        <p className={style.typeDevice}>{Object.entries(DeviceType).filter(t=>t[1]==device.type)[0]?.[0]}</p>
        <div className={style.image}>
          <img ref={imageRef} alt="img-device" />
        </div>
        <div className={style.form}>
          <TextInput value={device.deviceName} 
            onChange={(value: string) => { device.deviceName = value; updateDevices()}} 
            placeholder="Device Name" 
            className={style.inputDeviceName}></TextInput>

          {/* INTERFACES */}
          <Interface device={device} updateDevices={updateDevices} allCollisionDomain={allCollisionDomain}></Interface>

          {/* STARTUP COMMANDS */}
          <StartupCommands device={device}></StartupCommands>

          {/* SHUTDOWN COMMANDS */}
          <ShutdownCommands device={device}></ShutdownCommands>

          {/* OPTIONALS PARAMETERS */}
          <OptionalsParameters device={device} updateDevices={updateDevices}></OptionalsParameters>
        </div>
      </div>
    </div> 
  )
}

