import React, { useState } from 'react'
import { Pages } from '../../app'
import { ContextMenu } from '../ContextMenu/ContextMenu'
import styles from './TitleBar.module.scss'

type componentType = {
    switchPage: (page: Pages) => void
}

export const TitleBar = ({ switchPage }: componentType) => {

    const [labExpanded, setLabExpanded] = useState(false);
    const handleLabClick = () => setLabExpanded(x => !x);

    const labOptions = [
        { label: 'New', onClick: () => { undefined } },
        { label: 'Open', onClick: () => { undefined } },
        { separator: true },
        { label: 'Save', onClick: () => { undefined }, disabled: true },
        { label: 'Import', onClick: () => { undefined }, disabled: true },
        { label: 'Export', onClick: () => { undefined }, disabled: true },
    ];

    return (
        <div className={styles.titleBar}>
            <div className={styles.left}>
                <span className={styles.backBtn + ' material-icons material-icons-outlined' + " " + styles.clickable} onClick={() => switchPage(Pages.Gallery)}>apps</span>
                <div>
                    <span className={styles.separator}>|</span>
                    <span className={styles.clickable + " " + (labExpanded ? styles.clicked : "")} onClick={handleLabClick}>Lab</span>
                    {labExpanded && <ContextMenu options={labOptions}></ContextMenu>}
                </div>
            </div>
            <input className={styles.input + " " + styles.clickable} type="text" defaultValue="lab" />
            <ul className={styles.btnList + " " + styles.clickable}>
                <li className='material-icons material-icons-outlined'>minimize</li>
                <li className='material-icons material-icons-outlined'>check_box_outline_blank</li>
                <li className='material-icons material-icons-outlined'>close</li>
            </ul>
        </div>
    )
}
