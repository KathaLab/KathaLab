import {Lab} from "../model/Lab";
import {ModelToKatharaConf} from "./ModelToKatharaConf";
import * as RegexConst from "./RegexConst";
import {DeviceType} from "../model/Device";

export default class ExportConf {


    public exportLabConf(lab: Lab) {
        let conf = ""

        if (lab.labName === ''){
            throw 'Can\' t export a lab without name';
        }
        //TODO VERIFICATION AVEC REGEX NOM PAS DE CARACT SPECIAUX & 1-32 CARACT MAX


        for (const key in lab) {
            if (key == 'labName' || key == 'description' || key == 'author' || key == 'email' || key == 'version' || key == 'web') {
                const value = ModelToKatharaConf[key] + `"${lab[key]}"` + "\n";
                if (key == 'version'  && value.length >= 32){
                    throw `Can't export a lab : ${key} with more than 32 character not allowed`;
                }
                if (key == 'author' || key == 'web' || key == 'email' && value.length >= 128){
                    throw `Can't export a lab : ${key} with more than 96 character not allowed`;
                }
                if (key == 'description' && value.length >= 256){
                    throw `Can't export a lab : ${key} with more than 256 character not allowed`;
                }
                conf += value.trim()
            }
        }

        if (lab.devices) {
            lab.devices.forEach(device => {

                if (device.deviceName === ''){
                    throw 'Can\' t export a lab without device name set';
                }
                //TODO VERIFICATION AVEC REGEX NOM PAS DE CARACT SPECIAUX & 1-32 CARACT MAX


                if (device.interfaces) {
                    device.interfaces.forEach(itf => {
                        if (itf.interfaceName === ''){
                            throw 'Can\' t export a lab without interface name set';
                        }
                        //TODO VERIFICATION AVEC REGEX NOM PAS DE CARACT SPECIAUX & 1-32 CARACT MAX


                        if (itf.collision_domain) {
                            //TODO VERIFICATION AVEC REGEX NOM PAS DE CARACT SPECIAUX & 1-32 CARACT MAX
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
                        if (key == 'image' || key == 'memory' || key == 'cpus' || key == 'port' || key == 'bridged' || key == 'ipv6' || key == 'exec' || key == 'shell' || key == 'num_terms') {
                            conf += ModelToKatharaConf[key] + `${device.optional_parameters[key]}` + '\n';
                        }
                        // TODO VERIFICATION AVEC REGEX image memory port bridged ipv6 exec shell PAS DE CARACT SPÉCIAUX 1-128
                        //  CPUS NUM TERMS VERIF NUMBER

                        if (key == 'env' || key == 'sysctl'){
                            device.optional_parameters[key].forEach( value => {
                                conf += ModelToKatharaConf[key] + value + '\n';
                            })
                            // TODO VERIFICATION AVEC REGEX PAS DE CARACT SPÉCIAUX 1-128
                        }
                    }
                }

                const deviceName = device.deviceName.toLowerCase().trim()
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
            if (device.deviceName === ''){
                throw 'Can\' t export a lab without device name';
            }else if (device.deviceName.length >= 32){
                throw 'Can\' t export a lab with a device name set with more 32 character';
            }
            //TODO VERIFICATION AVEC REGEX NOM PAS DE CARACT SPECIAUX & 1-32 CARACT MAX


            let conf = "";
            if (device.interfaces) {
                device.interfaces.forEach(itf => {
                    if (itf.interfaceName === ''){
                        throw 'Can\' t export a lab without interface name';
                    }else if (itf.interfaceName.length >= 32){
                        throw 'Can\' t export a lab with an interface name set with more 32 character';
                    }
                    //TODO VERIFICATION AVEC REGEX NOM PAS DE CARACT SPECIAUX

                    if (itf.is_up == true && itf.interfaceName) {
                        conf += ModelToKatharaConf.IP_UP + '\n';
                        conf = conf.replace(`%interfaceName%`,itf.interfaceName.trim);
                    }
                    if (itf.interfaceName && itf.ip && itf.cidr) {
                        conf += ModelToKatharaConf.IP_ADDRESS_ADD + '\n';
                        for (const key in itf){
                            //TODO VERIFICATION AVEC REGEX IP ET CIDR
                            if (key == 'interfaceName' || key == 'ip' ||key == 'cidr'){
                                conf = conf.replace(`%${key}%`,<string>itf[key].toString().trim());
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
                    const value = startupCmd + "\n"
                    conf += value.trim().slice(0,256);
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
                    const value = shutdownCmd + "\n"
                    conf += value.trim().slice(0,256);
                })
            }
            devicesShutdownConf[device.deviceName.toLowerCase()] = conf
        })
        return devicesShutdownConf;
    }
}
