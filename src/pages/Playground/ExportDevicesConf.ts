import {JsonToConf} from "../../model/JsonToConf";
import {Lab} from "../../model/Lab";
import {Device} from "../../model/Device";
import {Interfaces} from "../../model/Interfaces";
import ExportLabConf from "./ExportLabConf";

export default class ExportDevicesConf extends ExportLabConf {

  constructor(json: Lab) {
    super(json);
    this.labData = json
  }

  exportGlobalDevicesConf() {

    const devicesConf: { [deviceName: string]: string } = {}
    const devices = this.getDevices();

    devices.forEach(device => {
      let conf = "";
      const interfaces = this.getDeviceInterfaces(device)
      conf += this.createDeviceConf(device)

      interfaces.forEach(itfList => {
        if (itfList.length > 1) {
          itfList.forEach(itf => {
            conf += this.createInterfacesConf(itf)
          })
        } else {
          conf += this.createInterfacesConf(<Interfaces><unknown>itfList)
        }
      })
      devicesConf[this.getDeviceName(device)] = conf
    })
    return devicesConf;
  }

  private createDeviceConf(device: Device) {
    let conf = "";
    for (const key in device) {
      if (key == 'startups_commands' || key == 'default_command' && device[key]) {
        device[key].forEach((command: string) => {
          conf += command + "\n";
          conf = this.replaceDeviceName(device, conf);
        })
      }
    }
    return conf;
  }

  private createInterfacesConf(itf: Interfaces) {
    let conf = "";
    for (const key in itf) {
      if (key == 'ip' && itf['ip'] != undefined && itf['cidr'] != undefined) {
        conf += JsonToConf['IP_ADDRESS_ADD'] + "\n"
      }
      if (key == 'is_up' && itf[key] == true && itf['cidr'] != undefined){
        conf += JsonToConf['IP_UP'] + "\n"
      }
      conf = this.replaceInterfaceInformation(itf, conf);
    }
    return conf
  }

  public getDeviceName(device: Device) {
    if (device) {
      return device.deviceName
    }
  }
}
