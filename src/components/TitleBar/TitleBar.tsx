import React from 'react'
import { Pages } from '../../app'
import styles from './TitleBar.module.scss'

type componentType = {
    switchPage: (page: Pages) => void
}

export const TitleBar = ({ switchPage }: componentType) => {
    return (
        <div className={styles.titleBar}>
            <div className={styles.left}>
                <span className={'material-icons material-icons-outlined' + " " + styles.clickable} onClick={() => switchPage(Pages.Gallery)}>apps</span>
                <div>
                    <span className={styles.separator}>|</span>
                    <span className={styles.clickable}>Lab</span>
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
