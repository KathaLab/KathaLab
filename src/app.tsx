import * as React from "react";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

// importing the two pages
import { Gallery, Playground, Settings } from "./pages";

// importing stuff related to the localization
import localizationContext from "./context/LocalizationContext";
import { Language, LanguageToLocalization } from "./localization";
import { createRoot } from "react-dom/client";

// importing styles
import themes from "./theme/_theme.scss";
import themeContext from "./context/ThemeContext";
import { TitleBar } from "./components/TitleBar/TitleBar";

// SnackBarContext
import SnackBarContext from "./context/SnackbarContext";
import { SnackBar, snackBarMessageType } from "./components/SnackBar/SnackBar";
import { useDelayQueue } from "./hooks/useDelayQueue";
import { Lab } from "./model/Lab";

export type themeNames = keyof typeof themes;
export enum Pages {
  Gallery,
  Playground,
  Settings,
}

const App = () => {
  const [page, setPage] = useState<Pages>(Pages.Gallery);
  const [localization, setLocalization] = useState<Language>(Language.EN);
  const [theme, setTheme] = useState<themeNames>("theme-dark2");
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [currentLab, setCurrentLab] = useState<Lab>(null);

  const setLab = (lab: Lab) => {
    setCurrentLab(
      lab || {
        name: "",
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

  // handle snackbar
  const handleSnackBarMessage = (message: snackBarMessageType) => {
    setSnackbarVisibility(true);
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        setSnackbarVisibility(false);
        setTimeout(resolve, 200);
      }, message.duration - 200)
    );
  };
  const [[currentElement], addElement] = useDelayQueue<snackBarMessageType>(
    handleSnackBarMessage
  );

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await window.electronAPI.saveData(currentLab);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.electronAPI.loadSave();
  };

  return (
    <main className={themes[theme]}>
      <localizationContext.Provider
        value={{
          language: localization,
          languageDico: LanguageToLocalization[localization],
          updateContext: setLocalization,
        }}
      >
        <themeContext.Provider value={{ theme, updateContext: setTheme }}>
          <SnackBarContext.Provider value={{ updateContext: addElement }}>
            <TitleBar
              switchPage={setPage}
              page={page}
              onSave={handleSave}
              setSelectedLab={setLab}
              labs={labs}
              selectedLab={currentLab}
              onChange={(name) => setCurrentLab({ ...currentLab, name })}
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
            <SnackBar visibility={snackbarVisibility} {...currentElement} />
          </SnackBarContext.Provider>
        </themeContext.Provider>
      </localizationContext.Provider>
    </main>
  );
};

createRoot(document.querySelector("#root")).render(<App />);
