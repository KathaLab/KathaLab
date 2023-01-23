import * as React from "react";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

// importing the two pages
import { Gallery, Playground, Settings } from "./pages";

// importing stuff related to the localization
import { LocalizationContext } from "./context/LocalizationContext";
import { createRoot } from "react-dom/client";

// importing styles
import { ThemeContext } from "./context/ThemeContext";
import { TitleBar } from "./components/TitleBar/TitleBar";

// SnackBarContext
import { SnackbarContext } from "./context/SnackbarContext";
import { Lab } from "./model/Lab";
import { KeybindContext } from "./context/KeybindContext";


export enum Pages {
  Gallery,
  Playground,
  Settings,
}

const App = () => {
  const [page, setPage] = useState<Pages>(Pages.Gallery);

  const [labs, setLabs] = useState<Lab[]>([]);
  const [currentLab, setCurrentLab] = useState<Lab>(null);

  const setLab = (lab: Lab) => {
    setCurrentLab(
      lab || {
        labName: "",
        id: uuidv4(),
        devices: [],
        canvas: {
          x: 0,
          y: 0,
          zoom: 1,
        },
      }
    );
  };

  const handleDelete = (labId: string) => {
    setLabs(labs.filter((lab) => lab.id !== labId));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.electronAPI.deleteSave(labId);
  };

  //fetch labs on load
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.electronAPI.receive("save:load", (_: unknown, data: Lab[]) => {
      setLabs(data);
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.electronAPI.loadSave();

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.electronAPI.removeListener("save:load");
    };
  }, []);

  const handleSave = async () => {
    if (currentLab.labName === "") currentLab.labName = "Untitled";

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await window.electronAPI.saveData(currentLab);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.electronAPI.loadSave();
  };

  return (
    <ThemeContext>
      <LocalizationContext>
        <KeybindContext keybinds={[{
          eventName: "all",
          code: ["a"],
          ctrl: true
        }]}>
          <SnackbarContext>
            <TitleBar
              switchPage={setPage}
              page={page}
              onSave={handleSave}
              setSelectedLab={setLab}
              labs={labs}
              selectedLab={currentLab}
              onChange={(name) => setCurrentLab({ ...currentLab, labName: name })}
            ></TitleBar>
            <div className="pageWrapper">
              {page == Pages.Gallery ? (
                <Gallery
                  handleDelete={handleDelete}
                  switchPage={setPage}
                  labs={labs}
                  setSelectedLab={setLab}
                />
              ) : page == Pages.Playground ? (
                <Playground lab={currentLab} setCurrentLab={setCurrentLab} />
              ) : page == Pages.Settings ? (
                <Settings />
              ) : null}
            </div>
          </SnackbarContext>
        </KeybindContext>
      </LocalizationContext>
    </ThemeContext>

  );
};

createRoot(document.querySelector("#root")).render(<App />);
