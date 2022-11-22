import { app, dialog, ipcMain } from 'electron';
import fs from 'fs';

export class electronAPI {
    initialize = async () => {
        ipcMain.handle('dialog:open', async (_, obj) => {
            await dialog.showOpenDialog({ properties: ['openFile'] })
        })
        ipcMain.handle('save:save', async (_, obj) => {
            try {
                fs.writeFileSync(app.getAppPath() + `/data/${obj.id}.json`, JSON.stringify(obj), 'utf-8');
            }
            catch (e) {
                console.warn(e)
            }
        })
        ipcMain.handle('save:list', async (event) => {
            try {
                const files = fs.readdirSync(app.getAppPath() + `/data`)
                event.sender.send('save:list', files)
            }
            catch (e) {
                console.warn(e)
            }
        })
        ipcMain.handle('save:load', async (event, name) => {
            try {
                const content = fs.readFileSync(app.getAppPath() + `/data/${name}`, {encoding:'utf8', flag:'r'})
                event.sender.send('save:load', JSON.parse(content));
            }
            catch (e) {
                console.warn(e)
            }
        })
    }
}