import React, {useContext} from 'react'
import style from '../../ConfigPanel.module.scss'
import { Device } from '../../../../../../model/Device';
import { Expanded } from '../../../../../../components/Expanded/Expanded'
import { ListCommand } from '../../ListCommand/ListCommand';
import { localizationContext } from "../../../../../../context/LocalizationContext";
import { LocalizationName } from "../../../../../../localization";

type ComponentType = {
    device: Device;
}

export const StartupCommands = ({device}: ComponentType) => {
    const { languageDico } = useContext(localizationContext);
 
    const setStartupsCommands = () => {
        device.startups_commands = device.startups_commands || [];
    }

    const getStartupCommands = (commands: string[]) => {
        device.startups_commands = commands.filter(word => word !== '')
    }

    return (
        <Expanded title={languageDico[LocalizationName.StartupCommands]} classTitle={style.labelMenu}>
            <ListCommand
            onChange={setStartupsCommands} 
            list={device.startups_commands ? device.startups_commands : []}
            getCommands={(commands: string[]) => getStartupCommands(commands)}
            className={style.inputListCommands}></ListCommand>
        </Expanded>  
    )
};