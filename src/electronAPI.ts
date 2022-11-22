import { app, dialog, ipcMain } from 'electron';
import fs from 'fs';

export class electronAPI {
    initialize = async () => {
        ipcMain.handle('dialog:open', async (_, obj) => {
            return await dialog.showOpenDialog({ properties: ['openFile'] })
        }),
            ipcMain.handle('save', async (_, obj) => {
                try {
                    fs.writeFileSync(app.getAppPath() + `/data/${obj.id}.json`, JSON.stringify(obj), 'utf-8');
                }
                catch (e) {
                    console.warn(e)
                    return false
                }
                return true
            })
    }
}