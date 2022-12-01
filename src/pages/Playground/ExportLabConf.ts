import {JsonToConf} from "../../model/JsonToConf";
import {Lab} from "../../model/Lab";
import {Device} from "../../model/Device";
import {Interfaces} from "../../model/Interfaces";

export default class ExportLabConf {
  private readonly json: Lab;

  constructor(json: Lab) {
    this.json = json
  }

  public exportGlobalLabConf() {
    let conf = "";
    const devices = this.getDevices();

    conf += this.getLabConf(this.json);

    devices.forEach(device => {
      conf += this.createLabDevicesConf(device);
      const interfaces = this.getDeviceInterfaces(device);
      interfaces.forEach(itfList => {
        if (itfList.length > 1) {
          itfList.forEach(itf => {
            conf += this.createLabInterfacesConf(itf, device)
          })
        } else {
          conf += this.createLabInterfacesConf(<Interfaces><unknown>itfList, device);
        }
      })
    })
    return conf;
  }

  private createLabDevicesConf(device: Device) {
    let conf = "";

    for (const key in device) {
      if (key == 'default_command' && device[key]) {
        device[key].forEach(defaultCommand => {
          conf += defaultCommand;
        })
      }
      conf = this.createLabConf(key, conf);
      conf = this.replaceDeviceName(device, conf);
    }
    return conf;
  }

  private createLabInterfacesConf(itf: Interfaces, device: Device) {
    let conf = "";
    for (const key in itf) {
      if (key == 'bridged' && itf[key] == false){
        continue;
      }
      conf = this.createLabConf(key, conf);
      conf = this.replaceInterfaceInformation(itf, conf);
      conf = this.replaceDeviceName(device, conf);

    }
    return conf;
  }

  private createLabConf(key: string, conf: string, labJson: Lab = undefined) {
    const confKey = key

    if (confKey !== undefined && confKey == 'labName' || confKey == 'web' || confKey == 'author' || confKey == 'mail' || confKey == 'collision_domain' || confKey == 'bridged' || confKey == 'description') {
      if (labJson) {
        if (key !== undefined && key == 'labName' || key == 'web' || key == 'author' || key == 'mail' || key == 'version' || key == 'description') {
          conf += JsonToConf[confKey] + `"${labJson[key]}"` + "\n";
        }
      } else {
        conf += JsonToConf[confKey] + "\n";
      }
    }

    return conf;
  }

  public replaceInterfaceInformation(itf: Interfaces, conf: string): string {
    for (const key in itf) {
      if (key == 'interfaceName' || key == 'bridged' || key == 'collision_domain') {
        conf = conf.replace(`%${key}%`, <string>itf[key]);
      }
    }
    return conf;
  }

  public replaceDeviceName(device: Device, conf: string) {
    for (const key in device) {

      if (key == 'deviceName') {
        conf = conf.replace(`%${key}%`, <string>device[key]);
      }
    }
    return conf;
  }

  private getLabConf(lab: Lab) {
    let conf = "";
    for (const key in lab) {
      conf = this.createLabConf(key, conf, lab);
    }
    return conf;
  }

  public getDevices(): Device[] {
    const DEVICE_KEY = 'devices'
    for (const key in this.json) {
      if (key === DEVICE_KEY) {
        return this.json[key]
      }
    }
    return;
  }

  public getDeviceInterfaces(device: Device): Interfaces[][] {
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