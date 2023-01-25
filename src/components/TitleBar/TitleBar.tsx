import React, {useContext, useEffect, useRef, useState} from 'react'
import {Lab} from '../../model/Lab'
import {Pages} from '../../app'
import {ContextMenu} from '../ContextMenu/ContextMenu'
import styles from './TitleBar.module.scss'
import ExportConf from "../../lib/ExportConf";
import {v4 as uuidv4} from "uuid";
import {DeviceType} from "../../model/Device";
import ImportConf from "../../lib/ImportConf";
import { snackbarContext } from "../../context/SnackbarContext";
import { keyBindContext } from '../../context/KeybindContext'
import { dialogContext } from '../../context/DialogContext'
import { DialogConfirmation } from '../Dialog/DialogConfirmation'

type componentType = {
    switchPage: (page: Pages) => void
    setSelectedLab: (lab: Lab) => void
    selectedLab: Lab
    onSave: () => void
    page: Pages
    labs: Lab[]
    onChange: (title: string) => void
}

export const TitleBar = ({page, switchPage, onSave, labs, setSelectedLab, selectedLab, onChange}: componentType) => {

    const [labExpanded, setLabExpanded] = useState(false);
    const [isDisabled, setIsTitleEditable] = useState(page !== Pages.Playground);

    const inputRef = useRef<HTMLInputElement>(null);
    const ctx = useContext(keyBindContext);
    const dialog = useContext(dialogContext)
    
    const handleLabClick = () => setLabExpanded(x => !x);

    const snackBar = useContext(snackbarContext);

    useEffect(() => {
        setIsTitleEditable(page !== Pages.Playground)
        inputRef.current.value = page !== Pages.Playground ? "KathaLab" : selectedLab.labName;
    }, [selectedLab, page])

    const labOptions = [
        {
            label: 'New', onClick: () => {
                let keep = true;
                dialog.updateContext(DialogConfirmation, {
                    text: "are you sure ?",
                    Cancel: () => {
                        keep = false
                        dialog.close()
                    },
                    Validate: () => {
                        keep = true
                        dialog.close()
                    }
                }).onClose(() => {
                    setSelectedLab(undefined);
                    switchPage(Pages.Playground);
                    setLabExpanded(false);
                    console.log(keep)
                })
            }
        },
        {
            label: 'Open', options: labs.map(lab => {
                return {
                    label: lab.labName || 'Untitled',
                    onClick: () => {
                        setSelectedLab({...lab});
                        setLabExpanded(false);
                        switchPage(Pages.Playground);
                    }
                }
            })
        },
        {separator: true},
        {label: 'Save', disabled: isDisabled, onClick: onSave},
        {
            label: 'Import', disabled: page == Pages.Playground, onClick: () => {
                handleImport();
            }
        },
        {
            label: 'Export', disabled: page !== Pages.Playground, onClick: () => {
                handleExport(selectedLab)
            }
        }
    ];

    const handleMinimimze = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.electronAPI.minimize();
    }

    const handleMaximize = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.electronAPI.maximize();
    }

    const handleClose = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.electronAPI.close();
    }

    const handleExport = async (lab: Lab) => {

        const exportConf = new ExportConf();
        const labExported = exportConf.exportLabConf(lab);
        const deviceExportedStartup = exportConf.exportStartupConf(lab);
        const deviceExportedShutdown = exportConf.exportShutdownConf(lab);

        //Creating lab.conf and all device.startup
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await window.electronAPI.chooseDirectory()
            .then((filePath: string) => {
                if (filePath && labExported && lab.devices) {
                    const fileName = "lab.conf";
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    window.electronAPI.saveFile(filePath, fileName, labExported);
                    if (deviceExportedStartup) {
                        for (const deviceName in deviceExportedStartup) {
                            const fileName = deviceName + '.startup';
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            window.electronAPI.saveFile(filePath, fileName, deviceExportedStartup[deviceName])

                        }
                    }
                    if (deviceExportedShutdown) {
                        for (const deviceName in deviceExportedShutdown) {
                            const fileName = deviceName + '.shutdown';
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            window.electronAPI.saveFile(filePath, fileName, deviceExportedShutdown[deviceName])
                        }
                    }
                    snackBar.updateContext({
                        duration: 3000,
                        message: 'The lab have been successfully exported',
                        icon: 'done'
                    })
                } else {
                    snackBar.updateContext({
                        duration: 3000,
                        message: 'The lab can not be exported',
                        icon: 'warning'
                    })
                }
            })
    }

    const handleImport = async () => {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const directoryPath = await window.electronAPI.chooseDirectory()
        if (!directoryPath) {
            snackBar.updateContext({
                duration: 3000,
                message: 'No directory selected',
                icon: 'warning'
            })
            return;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const filesData = await window.electronAPI.readDirectory(directoryPath)
        const importConf = new ImportConf();
        let labConf: Lab = {canvas: {x: 0, y: 0, zoom: 0}, devices: [], id: "", labName: ""};

        labConf.id = uuidv4();

        String(filesData.confFile).split('\n').forEach(line => {
            labConf = importConf.importLabConf(labConf, line)
        })

        filesData.startupFiles.filter((elem: { deviceName: string, fileData: string }) => {
            return elem.deviceName != '' && elem.fileData != ''
        }).forEach((startupFile: { deviceName: string, fileData: string }) => {
            const deviceName = startupFile.deviceName;
            const fileData = startupFile.fileData;
            let device = labConf.devices.find((device) => device.deviceName.toLowerCase() == deviceName);

            if (!device) {
                device = {deviceName: deviceName, type: DeviceType.PC};
                labConf.devices.push(device)
            }
            fileData.split('\n').forEach(line => {
                importConf.importDevicesConf(device, line);
            })
        });

        filesData.shutdownFiles.filter((elem: { deviceName: string, fileData: string }) => {
            return elem.deviceName != '' && elem.fileData != ''
        }).forEach((shutdownFile: { deviceName: string, fileData: string }) => {
            const deviceName = shutdownFile.deviceName;
            const fileData = shutdownFile.fileData;
            let device = labConf.devices.find((device) => device.deviceName.toLowerCase() == deviceName);

            if (!device) {
                device = {deviceName: deviceName, type: DeviceType.PC};
                labConf.devices.push(device)
            }
            if (!device.shutdown_commands) {
                device.shutdown_commands = [];
            }
            fileData.split('\n').forEach(line => {
                device.shutdown_commands.push(line);
            })
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await window.electronAPI.saveData(labConf);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await window.electronAPI.loadSave();

        snackBar.updateContext({
            duration: 3000,
            message: 'The lab have been successfully imported',
            icon: 'done'
        })
    }

    useEffect(() => {
        const handleNewLab = () => {
            setSelectedLab(undefined);
            switchPage(Pages.Playground);
          }
          ctx.on('app-new-lab', handleNewLab)

          return () => {
            ctx.remove('app-new-lab', handleNewLab)
          }
    }, [])
    

    return (
        <div className={styles.titleBar}>
            <div className={styles.left}>
          <span className={styles.backBtn + ' material-icons material-icons-outlined' + " " + styles.clickable}
                onClick={() => switchPage(Pages.Gallery)}>apps</span>
                <div>
                    <span className={styles.separator}>|</span>
                    <span className={styles.clickable + " " + (labExpanded ? styles.clicked : "")}
                          onClick={handleLabClick}>Lab</span>
                    {labExpanded &&
                        <ContextMenu options={labOptions} onHide={() => setLabExpanded(false)}></ContextMenu>}
                    <span className={styles.clickable + " "} onClick={() => switchPage(Pages.Settings)}>Settings</span>
                </div>
            </div>
            <input
                disabled={isDisabled}
                className={styles.input + " " + styles.clickable + " " + (isDisabled ? styles.title : "")}
                type="text"
                onChange={(e) => onChange(e.target.value)}
                placeholder="Untitled"
                ref={inputRef}
            />
            <ul className={styles.btnList}>
                <li className={'material-icons material-icons-outlined ' + styles.clickable}
                    onClick={handleMinimimze}>remove
                </li>
                <li className={'material-icons material-icons-outlined ' + styles.clickable}
                    onClick={handleMaximize}>check_box_outline_blank
                </li>
                <li className={'material-icons material-icons-outlined ' + styles.clickable}
                    onClick={handleClose}>close
                </li>
            </ul>
        </div>
    )
}