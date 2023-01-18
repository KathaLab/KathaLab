// // See the Electron documentation for details on how to use preload scripts:
// // https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    chooseFile: async () => await ipcRenderer.invoke('dialog:open-file'),
    chooseDirectory: async () => await ipcRenderer.invoke('dialog:open-directory'),
    saveData: async (data: any) => await ipcRenderer.invoke('save:save', data),
    loadSave: async (filename: any) => await ipcRenderer.invoke('save:load', filename),

    readDirectory: async (directoryPath: any)  => await ipcRenderer.invoke('fs:read-directory', directoryPath),
    saveFile : async (filePath: any, fileName: any, content: any) => await ipcRenderer.invoke('fs:save-file', filePath, fileName, content),
    deleteSave: async (id: any) => await ipcRenderer.invoke('save:delete', id),

    maximize: async () => await ipcRenderer.invoke('window:maximize'),
    minimize: async () => await ipcRenderer.invoke('window:minimize'),
    close: async () => await ipcRenderer.invoke('window:close'),

    getHomeDirectory : async() => await ipcRenderer.invoke('os:getHomeDirectory'),  

    removeListener: (channel: any) => {
        ipcRenderer.removeAllListeners(channel)
    },

    receive: (channel: any, func: any) => {
        ipcRenderer.on(channel, func);
    }
})