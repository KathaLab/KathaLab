import React, { useEffect, useState } from 'react'
import { Pages } from '../../app'
import { ContextMenu } from '../ContextMenu/ContextMenu'
import styles from './TitleBar.module.scss'

type componentType = {
    switchPage: (page: Pages) => void
    page: Pages
}

export const TitleBar = ({ page, switchPage }: componentType) => {

    const [labExpanded, setLabExpanded] = useState(false);
    const [isTitleEditable, setIsTitleEditable] = useState(false);
    const [title, setTitle] = useState("");

    const handleLabClick = () => setLabExpanded(x => !x);

    useEffect(() => {
        console.log("page")
        setIsTitleEditable(page !== Pages.Playground)
    }, [page])

    const labOptions = [
        { label: 'New', onClick: () => { switchPage(Pages.Playground); setLabExpanded(false) } },
        {
            label: 'Open', options: [
                { label: 'File 1', onClick: () => { undefined } },
            ]
        },
        { separator: true },
        { label: 'Save', disabled: true },
        { label: 'Import', disabled: true },
        { label: 'Export', disabled: true },
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

    return (
        <div className={styles.titleBar}>
            <div className={styles.left}>
                <span className={styles.backBtn + ' material-icons material-icons-outlined' + " " + styles.clickable} onClick={() => switchPage(Pages.Gallery)}>apps</span>
                <div>
                    <span className={styles.separator}>|</span>
                    <span className={styles.clickable + " " + (labExpanded ? styles.clicked : "")} onClick={handleLabClick}>Lab</span>
                    {labExpanded && <ContextMenu options={labOptions} onHide={() => setLabExpanded(false)}></ContextMenu>}
                    <span className={styles.clickable + " "} onClick={() => switchPage(Pages.Settings)}>Settings</span>
                </div>
            </div>
            <input
                disabled={isTitleEditable}
                className={styles.input + " " + styles.clickable + " " + (isTitleEditable ? styles.title : "")}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={(isTitleEditable ? "Lab creator" : title)}
            />
            <ul className={styles.btnList}>
                <li className={'material-icons material-icons-outlined ' + styles.clickable} onClick={handleMinimimze}>remove</li>
                <li className={'material-icons material-icons-outlined ' + styles.clickable} onClick={handleMaximize}>check_box_outline_blank</li>
                <li className={'material-icons material-icons-outlined ' + styles.clickable} onClick={handleClose}>close</li>
            </ul>
        </div>
    )
}
