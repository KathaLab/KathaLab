// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    chooseFile: async () => await ipcRenderer.invoke('dialog:open'),
    saveData: async (data) => await ipcRenderer.invoke('save:save', data),
    loadSave: async (filename) => await ipcRenderer.invoke('save:load', filename),

    removeListener: (channel) => {
        ipcRenderer.removeAllListeners(channel)
    },

    receive: (channel, func) => {
        ipcRenderer.on(channel, func);
    }
})
