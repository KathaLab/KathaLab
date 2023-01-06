import {app, dialog, ipcMain} from "electron";
import fs from "fs";
import {Lab} from "./model/Lab";
import * as path from "path";

export class electronAPI {
  initialize = async () => {
    ipcMain.handle("dialog:open-file", async () => {
      return await dialog
          .showOpenDialog({
            properties: ["openFile"],
          })
          .then((response) => {
            return response.filePaths[0];
          })
          .catch((err) => {
            console.warn(err.message);
          });
    });

    ipcMain.handle("dialog:open-directory", async () => {
      return await dialog
          .showOpenDialog({
            properties: ["createDirectory", "openDirectory"],
          })
          .then((response) => {
            return response.filePaths[0];
          })
          .catch((err) => {
            console.warn(err.message);
          });
    });

    ipcMain.handle("save:save", async (_, obj) => {
      try {
        fs.writeFileSync(
            app.getAppPath() + `/data/${obj.id}.json`,
            JSON.stringify(obj),
            "utf-8"
        );
      } catch (e) {
        console.warn(e);
      }
    });
    ipcMain.handle("save:load", async (event, name) => {
      try {

        //TODO DELETE THE 3 NEXT LINE ONLY USED FOR TEST
        if (name) {
          return JSON.parse(fs.readFileSync(app.getAppPath() + `/data/${name}`, "utf-8"));
        }

        const files = fs.readdirSync(app.getAppPath() + `/data`);

        const lab: Lab[] = [];

        files
            .map((fileName) => ({
              name: fileName,
              time: fs
                  .statSync(`${app.getAppPath()}/data/${fileName}`)
                  .mtime.getTime(),
            }))
            .sort((a, b) => b.time - a.time)
            .forEach((file) => {
              lab.push(
                  JSON.parse(
                      fs.readFileSync(
                          app.getAppPath() + `/data/${file.name}`,
                          "utf-8"
                      )
                  )
              );
            });
        event.sender.send("save:load", lab);
      } catch (e) {
        console.warn(e);
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
        fs.unlinkSync(app.getAppPath() + `/data/${id}.json`);
      } catch (e) {
        console.warn(e);
      }
    });

    ipcMain.handle("fs:read-directory", async (_, directoryPath) => {

      const filesData: { "confFile": string, "startupFiles":string[], "shutdownFiles":string[] } = {
        confFile: "",
        startupFiles: [],
        shutdownFiles: []
      }

      const readFile = (filePath: string):string => {
        return fs.readFileSync(filePath, "utf-8")
      }

      try {
        const filesNames = fs.readdirSync(directoryPath)

        filesNames.forEach(fileName => {
            if (path.extname(fileName) == ".conf"){
              filesData["confFile"] = readFile(path.join(directoryPath, fileName));
            }
            if (path.extname(fileName) == ".startup"){
              filesData["startupFiles"].push(readFile(path.join(directoryPath, fileName)));
            }
            if (path.extname(fileName) == ".shutdown"){
              filesData["shutdownFiles"].push(readFile(path.join(directoryPath, fileName)));
            }
          })
        return filesData
      } catch (err) {
        console.warn(err)
      }
    })
  };
}
