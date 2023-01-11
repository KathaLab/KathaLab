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
        cidr: null,
        is_up: false,
        collision_domain: "",
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

  const setBridged = () => {
    device.optional_parameters = device.optional_parameters || {}
    device.optional_parameters.bridged = !device.optional_parameters.bridged
    !device.optional_parameters.bridged && delete device.optional_parameters.bridged
  }
  const setPort = (value: string) => {
    device.optional_parameters = device.optional_parameters || {}
    device.optional_parameters.port = value
    device.optional_parameters.port === '' && delete device.optional_parameters.port
  }

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
          <Expanded title="Interfaces" classTitle={style.labelMenu}>
            <ul>
              {device.interfaces?.map((data, i) => (
                <li key={i}>
                  <Expanded title={"Eth" + i} classTitle={style.labelMenu}>
                    <div className={style.label}>
                      <p className={style.labelForm}>Ip address</p>
                      <TextInput type={"NUMBER"} 
                        value={device?.interfaces?.[i]?.ip} 
                        placeholder="127.0.0.1"
                        onChange={(value: string) => {console.log(device, value); device.interfaces[i].ip = value; updateDevices()}} 
                        className={style.inputForm}></TextInput>
                    </div>
                    <div className={style.label}>
                      <p className={style.labelForm}>CIDR</p>
                      <TextInput type={"NUMBER"} 
                        value={device?.interfaces?.[i]?.cidr?.toString()} 
                        placeholder="24" 
                        onChange={(value: string) => {device.interfaces[i].cidr = Number(value); updateDevices()}} 
                        className={style.inputForm}></TextInput>
                    </div>
                    <div className={style.label}>
                      <p className={style.labelForm}>Collision domain</p>
                      <TextInput 
                        autocommplete={allCollisionDomain}
                        value={device?.interfaces?.[i]?.collision_domain}
                        placeholder="Autocomplete" 
                        onChange={(value: string) => {device.interfaces[i].collision_domain =value; updateDevices()}}
                        className={style.inputForm}></TextInput>
                    </div>
                    <div className={style.label}>
                      <p className={style.labelForm}>Ip Active</p>
                      <Switch 
                        onChange={() => {device.interfaces[i].is_up = !device.interfaces[i].is_up; updateDevices()}} 
                        state={device.interfaces[i].is_up}></Switch>
                    </div>
                  </Expanded>
                  <button onClick={() => {deleteInterface(i); updateDevices()}}>Supp</button>
                </li>
              ))}
            </ul>
            <button onClick={setInterface}>new interface</button>
          </Expanded>

          {/* STARTUP COMMANDS */}
          <Expanded title="Startup command" classTitle={style.labelMenu}>
              <ListCommand 
                onChange={setStartupsCommands} 
                list={device.startups_commands ? device.startups_commands : []}
                getCommands={(commands: string[]) => getStartupCommands(commands)}
                className={style.inputListCommands}></ListCommand>
          </Expanded>  

          {/* SHUTDOWN COMMANDS */}
          <Expanded title="Shutdown command" classTitle={style.labelMenu}>
              <ListCommand 
                onChange={setShutdownCommands}
                list={device.shutdown_commands ? device.shutdown_commands : []} 
                className={style.inputListCommands}></ListCommand>
          </Expanded>

          {/* OPTIONALS PARAMETERS */}
          <Expanded title="Optionals parameter" classTitle={style.labelMenu}>
            <div>
              <div className={style.label}>
                <p className={style.labelForm}>Bridged</p>
                <Switch 
                  onChange={() => {setBridged(); updateDevices()}} 
                  state={device.optional_parameters?.bridged || false}></Switch>
              </div>
              <div className={style.label}>
                <p className={style.labelForm}>Ip address</p>
                <TextInput type={"NUMBER"} 
                  value={device?.optional_parameters?.port} 
                  placeholder="82000"
                  onChange={(value) => {setPort(value); updateDevices()}} 
                  className={style.inputForm}></TextInput>
              </div>
            </div>
          </Expanded> 
        </div>
      </div>
    </div> 
  )
}

