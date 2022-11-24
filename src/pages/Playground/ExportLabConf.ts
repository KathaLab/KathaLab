// eslint-disable-next-line import/namespace
import {JsonToConf} from "../../model/JsonToConf";
import {Lab} from "../../model/Lab";
import {Device} from "../../model/Device";
import {Interfaces} from "../../model/Interfaces";

export default class ExportLabConf {
  private readonly json: Lab;

  constructor(json: Lab) {
    this.json = json
  }

  exportGlobalLabConf() {
    let conf = "";
    const devices = this.getLabDevices();
    conf += this.generateLabConf(this.json);

    devices.forEach(device => {
      const interfaces = this.getDeviceInterfaces(device);
      interfaces.forEach(itfList => {

        if (itfList.length > 1) {
          itfList.forEach(itf => {
            conf += this.generateInterfacesConf(itf)
            conf = this.setConfDeviceName(device, conf);
            conf = this.setInterfaceConf(itf, conf);
          })
        } else {
          conf += this.generateInterfacesConf(itfList);
          conf = this.setConfDeviceName(device, conf);
          conf = this.setInterfaceConf(itfList, conf);
        }
      })
    })
    return conf;
  }

  private generateLabConf(json: Lab) {
    let conf = "";
    for (const key in json) {
      if (JsonToConf[key] && json[key] && key !== undefined) {
        conf += JsonToConf[key] + json[key] + "\n";
      }
    }
    return conf;
  }

  private generateInterfacesConf(interfaces: Interfaces | Interfaces[]) {
    let conf = "";
    for (const key in interfaces) {
      if (JsonToConf[key] && interfaces[key] && key !== undefined) {
        conf += JsonToConf[key] + "\n";
      }
    }
    return conf;
  }

  private setInterfaceConf(itf: Interfaces | Interfaces[], conf: string) {
    for (const key in itf) {
      conf = conf.replace(`%${key}%`, itf[key]);
    }
    return conf;
  }

  private setConfDeviceName(device: Device, conf: string) {
    for (const key in device) {
      conf = conf.replace(`%${key}%`, device[key]);
    }
    return conf;
  }

  getLabDevices(): Device[] {
    const DEVICE_KEY = 'devices'
    for (const key in this.json) {
      if (key === DEVICE_KEY) {
        return this.json[key]
      }
    }
    return;
  }

  getDeviceInterfaces(device: Device) {
    const INTERFACE_KEY = 'interfaces'
    const interfaces: Interfaces[][] = [];

    for (const key in device) {
      if (key === INTERFACE_KEY) {
        interfaces.push(device[key]);
      }
    }

    return interfaces
  }
}