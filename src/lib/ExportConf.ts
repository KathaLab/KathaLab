import {Lab} from "../model/Lab";
import {ModelToKatharaConf} from "./ModelToKatharaConf";
import * as RegexConst from "./RegexConst";
import {DeviceType} from "../model/Device";

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

                if (device.interfaces) {
                    device.interfaces.forEach(itf => {
                        if (itf.collision_domain) {
                            conf += ModelToKatharaConf['collision_domain'] + itf.collision_domain + "\n";
                            conf = conf.replace(`%interfaceName%`, itf.interfaceName);
                        }
                    })
                }

                if (device.type == DeviceType.Router) {
                    if (device.optional_parameters && device.optional_parameters.ipv6 == true){
                        conf += '%deviceName%[sysctl]=net.ipv6.conf.all.forwarding=1 \n';
                    }
                }

                if (device.optional_parameters) {
                    for (const key in device.optional_parameters) {
                        if (key == 'image' || key == 'memory' || key == 'cpus' || key == 'port' || key == 'bridged' || key == 'ipv6' || key == 'ipv6' || key == 'exec' || key == 'sysctl' || key == 'env' || key == 'shell' || key == 'num_terms') {
                            conf += ModelToKatharaConf[key] + `${device.optional_parameters[key]}` + '\n';
                        }
                    }
                }

                const deviceName = device.deviceName.toLowerCase()
                while (conf.indexOf('%deviceName%') !== -1) {
                    conf = conf.replace('%deviceName%', deviceName);
                }
            })
        }
        return conf
    }

    public exportStartupConf(lab: Lab) {
        const devicesStartupConf: { [deviceName: string]: string } = {}

        lab.devices.forEach(device => {
            let conf = "";

            if (device.interfaces) {
                device.interfaces.forEach(itf => {
                    if (itf.is_up == true && itf.interfaceName) {
                        conf += ModelToKatharaConf.IP_UP + '\n';
                        conf = conf.replace(`%interfaceName%`,itf.interfaceName);
                    }
                    if (itf.interfaceName && itf.ip && itf.cidr) {
                        conf += ModelToKatharaConf.IP_ADDRESS_ADD + '\n';
                        for (const key in itf){
                            if (key == 'interfaceName' || key == 'ip' ||key == 'cidr'){
                                conf = conf.replace(`%${key}%`,<string>itf[key]);
                            }
                        }
                    }
                    if (device.optional_parameters && device.optional_parameters.bridged && device.optional_parameters.bridged == true) {
                        if (itf.ip.match(RegexConst.DEVICE_IP)) {
                            conf += ModelToKatharaConf.IPV4_FORWARD + "\n";
                        } else {
                            conf += ModelToKatharaConf.IPV6_FORWARD + "\n";
                        }
                    }
                })
            }

            if (device.startups_commands) {
                device.startups_commands.forEach(startupCmd => {
                    conf += startupCmd  + "\n";
                })
            }
            devicesStartupConf[device.deviceName.toLowerCase()] = conf
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
            devicesShutdownConf[device.deviceName.toLowerCase()] = conf
        })
        return devicesShutdownConf;
    }
}
