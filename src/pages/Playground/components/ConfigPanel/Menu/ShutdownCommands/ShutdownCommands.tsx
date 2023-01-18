import React from 'react'
import style from '../../ConfigPanel.module.scss'
import { Device } from '../../../../../../model/Device';
import { Expanded } from '../../../../../../components/Expanded/Expanded'
import { ListCommand } from '../../ListCommand/ListCommand';

type ComponentType = {
    device: Device;
}
  
export const ShutdownCommands = ({device}: ComponentType) => {
   
    const setShutdownCommands = () => {
        device.shutdown_commands = device.shutdown_commands || [];
    }

    const getShutdownCommands = (commands: string[]) => {
        device.shutdown_commands = commands.filter(word => word !== '')
    }

    return (
        <Expanded title="Shutdown commands" classTitle={style.labelMenu}>
              <ListCommand 
                onChange={setShutdownCommands}
                list={device.shutdown_commands ? device.shutdown_commands : []} 
                getCommands={(commands: string[]) => getShutdownCommands(commands)}
                className={style.inputListCommands}></ListCommand>
        </Expanded> 
    )
};