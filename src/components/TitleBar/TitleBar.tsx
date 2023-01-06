import React, {useEffect, useRef, useState} from 'react'
import {Lab} from '../../model/Lab'
import {Pages} from '../../app'
import {ContextMenu} from '../ContextMenu/ContextMenu'
import styles from './TitleBar.module.scss'
import ExportLabConf from "../../lib/ExportLabConf";
import ExportDevicesConf from "../../lib/ExportDevicesConf";

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

  const handleLabClick = () => setLabExpanded(x => !x);

  useEffect(() => {
    setIsTitleEditable(page !== Pages.Playground)
    inputRef.current.value = page !== Pages.Playground ? "KathaLab" : selectedLab.labName;
  }, [selectedLab, page])

  const labOptions = [
    {
      label: 'New', onClick: () => {
        setSelectedLab(undefined);
        switchPage(Pages.Playground);
        setLabExpanded(false);
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
    {label: 'Import', onClick: () => {
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

    const labConf = new ExportLabConf(lab).exportGlobalLabConf();
    const devicesConf = new ExportDevicesConf(lab).exportGlobalDevicesConf()

    //Creating lab.conf and all device.startup
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await window.electronAPI.chooseDirectory()
        .then((filePath: string) => {
          if (filePath && labConf && devicesConf) {
            for (const labName in labConf) {
              const fileName = "lab.conf";

              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              window.electronAPI.saveFile(filePath, fileName, labConf[labName]);
            }
            for (const deviceName in devicesConf) {
              const fileName = deviceName + ".startup";
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              window.electronAPI.saveFile(filePath, fileName, devicesConf[deviceName])
            }
          }
        })
  }

  const handleImport = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const directoryPath = await window.electronAPI.chooseDirectory()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const filesData = await window.electronAPI.readDirectory(directoryPath)


    console.log(filesData);
  }

  return (
      <div className={styles.titleBar}>
        <div className={styles.left}>
          <span className={styles.backBtn + ' material-icons material-icons-outlined' + " " + styles.clickable}
                onClick={() => switchPage(Pages.Gallery)}>apps</span>
          <div>
            <span className={styles.separator}>|</span>
            <span className={styles.clickable + " " + (labExpanded ? styles.clicked : "")}
                  onClick={handleLabClick}>Lab</span>
            {labExpanded && <ContextMenu options={labOptions} onHide={() => setLabExpanded(false)}></ContextMenu>}
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
          <li className={'material-icons material-icons-outlined ' + styles.clickable} onClick={handleClose}>close</li>
        </ul>
      </div>
  )
}
