import { app, dialog, ipcMain } from "electron";
import fs from "fs";
import { Lab } from "./model/Lab";
import path from "path"

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
    ipcMain.handle("save:load", async (event) => {
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
    ipcMain.handle("save:delete", async (_, id) => {
      try {
        fs.unlinkSync(path.join(this.dataFolder, `data`, `${id}.json`));
        this.success(_.sender, "Lab successfully deleted")
      } catch (e) {
        console.error(e)
        this.error(_.sender, "An error occured while deleting the lab");
      }
    });
  };
}
