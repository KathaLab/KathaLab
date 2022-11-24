import { app, dialog, ipcMain } from "electron";
import fs from "fs";
import { Lab } from "./model/Lab";

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
    ipcMain.handle("save:load", async (event) => {
      try {
        const files = fs.readdirSync(app.getAppPath() + `/data`);

        const lab: Lab[] = [];

        files.forEach((file) => {
          lab.push(
            JSON.parse(
              fs.readFileSync(app.getAppPath() + `/data/${file}`, "utf-8")
            )
          );
        });
        event.sender.send("save:load", lab);
      } catch (e) {
        console.warn(e);
      }
    });
  };
}
