import {app, dialog, ipcMain} from "electron";
import fs from "fs";
import {Lab} from "./model/Lab";
import * as path from "path";
import os from "os";

export class electronAPI {

  dataFolder = app.getPath("userData")

  constructor() {
    if (!fs.existsSync(path.join(this.dataFolder, `data`))) {
      fs.mkdirSync(path.join(this.dataFolder, `data`));
    }
  }

  error(sender: Electron.WebContents, message: string) {
    sender.send("snack:add", { message, icon: "error", duration: 3000 });
  }

  success(sender: Electron.WebContents, message: string) {
    sender.send("snack:add", { message, icon: "done", duration: 3000 });
  }

  initialize = async () => {
    ipcMain.handle("dialog:open-file", async (event) => {
      return await dialog
        .showOpenDialog({
          properties: ["openFile"],
        })
        .then((response) => {
          return response.filePaths[0];
        })
        .catch((err) => {
          console.error(err)
          this.error(event.sender, "An error occured while trying to open the file explorer");
        });
    });
    ipcMain.handle("dialog:open-directory", async (event) => {
      return await dialog
        .showOpenDialog({
          properties: ["createDirectory", "openDirectory"],
        })
        .then((response) => {
          return response.filePaths[0];
        })
        .catch((err) => {
          console.error(err)
          this.error(event.sender, "An error occured while trying to open the file explorer");
        });
    });

    ipcMain.handle("save:save", async (_, obj) => {
      try {
        fs.writeFileSync(path.join(this.dataFolder, `data/${obj.id}.json`),
          JSON.stringify(obj),
          "utf-8"
        );
        this.success(_.sender, "Lab successfully saved")
      } catch (e) {
        console.error(e)
        this.error(_.sender, "An error occured while saving the lab");
      }
    });
    ipcMain.handle("save:load", async (event, name) => {
      try {
        const files = fs.readdirSync(path.join(this.dataFolder, `data`));

const lab: Lab[] = [];

        files
          .map((fileName) => ({
            name: fileName,
            time: fs
              .statSync(path.join(this.dataFolder, `data`, fileName))
              .mtime.getTime(),
          }))
          .sort((a, b) => b.time - a.time)
          .forEach((file) => {
            lab.push(
              JSON.parse(
                fs.readFileSync(
                  path.join(this.dataFolder, `data`, file.name),
                  "utf-8"
                )
              )
            );
          });

        event.sender.send("save:load", lab);
      } catch (e) {
        console.error(e)
        this.error(event.sender, "An error occured while loading the labs");
      }
    });

    ipcMain.handle('fs:save-file', async (event, filePath, fileName, content) => {
      try {
        const fullPath = path.join(filePath, fileName);
        fs.writeFileSync(fullPath, content, "utf-8")
      } catch (e) {
        console.warn(e.message);
      }
    })

    ipcMain.handle("save:delete", async (_, id) => {
      try {
        fs.unlinkSync(path.join(this.dataFolder, `data`, `${id}.json`));
        this.success(_.sender, "Lab successfully deleted")
      } catch (e) {
        console.error(e)
        this.error(_.sender, "An error occured while deleting the lab");
      }
    });
    ipcMain.handle("os:getHomeDirectory", async () => {
      return os.homedir();
    });
    ipcMain.handle("fs:read-directory", async (_, directoryPath) => {

      const filesData: { "confFile"?: string, "startupFiles"?: [{deviceName: string, fileData: string}], "shutdownFiles"?:[{deviceName : string, fileData: string}] } = {
        confFile: "",
        startupFiles: [{deviceName:'', fileData:''}],
        shutdownFiles: [{deviceName:'', fileData:''}]
      }

      const readFile = (filePath: string):string => {
        return fs.readFileSync(filePath, "utf-8")
      }

      try {
        const filesNames = fs.readdirSync(directoryPath)

        filesNames.forEach(fileName => {
            if (path.extname(fileName) == ".conf"){
              filesData.confFile = readFile(path.join(directoryPath, fileName));
            }
            if (path.extname(fileName) == ".startup"){
                const deviceName = path.basename(fileName, '.startup').toLowerCase();
                const fileData = readFile(path.join(directoryPath, fileName));
              filesData.startupFiles.push({'deviceName': deviceName, 'fileData':fileData});
            }
            if (path.extname(fileName) == ".shutdown"){
                const deviceName = path.basename(fileName, '.startup').toLowerCase();
                const fileData = readFile(path.join(directoryPath, fileName));
              filesData.shutdownFiles.push({'deviceName': deviceName, 'fileData':fileData});
            }
          })
        return filesData
      } catch (err) {
        console.warn(err)
      }
    })
  };
}
