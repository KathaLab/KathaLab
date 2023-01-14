import React from 'react'
import style from '../../ConfigPanel.module.scss'
import { Device } from '../../../../../../model/Device';
import { Expanded } from '../../../../../../components/Expanded/Expanded'
import { ListCommand } from '../../ListCommand/ListCommand';


type ComponentType = {
    device: Device;
}

  
export const StartupCommands = ({device}: ComponentType) => {
   
    const setStartupsCommands = () => {
        device.startups_commands = device.startups_commands || [];
    }

    const getStartupCommands = (commands: string[]) => {
        console.log(commands.filter(word => word !== ''))
        device.startups_commands = commands.filter(word => word !== '')
    }

    return (
        <Expanded title="Startup commands" classTitle={style.labelMenu}>
            <ListCommand 
            onChange={setStartupsCommands} 
            list={device.startups_commands ? device.startups_commands : []}
            getCommands={(commands: string[]) => getStartupCommands(commands)}
            className={style.inputListCommands}></ListCommand>
        </Expanded>  
    )
};