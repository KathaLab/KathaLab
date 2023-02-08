import * as React from "react";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

// importing the two pages
import { Gallery, Playground, Settings } from "./pages";

// importing stuff related to the localization
import { createRoot } from "react-dom/client";

// importing styles
import { TitleBar } from "./components/TitleBar/TitleBar";

// SnackBarContext
import { Lab } from "./model/Lab";
import { GlobalContext } from "./context/GlobalContext";


export enum Pages {
  Gallery,
  Playground,
  Settings,
}

const App = () => {
  const [page, setPage] = useState<Pages>(Pages.Settings);

  const [labs, setLabs] = useState<Lab[]>([]);
  const [currentLab, setCurrentLab] = useState<Lab>(null);

  const setLab = (lab: Lab) => {
    setCurrentLab(
      JSON.parse(JSON.stringify(lab)) || {
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

  const pageToComponent = (page: Pages) => {
    switch (page) {
      case Pages.Settings:
        return <Settings />
      case Pages.Playground:
        return <Playground lab={currentLab} setCurrentLab={setCurrentLab} />
      case Pages.Gallery:
        return <Gallery
          handleDelete={handleDelete}
          switchPage={setPage}
          labs={labs}
          setSelectedLab={setLab}
        />
    }
  }

  return (
    <GlobalContext>
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
        {pageToComponent(page)}
      </div>
    </GlobalContext >
  );
};

createRoot(document.querySelector("#root")).render(<App />);
