import React, { useContext, useState } from "react";
import { DeviceCard } from "./components/DeviceCard/DeviceCard";
import { Header } from "./components/Header/Header";
import { Canvas } from "./components/Canvas/Canvas";
import { ConfigPanel } from "./components/ConfigPanel/ConfigPanel";
import style from "./Playground.module.scss"
  ;
import { Pages } from "../../app";
import { Device, devices } from "../../model/Device";
import { useId } from "../../hooks/useId";
import { useCssVar } from "../../hooks/useCssVar";
import SnackBarContext from "../../context/SnackbarContext";
import { Lab } from "../..//model/Lab";
import { v4 as uuidv4 } from 'uuid';

type componentType = {
  switchPage: (page: Pages) => void;
};

export const Playground = ({ switchPage }: componentType) => {
  const [json, setJson] = useState<Lab>({
    name: "",
    id: uuidv4(),
    devices: []
  });

  const [selectedDevice, setSelectedDevice] = useState<null | string>(null);

  const snackBar = useContext(SnackBarContext);

  const color = useCssVar("--clr-main-primary");

  const handleDeviceClick = (device: Device) => {
    setJson({
      ...json, devices: [...json.devices, {
        ...device,
        name: `${device.type}${useId(device.type)}`,
      }]
    });
  };

  const handleSave = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await window.electronAPI.saveData(json);

    snackBar.updateContext({
      duration: 3000,
      icon: "save",
      message: result ? `Saved successfully!` : `Error while saving the lab`
    })
  }

  const handleExport = () => {
    console.log("export")
  }


  const handleImport = () => {
    console.log("export")
  }

  return (
    <div className={style.page}>
      <Header switchPage={switchPage} handleSave={handleSave} handleExport={handleExport} handleImport={handleImport}></Header>
      <div className={style.content}>
        <ul>
          {devices.map((device, i) => (
            <li key={i}>
              <DeviceCard
                device={device}
                onClick={() => handleDeviceClick(device)}
                color={color}
              ></DeviceCard>
            </li>
          ))}
        </ul>
        <Canvas
          topoJson={json}
          setJson={(json: Lab) => setJson(json)}
          setSelectedDevice={(name: string) => setSelectedDevice(name)}
          selectedDevice={selectedDevice}
        ></Canvas>
        <ConfigPanel device={selectedDevice}></ConfigPanel>
      </div>
    </div>
  );
};