import {Lab} from "../model/Lab";
import {ModelToKatharaConf} from "./ModelToKatharaConf";
import * as RegexConst from "./RegexConst";
import {DeviceType} from "../model/Device";
import { Language, LanguageToLocalization, LocalizationName } from "../localization";

export default class ExportConf {

    public static lang: Language = Language.EN

    public static exportLabConf(lab: Lab) {
        let conf = "";

        if (!lab.labName.match(RegexConst.EXPORTED_LAB_NAME_REGEX)){
            throw LanguageToLocalization[ExportConf.lang][LocalizationName.exportlabNameError]
        }

        for (const key in lab) {
            if (key == 'labName' || key == 'description' || key == 'author' || key == 'email' || key == 'version' || key == 'web') {
                const value = ModelToKatharaConf[key] + `"${lab[key]}"`;
                if (key == 'version'  && value.length >= 32){
                    throw key + " " + LanguageToLocalization[ExportConf.lang][LocalizationName.exportlabParameterError32];
                }
                if (key == 'author' || key == 'web' || key == 'email' && value.length >= 128){
                    throw key + " " + LanguageToLocalization[ExportConf.lang][LocalizationName.exportlabParameterError128];
                }
                if (key == 'description' && value.length >= 256){
                    throw key + " " + LanguageToLocalization[ExportConf.lang][LocalizationName.exportlabParameterError256];
                }
                conf += value.trim() + '\n';
            }
        }

        if (lab.devices) {
            lab.devices.forEach(device => {
                if (!device.deviceName.match(RegexConst.EXPORTED_NAME_REGEX)){
                    throw LanguageToLocalization[ExportConf.lang][LocalizationName.exportdeviceNameError]
                }

                if (device.interfaces) {
                    device.interfaces.forEach(itf => {
                        if (!itf.interfaceName.match(RegexConst.EXPORTED_NAME_REGEX)){
                            throw LanguageToLocalization[ExportConf.lang][LocalizationName.exportInterfaceNameError]
                        }

                        if (itf.collision_domain) {
                            if (!itf.collision_domain.match(RegexConst.EXPORTED_NAME_REGEX)){
                                throw LanguageToLocalization[ExportConf.lang][LocalizationName.exportCollisionDomainError]
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
                                throw key + " " + LanguageToLocalization[ExportConf.lang][LocalizationName.exportlabParameterError256];
                            }
                            conf += value.trim() + '\n';
                        }
                        if (key == 'cpus' || key == 'num_terms'){
                            if (device.optional_parameters[key] != null){
                                if (device.optional_parameters[key].toString().match(RegexConst.EXPORTED_NUMBER_VAR_REGEX)){
                                    const value = ModelToKatharaConf[key] + `${device.optional_parameters[key]}`;
                                    conf += value.trim() + '\n';
                                }else {
                                    throw key + " " + LanguageToLocalization[ExportConf.lang][LocalizationName.exportlabParameterError256];
                                }
                            }
                        }

                        if (key == 'env' || key == 'sysctl'){
                            device.optional_parameters[key].forEach( value => {
                                if (value.length > 256){
                                    throw key + " " + LanguageToLocalization[ExportConf.lang][LocalizationName.exportlabParameterError256];
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

    public static exportStartupConf(lab: Lab) {
        const devicesStartupConf: { [deviceName: string]: string } = {}
        lab.devices.forEach(device => {
            if (!device.deviceName.match(RegexConst.EXPORTED_NAME_REGEX)){
                throw LanguageToLocalization[ExportConf.lang][LocalizationName.exportdeviceNameError]
            }

            let conf = "";
            if (device.interfaces) {
                device.interfaces.forEach(itf => {
                    if (!itf.interfaceName.match(RegexConst.EXPORTED_NAME_REGEX)){
                        throw LanguageToLocalization[ExportConf.lang][LocalizationName.exportInterfaceNameError]
                    }

                    if (itf.is_up == true) {
                        conf += ModelToKatharaConf.IP_UP + '\n';
                        conf = conf.replace(`%interfaceName%`,itf.interfaceName.trim());
                    }

                    if (itf.interfaceName && itf.ip && itf.cidr) {
                        if (!itf.cidr.toString().match(RegexConst.DEVICE_CIDR)){
                            throw LanguageToLocalization[ExportConf.lang][LocalizationName.exportlabParameterCIDRError]
                        }
                        if (!itf.ip.match(RegexConst.DEVICE_IP)){
                            throw LanguageToLocalization[ExportConf.lang][LocalizationName.exportlabParameterIPError]
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
                        throw "startup commands " + LanguageToLocalization[ExportConf.lang][LocalizationName.exportlabParameterError256];
                    }
                    conf += value.trim() + '\n';
                })
            }
            devicesStartupConf[device.deviceName.toLowerCase()] = conf;
        })
        return devicesStartupConf;
    }

    public static exportShutdownConf(lab: Lab) {
        const devicesShutdownConf: { [deviceName: string]: string } = {};

        lab.devices.forEach(device => {
            let conf = '';
            if (!device.deviceName.match(RegexConst.EXPORTED_NAME_REGEX)){
                throw LanguageToLocalization[ExportConf.lang][LocalizationName.exportdeviceNameError]
            }

            if (device.shutdown_commands) {
                device.shutdown_commands.forEach(shutdownCmd => {
                    const value = shutdownCmd;
                    if (value.length >= 256){
                        throw "shutdown commands " + LanguageToLocalization[ExportConf.lang][LocalizationName.exportlabParameterError256];
                    }
                    conf += value.trim() + '\n';
                })
            }
            devicesShutdownConf[device.deviceName.toLowerCase()] = conf;
        })
        return devicesShutdownConf;
    }
}
