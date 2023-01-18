import {Lab} from "../model/Lab";
import {Interfaces} from "../model/Interfaces";
import {Device} from "../model/Device";
import {ModelToKatharaConf} from "./ModelToKatharaConf";
import * as RegexConst from "./RegexConst";

export default class ExportConf {

    public exportLabConf(lab: Lab) {
        let conf = ""

        for (const key in lab) {
            if (key == 'labName' || key == 'description' || key == 'author' || key == 'email' || key == 'version') {
                conf += ModelToKatharaConf[key] + `"${lab[key]}"` + "\n";
            }
        }

        if (lab.devices) {
            lab.devices.forEach(device => {
                if (device.default_command) {
                    conf += device.default_command  + "\n";
                }
                if (device.optional_parameters) {
                    for (const key in device.optional_parameters) {
                        if (key == 'image' || key == 'memory' || key == 'cpus' || key == 'port' || key == 'bridged' || key == 'ipv6' || key == 'ipv6' || key == 'exec' || key == 'sysctl' || key == 'env' || key == 'shell' || key == 'num_terms') {
                            conf += ModelToKatharaConf[key] + `"${device.optional_parameters[key]}"` + "\n";
                            this.replaceDeviceInformation(device, conf)
                        }
                    }
                }

                if (device.interfaces) {
                    device.interfaces.forEach(itf => {
                        if (itf.collision_domain) {
                            conf += ModelToKatharaConf['collision_domain'] + itf.collision_domain + "\n";
                            this.replaceInterfaceInformation(itf, conf)
                            this.replaceDeviceInformation(device, conf)
                        }
                    })
                }
            })
        }

        return conf
    }

    public exportStartupConf(lab: Lab) {
        const devicesStartupConf: { [deviceName: string]: string } = {}

        lab.devices.forEach(device => {
            let conf = "";

            if (device.startups_commands) {
                device.startups_commands.forEach(startupCmd => {
                    conf += startupCmd  + "\n";
                })
            }

            if (device.interfaces) {
                device.interfaces.forEach(itf => {
                    if (itf.interfaceName && itf.ip && itf.cidr) {
                        conf += ModelToKatharaConf.IP_ADDRESS_ADD + '\n';
                        if (itf.is_up == true) {
                            conf += ModelToKatharaConf.IP_UP + '\n';
                            this.replaceInterfaceInformation(itf, conf)
                        }
                        this.replaceInterfaceInformation(itf, conf)
                    }
                    if (device.optional_parameters && device.optional_parameters.bridged && device.optional_parameters.bridged == true) {
                        if (itf.ip.match(RegexConst.IP_REGEX)) {
                            conf += ModelToKatharaConf.IPV4_FORWARD + "\n";
                        } else {
                            conf += ModelToKatharaConf.IPV6_FORWARD + "\n";
                        }
                    }
                })
            }
            devicesStartupConf[device.deviceName.toUpperCase()] = conf
        })
        return devicesStartupConf;
    }

    public exportShutdownConf(lab: Lab) {
        const devicesShutdownConf: { [deviceName: string]: string } = {}

        lab.devices.forEach(device => {
            let conf = '';

            if (device.shutdown_commands) {
                device.shutdown_commands.forEach(shutdownCmd => {
                    conf += shutdownCmd + "\n";
                })
            }
            devicesShutdownConf[device.deviceName.toUpperCase()] = conf
        })
        return devicesShutdownConf;
    }

    protected replaceInterfaceInformation(itf: Interfaces, conf: string): string {
        for (const key in itf) {
            if (key == 'interfaceName' || key == 'collision_domain' || key == 'ip' || key == 'cidr') {
                conf = conf.replace(`%${key}%`, <string>itf[key]);
            }
        }
        return conf;
    }

    protected replaceDeviceInformation(device: Device, conf: string) {
        for (const key in device) {
            if (key == 'deviceName') {
                conf = conf.replace(`%${key}%`, <string>device[key]);
            }
            if (key == 'optional_parameters') {
                for (const optParamKey in device[key]) {
                    if (optParamKey == 'image' || optParamKey == 'memory' || optParamKey == 'cpus' || optParamKey == 'port' || optParamKey == 'bridged' || optParamKey == 'ipv6' || optParamKey == 'ipv6' || optParamKey == 'exec' || optParamKey == 'sysctl' || optParamKey == 'env' || optParamKey == 'shell' || optParamKey == 'num_terms') {
                        conf = conf.replace(`%${optParamKey}%`, <string>device.optional_parameters[optParamKey])
                    }
                }
            }
        }
        return conf;
    }
}
