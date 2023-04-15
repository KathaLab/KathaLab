import React,  {useContext} from 'react'
import style from '../../ConfigPanel.module.scss'
import { Device } from '../../../../../../model/Device';
import { Expanded } from '../../../../../../components/Expanded/Expanded'
import { ListCommand } from '../../ListCommand/ListCommand';
import { localizationContext } from "../../../../../../context/LocalizationContext";
import { LocalizationName } from "../../../../../../localization";

type ComponentType = {
    device: Device;
}
  
export const ShutdownCommands = ({device}: ComponentType) => {
    const { languageDico } = useContext(localizationContext);
   
    const setShutdownCommands = () => {
        device.shutdown_commands = device.shutdown_commands || [];
    }

    const getShutdownCommands = (commands: string[]) => {
        device.shutdown_commands = commands.filter(word => word !== '')
    }

    return (
        <Expanded title={languageDico[LocalizationName.shutdownCommands]} classTitle={style.labelMenu}>
              <ListCommand 
                onChange={setShutdownCommands}
                list={device.shutdown_commands ? device.shutdown_commands : []} 
                getCommands={(commands: string[]) => getShutdownCommands(commands)}
                className={style.inputListCommands}></ListCommand>
        </Expanded> 
    )
};