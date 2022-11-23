import {dialog, ipcMain} from 'electron';

export class electronAPI {
    initialize = async () => {
        ipcMain.handle('dialog:open-file', async () => {
            return await dialog.showOpenDialog({
                properties: ['openFile']
            }).then(response => {
                return response.filePaths[0];
            }).catch(err => {
                console.warn(err.message)
            })
        })
        ipcMain.handle('dialog:open-directory', async () => {
            return await dialog.showOpenDialog({
                properties: ['createDirectory', "openDirectory"],
            }).then(response => {
                return response.filePaths[0];
            }).catch(err => {
                console.warn(err.message)
            })
        })
    }
}