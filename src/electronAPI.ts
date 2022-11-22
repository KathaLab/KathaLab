import { app, dialog, ipcMain } from 'electron';
import fs from 'fs';
import { Lab } from './model/Lab';

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
        ipcMain.handle('save:load', async (event, name) => {
            try {
                const files = fs.readdirSync(app.getAppPath() + `/data`);

                const lab: Lab[] = [];

                files.forEach(file => {
                    lab.push(JSON.parse(fs.readFileSync(app.getAppPath() + `/data/${file}`, 'utf-8')));
                })
                event.sender.send('save:load', lab);
            }
            catch (e) {
                console.warn(e)
            }
        })
    }
}