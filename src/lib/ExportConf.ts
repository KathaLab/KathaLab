import {Lab} from "../model/Lab";
import {ModelToKatharaConf} from "./ModelToKatharaConf";
import * as RegexConst from "./RegexConst";
import {DeviceType} from "../model/Device";

export default class ExportConf {

    public exportLabConf(lab: Lab) {
        let conf = "";

        if (!lab.labName.match(RegexConst.EXPORTED_LAB_NAME_REGEX)){
            throw "Can't export lab, be sure lab name doesn't have more than 32 characters and specials characters, only '_' and '-' are allowed";
        }

        for (const key in lab) {
            if (key == 'labName' || key == 'description' || key == 'author' || key == 'email' || key == 'version' || key == 'web') {
                const value = ModelToKatharaConf[key] + `"${lab[key]}"`;
                if (key == 'version'  && value.length >= 32){
                    throw `Can't export a lab : ${key} with more than 32 characters not allowed`;
                }
                if (key == 'author' || key == 'web' || key == 'email' && value.length >= 128){
                    throw `Can't export a lab : ${key} with more than 96 characters not allowed`;
                }
                if (key == 'description' && value.length >= 256){
                    throw `Can't export a lab : ${key} with more than 256 characters not allowed`;
                }
                conf += value.trim() + '\n';
            }
        }

        if (lab.devices) {
            lab.devices.forEach(device => {
                if (!device.deviceName.match(RegexConst.EXPORTED_NAME_REGEX)){
                    throw "Can't export lab, be sure devices names doesn't have more than 32 characters and specials characters";
                }

                if (device.interfaces) {
                    device.interfaces.forEach(itf => {
                        if (!itf.interfaceName.match(RegexConst.EXPORTED_NAME_REGEX)){
                            throw "Can't export lab, be sure interfaces names doesn't have more than 32 characters or specials characters";
                        }

                        if (itf.collision_domain) {
                            if (!itf.collision_domain.match(RegexConst.EXPORTED_NAME_REGEX)){
                                throw "Can't export lab, be sure collisions domains  doesn't have more than 32 characters or specials characters";
                            }
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
                        if (key == 'image' || key == 'memory' || key == 'port' || key == 'bridged' || key == 'ipv6' || key == 'exec' || key == 'shell') {
                            const value = ModelToKatharaConf[key] + `${device.optional_parameters[key]}`;
                            if (value.length > 256){
                                throw `Can't export a lab : ${key} with more than 256 characters not allowed`;
                            }
                            conf += value.trim() + '\n';
                        }
                        if (key == 'cpus' || key == 'num_terms'){
                            if (!Number.isInteger(device.optional_parameters[key])){
                                throw `Can't export a lab : ${key} must be an integer`;
                            }
                            const value = ModelToKatharaConf[key] + `${device.optional_parameters[key]}`;
                            conf += value.trim() + '\n';
                        }

                        if (key == 'env' || key == 'sysctl'){
                            device.optional_parameters[key].forEach( value => {
                                if (value.length > 256){
                                    throw `Can't export a lab : ${key} with more than 256 characters not allowed`;
                                }
                                conf += ModelToKatharaConf[key] + value + '\n';
                            })
                        }
                    }
                }

                const deviceName = device.deviceName.toLowerCase().trim();
                while (conf.indexOf('%deviceName%') !== -1) {
                    conf = conf.replace('%deviceName%', deviceName);
                }
            })
        }
        return conf;
    }

    public exportStartupConf(lab: Lab) {
        const devicesStartupConf: { [deviceName: string]: string } = {}
        lab.devices.forEach(device => {
            if (!device.deviceName.match(RegexConst.EXPORTED_NAME_REGEX)){
                throw "Can't export lab, be sure devices names doesn't have more than 32  characters or specials characters";
            }

            let conf = "";
            if (device.interfaces) {
                device.interfaces.forEach(itf => {
                    if (!itf.interfaceName.match(RegexConst.EXPORTED_NAME_REGEX)){
                        throw "Can't export lab, be sure interfaces names doesn't have more than 32 characters or specials characters";
                    }

                    if (itf.is_up && itf.is_up == true && itf.interfaceName) {
                        conf += ModelToKatharaConf.IP_UP + '\n';
                        conf = conf.replace(`%interfaceName%`,itf.interfaceName.trim);
                    }

                    if (itf.interfaceName && itf.ip && itf.cidr) {
                        if (!itf.cidr.toString().match(RegexConst.DEVICE_CIDR)){
                            throw "Can't export lab, be sure CIDR is valid";
                        }
                        if (!itf.ip.match(RegexConst.DEVICE_IP)){
                            throw "Can't export lab, be sure IP is valid";
                        }
                        conf += ModelToKatharaConf.IP_ADDRESS_ADD + '\n';
                        for (const key in itf){
                            if (key == 'interfaceName' || key == 'ip' ||key == 'cidr'){
                                conf = conf.replace(`%${key}%`,<string>itf[key].toString().trim());
                            }
                        }
                    }
                    if (device.optional_parameters && device.optional_parameters.bridged && device.optional_parameters.bridged == true) {
                        if (itf.ip.match(RegexConst.DEVICE_IP)) {
                            conf += ModelToKatharaConf.IPV4_FORWARD + "\n";
                        }
                        /*else {
                            conf += ModelToKatharaConf.IPV6_FORWARD + "\n";
                        }*/

                    }
                })
            }

            if (device.startups_commands) {
                device.startups_commands.forEach(startupCmd => {
                    const value = startupCmd;
                    if (value.length >= 256){
                        throw "Can't export lab, a startup command can't have more than 256 characters";
                    }
                    conf += value.trim() + '\n';
                })
            }
            devicesStartupConf[device.deviceName.toLowerCase()] = conf;
        })
        return devicesStartupConf;
    }

    public exportShutdownConf(lab: Lab) {
        const devicesShutdownConf: { [deviceName: string]: string } = {};

        lab.devices.forEach(device => {
            let conf = '';
            if (!device.deviceName.match(RegexConst.EXPORTED_NAME_REGEX)){
                throw "Can't export lab, be sure devices names doesn't have more than 32  characters or specials characters";
            }

            if (device.shutdown_commands) {
                device.shutdown_commands.forEach(shutdownCmd => {
                    const value = shutdownCmd;
                    if (value.length >= 256){
                        throw "Can't export lab, a shutdown command can't have more than 256 characters";
                    }
                    conf += value.trim() + '\n';
                })
            }
            devicesShutdownConf[device.deviceName.toLowerCase()] = conf;
        })
        return devicesShutdownConf;
    }
}
