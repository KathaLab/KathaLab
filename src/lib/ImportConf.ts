import {Lab} from "../model/Lab";
import * as RegexConst from "./RegexConst";
import {Device, DeviceType} from "../model/Device";
import {Interfaces} from "../model/Interfaces";

export default class ImportConf {

    public importGlobalLabConf(lab: Lab, line: string) {
        let isLabConf = false;

        this.getLabConf(lab, line)? isLabConf = true: isLabConf;

        if (isLabConf !== true){
            const deviceName = Array.from(line.matchAll(RegexConst.LAB_DEVICE_NAME_REGEX))[0]?.groups.deviceName;
            if (deviceName){
                let device = lab.devices.find((device) => device.deviceName == deviceName);

                if (!device){
                    device = {deviceName: deviceName, type: DeviceType.PC};
                    lab.devices.push(device)
                }
                this.getOptionalLabDeviceConf(device, line);
            }
        }
        return lab
    }

    public importGlobalDevicesConf(device: Device, line: string) {
        const interfaceName =
            Array.from(line.matchAll(RegexConst.LAB_DEVICE_INTERFACE_NAME_FROM_IP_ADD))[0]?.filter((interfaceName) => { return interfaceName != undefined})[1]
            ?? Array.from(line.matchAll(RegexConst.LAB_DEVICE_INTERFACE_NAME_AND_IP_IS_UP_REGEX))[0]?.filter((interfaceName) => { return interfaceName != undefined})[1]
            ?? undefined;

        console.log(line + " itf name : " + interfaceName + "\n");
        if (interfaceName){
            if (!device.interfaces){
                device.interfaces = [];
            }
            let itf = device.interfaces.find((itf) => itf.interfaceName == interfaceName);

            if (!itf){
                itf = {cidr: 0, collision_domain: "", interfaceName: interfaceName, ip: "", is_up: false};
                device.interfaces.push(itf)
            }
            this.getDeviceInterfacesConf(itf, device, line)
        }
    }

    private getLabConf(lab: Lab, line:string){

        if (Array.from(line.matchAll(RegexConst.LAB_NAME_REGEX))[0]?.groups.name){
            lab.labName = Array.from(line.matchAll(RegexConst.LAB_NAME_REGEX))[0].groups.name?.replace(/['"]/g, '').toString();
        }
        else if (Array.from(line.matchAll(RegexConst.LAB_DESCRIPTION_REGEX))[0]?.groups.description) {
            lab.description = Array.from(line.matchAll(RegexConst.LAB_DESCRIPTION_REGEX))[0].groups.description?.replace(/['"]/g, '').toString();
        }
        else if (Array.from(line.matchAll(RegexConst.LAB_AUTHOR_REGEX))[0]?.groups.author) {
            lab.author = Array.from(line.matchAll(RegexConst.LAB_AUTHOR_REGEX))[0].groups.author?.replace(/['"]/g, '').toString();
        }
        else if (Array.from(line.matchAll(RegexConst.LAB_EMAIL_REGEX))[0]?.groups.email) {
            lab.email = Array.from(line.matchAll(RegexConst.LAB_EMAIL_REGEX))[0].groups.email?.replace(/['"]/g, '').toString();
        }
        else if (Array.from(line.matchAll(RegexConst.LAB_WEB_REGEX))[0]?.groups.web) {
            lab.web = Array.from(line.matchAll(RegexConst.LAB_WEB_REGEX))[0].groups.web?.replace(/['"]/g, '').toString();
        }
        else if (Array.from(line.matchAll(RegexConst.LAB_VERSION_REGEX))[0]?.groups.version) {
            lab.version = Array.from(line.matchAll(RegexConst.LAB_VERSION_REGEX))[0].groups.version?.replace(/['"]/g, '').toString();
        }else {
            return false
        }
    }

    private getOptionalLabDeviceConf(device: Device, line:string) {
        if (!device.optional_parameters){
            device.optional_parameters = {};
        }
        if (Array.from(line.matchAll(RegexConst.LAB_DEVICE_IMAGE_REGEX))[0]?.groups.image){
            device.optional_parameters.image = Array.from(line.matchAll(RegexConst.LAB_DEVICE_IMAGE_REGEX))[0].groups.image?.replace(/['"]/g, '').toString();
        }
        else if (Array.from(line.matchAll(RegexConst.LAB_DEVICE_MEMORY_REGEX))[0]?.groups.memory){
            device.optional_parameters.memory = Array.from(line.matchAll(RegexConst.LAB_DEVICE_MEMORY_REGEX))[0].groups.memory?.replace(/['"]/g, '').toString();
        }
        else if (Array.from(line.matchAll(RegexConst.LAB_DEVICE_CPUS_REGEX))[0]?.groups.cpus){
            device.optional_parameters.cpus = Array.from(line.matchAll(RegexConst.LAB_DEVICE_CPUS_REGEX))[0].groups.cpus?.replace(/['"]/g, '').toString();
        }
        else if (Array.from(line.matchAll(RegexConst.LAB_DEVICE_PORT_REGEX))[0]?.groups.port){
            device.optional_parameters.port = Array.from(line.matchAll(RegexConst.LAB_DEVICE_PORT_REGEX))[0].groups.port?.replace(/['"]/g, '').toString();
        }
        else if (Array.from(line.matchAll(RegexConst.LAB_DEVICE_BRIDGED_REGEX))[0]?.groups.bridged){
            const isBridged = Array.from(line.matchAll(RegexConst.LAB_DEVICE_BRIDGED_REGEX))[0].groups.bridged?.replace(/['"]/g, '').toString();
            if (isBridged === 'true' || isBridged === '1'){
                device.optional_parameters.bridged = true
            }
            device.optional_parameters.bridged = false;
        }
        else if (Array.from(line.matchAll(RegexConst.LAB_DEVICE_IPV6_REGEX))[0]?.groups.ipv6){
            const isIpv6 = Array.from(line.matchAll(RegexConst.LAB_DEVICE_IPV6_REGEX))[0].groups.ipv6?.replace(/['"]/g, '').toString();
            if (isIpv6 === 'true' || isIpv6 === '1'){
                device.optional_parameters.ipv6 = true
            }
            device.optional_parameters.ipv6 = false
        }
        else if (Array.from(line.matchAll(RegexConst.LAB_DEVICE_EXEC_REGEX))[0]?.groups.exec){
            device.optional_parameters.exec = Array.from(line.matchAll(RegexConst.LAB_DEVICE_EXEC_REGEX))[0].groups.exec?.replace(/['"]/g, '').toString();
        }
        else if (Array.from(line.matchAll(RegexConst.LAB_DEVICE_SYSCTL_REGEX))[0]?.groups.sysctl){
            const ipv4Forward = '/proc/sys/net/ipv4/ip_forward=1';
            const ipv6Forward = '/proc/sys/net/ipv6/conf/all/forwarding=1';

            const systcl = Array.from(line.matchAll(RegexConst.LAB_DEVICE_SYSCTL_REGEX))[0].groups.sysctl?.replace(/['"]/g, '').toString();
            device.optional_parameters.sysctl = systcl;

            if (systcl == ipv4Forward || systcl == ipv6Forward){
                device.type = DeviceType.Router;
            }
        }
        else if (Array.from(line.matchAll(RegexConst.LAB_DEVICE_ENV_REGEX))[0]?.groups.env){
            device.optional_parameters.env = Array.from(line.matchAll(RegexConst.LAB_DEVICE_ENV_REGEX))[0].groups.env?.replace(/['"]/g, '').toString();
        }
        else if (Array.from(line.matchAll(RegexConst.LAB_DEVICE_SHELL_REGEX))[0]?.groups.shell){
            device.optional_parameters.shell = Array.from(line.matchAll(RegexConst.LAB_DEVICE_SHELL_REGEX))[0].groups.shell?.replace(/['"]/g, '').toString();
        }
        else if (Array.from(line.matchAll(RegexConst.LAB_DEVICE_NUM_TERMS_REGEX))[0]?.groups.num_terms){
            device.optional_parameters.num_terms = Number(Array.from(line.matchAll(RegexConst.LAB_DEVICE_NUM_TERMS_REGEX))[0].groups.num_terms?.replace(/['"]/g, ''));
        }
        else if (Array.from(line.matchAll(RegexConst.LAB_DEVICE_INTERFACE_NAME_REGEX))[0]?.groups.interfaceName){

            const interfaceName = Array.from(line.matchAll(RegexConst.LAB_DEVICE_INTERFACE_NAME_REGEX))[0]?.groups.interfaceName?.replace(/['"]/g, '').toString();
            if (interfaceName){
                if (!device.interfaces){
                    device.interfaces = [];
                }
                let itf = device.interfaces.find((itf) => itf.interfaceName == interfaceName);

                if (!itf){
                    itf = {cidr: 0, collision_domain: "", ip: "", is_up: false, interfaceName:interfaceName};
                    device.interfaces.push(itf)
                }
                if (Array.from(line.matchAll(RegexConst.LAB_DEVICE_INTERFACE_COLLISION_DOMAIN_REGEX))[0]?.groups.collision_domain){
                    itf.collision_domain = Array.from(line.matchAll(RegexConst.LAB_DEVICE_INTERFACE_COLLISION_DOMAIN_REGEX))[0]?.groups.collision_domain?.replace(/['"]/g, '').toString();
                }
            }
        }
    }

    private getDeviceInterfacesConf(itf: Interfaces,device: Device, line:string){
        if (Array.from(line.matchAll(RegexConst.LAB_DEVICE_INTERFACE_NAME_AND_IP_IS_UP_REGEX))[0]){
            itf.is_up = true;
        }else if (Array.from(line.matchAll(RegexConst.LAB_DEVICE_INTERFACE_IP_REGEX))[0]){
            itf.ip = Array.from(line.matchAll(RegexConst.LAB_DEVICE_INTERFACE_IP_REGEX))[0]?.filter((ip) => {
                return ip != undefined
            })[1]
        }else if (Array.from(line.matchAll(RegexConst.LAB_DEVICE_INTERFACE_CIDR_REGEX))[0]){
            const cidr = Array.from(line.matchAll(RegexConst.LAB_DEVICE_INTERFACE_CIDR_REGEX))[0]?.filter((cidr) => { return cidr != undefined })[1]
            itf.cidr = Number(cidr);
        }else {
            device.startups_commands.push(line);
        }
    }
}