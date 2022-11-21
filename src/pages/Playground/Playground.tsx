import React, {useContext} from "react"
import {Pages} from "../../app";
import {Language, LocalizationName} from "../../localization";
import LocalizationContext from "../../context/LocalizationContext";
import styles from "./Playground.module.scss"
//import {dialog} from '@electron/remote'
//import * as fs from "fs";

/*
type componentType = {
    switchPage: (page: Pages) => void

}
*/
export const Playground = ({switchPage}) => {


    const {updateContext, languageDico} = useContext(LocalizationContext);

    const handleLocalization = () => {
        updateContext(old => old == Language.FR ? Language.EN : Language.FR)
    }

    const handlePage = () => {
        switchPage(Pages.Gallery)
    }

    /*
    const readFile = (filepath: fs.PathOrFileDescriptor) => {
        fs.readFile(filepath, 'utf-8',  (err)  => {
            if(err){
                alert("An error ocurred reading the file :" + err.message);
                return;
            }
        });
    }
    */

    const test = () => {
        console.log(window.dialog)

    }


/*
    const open = () => {

        dialog.showOpenDialog({
            properties: ['openFile']
        }).then(function (response) {
            if (response === undefined) {
                console.log("y'a r");
                return;
            } else {
                console.log(response.filePaths, "path");
            }
        });
    }
*/


    return <>
        <h1 className={styles.titre} >{languageDico[LocalizationName.titlePlayground]}</h1>
        <button onClick={handlePage}>{languageDico[LocalizationName.titleGallery]}</button>
        <button onClick={handleLocalization}>switch</button>

        <button >Lire un fichier</button>
    </>
}