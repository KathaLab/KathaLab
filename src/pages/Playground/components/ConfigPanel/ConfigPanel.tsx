import React, { useState, useEffect, useLayoutEffect, useRef, useContext } from 'react'
import style from './ConfigPanel.module.scss'
import { Button } from '../../../../components/Button/Button'
import { TextInput, textInputType } from "../../../../components/TextInput/TextInput";
import { Device, DeviceType, OptionalParameters } from "../../../../model/Device";
import { useColoredImage } from "../../../../hooks/useColoredImage";
import { useCssVar } from "../../../../hooks/useCssVar";
import { Interface } from './Menu/Interfaces/Interface';
import { StartupCommands } from './Menu/StatupCommands/StartupCommands';
import { ShutdownCommands } from './Menu/ShutdownCommands/ShutdownCommands';
import { OptionalsParameters } from './Menu/OptionalsParameters/OptionalsParameters';
import * as RegexConst from "../../../../lib/RegexConst";
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { localizationContext } from "../../../../context/LocalizationContext";
import { LocalizationName } from "../../../../localization";

type ComponentType = {
  device: Device;
  updateDevices: () => void;
  allCollisionDomain: string[];
}

export const ConfigPanel = ({ device, updateDevices, allCollisionDomain }: ComponentType) => {
  const [expanded, setExpanded] = useState(false);
  const [getImg] = useColoredImage();
  const color = useCssVar("--clr-device");
  const imageRef = useRef(null);
  const { languageDico } = useContext(localizationContext);

  useLayoutEffect(() => {
    if (device?.type) imageRef.current.src = getImg(device.type, color).src;
  }, [device])


  const validation = (value: string, parameter: RegExp) => {
    if (value) {
      const array = Array.from(value.matchAll(parameter))[0]?.toString()
      return !(array === value)
    }
    return true
  }

  return (
    <div className={style.panel} data-expanded={expanded}>
      <Button className={style.toggleExpand}
        type='icon'
        value={expanded ? "navigate_next" : "navigate_before"}
        onclick={() => setExpanded(old => !old)}></Button>

      <span className={style.title}>Configuration - {device.deviceName}</span>
      <div className={style.hideDeviceForm}>
        <p className={style.typeDevice}>{Object.entries(DeviceType).filter(t => t[1] == device.type)[0]?.[0]}</p>
        <div className={style.image}>
          <img ref={imageRef} alt="img-device" />
        </div>
        <div className={style.form}>
          <div className={style.label}>
            <TextInput value={device.deviceName}
              onChange={(value: string) => { device.deviceName = value; updateDevices() }}
              placeholder={languageDico[LocalizationName.deviceName]}
              className={style.inputDeviceName}></TextInput>
            <div className={style.toolType}>
              {validation(device.deviceName, RegexConst.EXPORTED_NAME_REGEX)
                && device.deviceName
                && <Tooltip message={languageDico[LocalizationName.invalidName]}>
                  <span className={style.iconWarning + " material-icons material-symbols-outlined"}>warning</span>
                </Tooltip>
              }
            </div>
          </div>
          {/* INTERFACES */}
          <Interface device={device} updateDevices={updateDevices} allCollisionDomain={allCollisionDomain} validation={validation}></Interface>

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

