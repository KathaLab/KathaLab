import React from 'react'
import style from '../../ConfigPanel.module.scss'
import { Device } from '../../../../../../model/Device';
import { Expanded } from '../../../../../../components/Expanded/Expanded'
import { TextInput } from '../../../../../../components/TextInput/TextInput';
import { Switch } from '../../../../../../components/Switch/Switch';
import { Button } from '../../../../../../components/Button/Button';


type ComponentType = {
    device: Device;
    updateDevices: () => void;
    allCollisionDomain: string[];
}

  
export const Interface = ({device, updateDevices, allCollisionDomain}: ComponentType) => {
   
    const setInterface = (index: number) => {
        device.interfaces = device.interfaces || [];
        device.interfaces.push(
            { interfaceName:'Eth' + index,
              ip: '',
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

    return (
       <div>
         {/* INTERFACES */}
         <Expanded title="Interfaces" classTitle={style.labelMenu}>
            <ul>
              {device.interfaces?.map((data, i) => (
                <li key={i}>
                  <Expanded title={"Eth" + i} classTitle={style.labelMenu}>
                    <div className={style.label}>
                      <p className={style.labelForm}>Ip address</p>
                      <TextInput type={"IP"} 
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
                    <Button className={style.buttonDelInterface}
                      type='text'
                      value='Delete'
                      onclick={()=> {deleteInterface(i); updateDevices()}}></Button>
                  </Expanded>
                </li>
              ))}
            </ul>
            <Button className={style.buttonAddInterface}
                    type='text'
                    value='new interface'
                    onclick={() => setInterface(device.interfaces || device.interfaces?.length === 0 ? device.interfaces?.length : 0)}></Button>
          </Expanded>
       </div>
    )
};