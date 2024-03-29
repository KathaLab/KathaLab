import React, {useContext} from 'react'
import style from '../../ConfigPanel.module.scss'
import { Device } from '../../../../../../model/Device';
import { Expanded } from '../../../../../../components/Expanded/Expanded'
import { TextInput } from '../../../../../../components/TextInput/TextInput';
import { Switch } from '../../../../../../components/Switch/Switch';
import { Button } from '../../../../../../components/Button/Button';
import { Tooltip } from '../../../../../../components/Tooltip/Tooltip';
import * as RegexConst from "../../../../../../lib/RegexConst";
import { Autocomplete } from '../../../../../../components/Autocomplete/Autocomplete';
import { localizationContext } from "../../../../../../context/LocalizationContext";
import { LocalizationName } from "../../../../../../localization";

type ComponentType = {
  device: Device;
  updateDevices: () => void;
  allCollisionDomain: string[];
  validation: (value: string, parameter: RegExp) => boolean;
}

export const Interface = ({ device, updateDevices, allCollisionDomain, validation }: ComponentType) => {
  const { languageDico } = useContext(localizationContext);

  const setInterface = () => {
    device.interfaces = device.interfaces || [];
    device.interfaces.push(
      {
        interfaceName: '',
        ip: '',
        cidr: null,
        is_up: false,
        collision_domain: '',
      }
    );
    updateDevices();
  }

  const setInterfaceName = () => {
    device.interfaces?.map((data, i) => (device.interfaces[i].interfaceName = 'eth' + i))
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
                  <p className={style.labelForm}>{languageDico[LocalizationName.idAddress]}</p>
                  <TextInput type={"IP"}
                    value={device?.interfaces?.[i]?.ip}
                    placeholder="127.0.0.1"
                    onChange={(value: string) => { device.interfaces[i].ip = value; updateDevices() }}
                    className={style.inputForm}></TextInput>
                  <div className={style.toolType}>
                    {validation(device?.interfaces?.[i]?.ip, RegexConst.DEVICE_IP) &&
                      device?.interfaces?.[i]?.ip &&
                      <Tooltip message={languageDico[LocalizationName.invalidIP]}>
                        <span className={style.iconWarning + " material-icons material-symbols-outlined"}>warning</span>
                      </Tooltip>
                    }
                  </div>
                </div>
                <div className={style.label}>
                  <p className={style.labelForm}>CIDR</p>
                  <TextInput type={"NUMBER"}
                    value={device.interfaces[i].cidr ? device.interfaces[i].cidr.toString() : ""}
                    placeholder="24"
                    onChange={(value: string) => { device.interfaces[i].cidr = Number(value); updateDevices() }}
                    className={style.inputForm}></TextInput>
                  <div className={style.toolType}>
                    {validation(device?.interfaces?.[i]?.cidr?.toString(), RegexConst.DEVICE_CIDR)
                      && !!device?.interfaces?.[i]?.cidr
                      && <Tooltip message={languageDico[LocalizationName.invalidCIDR]}>
                        <span className={style.iconWarning + " material-icons material-symbols-outlined"}>warning</span>
                      </Tooltip>
                    }
                  </div>
                </div>
                <div className={style.label}>
                  <p className={style.labelForm}>{languageDico[LocalizationName.collisionDomain]}</p>
                  <Autocomplete
                    placeholder={languageDico[LocalizationName.collisionDomain]}
                    classInput={style.inputForm}
                    defaultValue={device?.interfaces?.[i]?.collision_domain}
                    datalist={allCollisionDomain.filter(value => value != device.interfaces[i].collision_domain)}
                    onChange={(value: string) => { device.interfaces[i].collision_domain = value; updateDevices() }}></Autocomplete>
                  <div className={style.toolType}>
                    {validation(device?.interfaces?.[i]?.collision_domain, RegexConst.EXPORTED_NAME_REGEX) &&
                      device?.interfaces?.[i]?.collision_domain &&
                      <Tooltip message="Invalid collision domain">
                        <span className={style.iconWarning + " material-icons material-symbols-outlined"}>warning</span>
                      </Tooltip>
                    }
                  </div>
                </div>
                <div className={style.label}>
                  <p className={style.labelForm}>Ip Active</p>
                  <Switch
                    onChange={() => { device.interfaces[i].is_up = !device.interfaces[i].is_up; updateDevices() }}
                    state={device.interfaces[i].is_up}></Switch>
                </div>
                <Button className={style.buttonDelInterface}
                  type='text'
                  value={languageDico[LocalizationName.delete]}
                  onclick={() => { deleteInterface(i); setInterfaceName(); updateDevices() }}></Button>
              </Expanded>
            </li>
          ))}
        </ul>
        <Button className={style.buttonAddInterface}
          type='text'
          value={languageDico[LocalizationName.newInterface]}
          onclick={() => { setInterface(); setInterfaceName() }}></Button>
      </Expanded>
    </div>
  )

};