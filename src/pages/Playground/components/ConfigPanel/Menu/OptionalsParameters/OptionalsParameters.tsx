import React from 'react'
import style from '../../ConfigPanel.module.scss'
import { Device } from '../../../../../../model/Device';
import { Expanded } from '../../../../../../components/Expanded/Expanded'
import { TextInput } from '../../../../../../components/TextInput/TextInput';
import { Switch } from '../../../../../../components/Switch/Switch';
import { ListCommand } from '../../ListCommand/ListCommand';

type ComponentType = {
    device: Device;
    updateDevices: () => void;
}

export const OptionalsParameters = ({device, updateDevices}: ComponentType) => {

    const setBridged = () => {
        device.optional_parameters = device.optional_parameters || {}
        device.optional_parameters.bridged = !device.optional_parameters.bridged
        !device.optional_parameters.bridged && delete device.optional_parameters.bridged
    }

    const setIpv6 = () => {
        device.optional_parameters = device.optional_parameters || {}
        device.optional_parameters.ipv6 = !device.optional_parameters.ipv6
        !device.optional_parameters.ipv6 && delete device.optional_parameters.ipv6
    }

    const setPort = (value: string) => {
        device.optional_parameters = device.optional_parameters || {}
        device.optional_parameters.port = value
        device.optional_parameters.port === '' && delete device.optional_parameters.port
    }

    const setImage = (value: string) => {
        device.optional_parameters = device.optional_parameters || {}
        device.optional_parameters.image = value
        device.optional_parameters.image === '' && delete device.optional_parameters.image
    }

    const setMemory = (value: string) => {
        device.optional_parameters = device.optional_parameters || {}
        device.optional_parameters.memory = value
        device.optional_parameters.memory === '' && delete device.optional_parameters.memory
    }

    const setCpus = (value: number) => {
        device.optional_parameters = device.optional_parameters || {}
        device.optional_parameters.cpus = value
        device.optional_parameters.cpus === null && delete device.optional_parameters.cpus
    }

    const setExec = (value: string) => {
        device.optional_parameters = device.optional_parameters || {}
        device.optional_parameters.exec = value
        device.optional_parameters.exec === '' && delete device.optional_parameters.exec
    }

    const setSysctl = () => {
        device.optional_parameters = device.optional_parameters || {}
        device.optional_parameters.sysctl = device.optional_parameters.sysctl || [];
    }

    const getSysctl = (commands: string[]) => {
        device.optional_parameters.sysctl = commands.filter(word => word !== '')
    }

    const setEnv = () => {
        device.optional_parameters = device.optional_parameters || {}
        device.optional_parameters.env = device?.optional_parameters.env || [];
    }

    const getEnv = (commands: string[]) => {
        device.optional_parameters.env = commands.filter(word => word !== '')
    }

    // const setEnv = (value: string) => {
    //     device.optional_parameters = device.optional_parameters || {}
    //     device.optional_parameters.env = value
    //     device.optional_parameters.env === '' && delete device.optional_parameters.env
    // }

    const setShell = (value: string) => {
        device.optional_parameters = device.optional_parameters || {}
        device.optional_parameters.shell = value
        device.optional_parameters.shell === '' && delete device.optional_parameters.shell
    }

    const setNumTerms = (value: number) => {
        device.optional_parameters = device.optional_parameters || {}
        device.optional_parameters.num_terms = value
        device.optional_parameters.num_terms === 0 && delete device.optional_parameters.num_terms
    }

    return (
        <Expanded title="Optionals parameters" classTitle={style.labelMenu}>
            <div className={style.menuOptionsParameters}>
                <div className={style.label}>
                    <p className={style.labelForm}>Bridged</p>
                    <Switch
                    onChange={() => {setBridged(); updateDevices()}}
                    state={device.optional_parameters?.bridged || false}></Switch>
                </div>
                <div className={style.label}>
                    <p className={style.labelForm}>Port</p>
                    <TextInput type={"NUMBER"}
                    value={device?.optional_parameters?.port}
                    placeholder="82000"
                    onChange={(value) => {setPort(value); updateDevices()}}
                    className={style.inputForm}></TextInput>
                </div>
                <div className={style.label}>
                    <p className={style.labelForm}>Image</p>
                    <TextInput
                    value={device?.optional_parameters?.image}
                    placeholder=""
                    onChange={(value) => {setImage(value); updateDevices()}}
                    className={style.inputForm}></TextInput>
                </div>
                <div className={style.label}>
                    <p className={style.labelForm}>Memory</p>
                    <TextInput
                    value={device?.optional_parameters?.memory}
                    placeholder=""
                    onChange={(value) => {setMemory(value); updateDevices()}}
                    className={style.inputForm}></TextInput>
                </div>
                <div className={style.label}>
                    <p className={style.labelForm}>Cpus</p>
                    <TextInput
                    value={device?.optional_parameters?.cpus ? device?.optional_parameters?.cpus.toString() : ""}
                    placeholder=""
                    onChange={(value) => {setCpus(Number(value)); updateDevices()}}
                    className={style.inputForm}></TextInput>
                </div>
                <div className={style.label}>
                    <p className={style.labelForm}>Exec</p>
                    <TextInput
                    value={device?.optional_parameters?.exec}
                    placeholder=""
                    onChange={(value) => {setExec(value); updateDevices()}}
                    className={style.inputForm}></TextInput>
                </div>
                <div className={style.label}>
                    <p className={style.labelForm}>Ipv6</p>
                    <Switch
                    onChange={() => {setIpv6(); updateDevices()}}
                    state={device.optional_parameters?.ipv6 || false}></Switch>
                </div>
                <div>
                    <Expanded title="Systl" classTitle={style.labelMenu}>
                        <ListCommand
                            onChange={setSysctl}
                            list={device?.optional_parameters?.sysctl? device.optional_parameters.sysctl : []}
                            getCommands={(commands: string[]) => getSysctl(commands)}
                            className={style.inputListCommands}></ListCommand>
                    </Expanded>
                </div>
                {/* <div >
                    <p className={style.labelForm}>Sysctl</p>
                    <TextInput
                    value={device?.optional_parameters?.sysctl}
                    placeholder=""
                    onChange={(value) => {setSysctlc(value); updateDevices()}}
                    className={style.inputForm}></TextInput>
                </div> */}
                <div>
                    <Expanded title="Env" classTitle={style.labelMenu}>
                        <ListCommand
                            onChange={setEnv}
                            list={device?.optional_parameters?.env? device.optional_parameters.env : []}
                            getCommands={(commands: string[]) => getEnv(commands)}
                            className={style.inputListCommands}></ListCommand>
                    </Expanded> 
                </div>
                {/* <div className={style.label}>
                    <p className={style.labelForm}>Env</p>
                    <TextInput
                    value={device?.optional_parameters?.env}
                    placeholder=""
                    onChange={(value) => {setEnv(value); updateDevices()}}
                    className={style.inputForm}></TextInput>
                </div> */}
                <div className={style.label}>
                    <p className={style.labelForm}>Shell</p>
                    <TextInput
                    value={device?.optional_parameters?.shell}
                    placeholder=""
                    onChange={(value) => {setShell(value); updateDevices()}}
                    className={style.inputForm}></TextInput>
                </div>
                <div className={style.label}>
                    <p className={style.labelForm}>Num_terms</p>
                    <TextInput
                    value={device?.optional_parameters?.num_terms?  device?.optional_parameters?.num_terms.toString() : ""}
                    placeholder=""
                    onChange={(value) => {setNumTerms(Number(value)); updateDevices()}}
                    className={style.inputForm}></TextInput>
                </div>
            </div>
        </Expanded>
    )
};
