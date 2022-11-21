import {dialog, ipcMain} from 'electron';

export class electronAPI {
    initialize =  async () => {
        ipcMain.handle('dialog:open', async (_, args) => {
            return await dialog.showOpenDialog({properties: ['openFile']})
        })
    }
}