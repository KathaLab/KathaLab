import React, { useContext, useState } from "react";
import { DeviceCard } from "./components/DeviceCard/DeviceCard";
import { Header } from "./components/Header/Header";
import { Canvas } from "./components/Canvas/Canvas";
import { ConfigPanel } from "./components/ConfigPanel/ConfigPanel";
import style from "./Playground.module.scss"
  ;
import { Pages } from "../../app";
import { Device, devices } from "../../model/Device";
import { useCssVar } from "../../hooks/useCssVar";
import SnackBarContext from "../../context/SnackbarContext";
import { Lab } from "../..//model/Lab";
import { v4 as uuidv4 } from 'uuid';

type componentType = {
  switchPage: (page: Pages) => void;
  lab?: Lab;
};

export const Playground = ({ switchPage, lab }: componentType) => {
  const [json, setJson] = useState<Lab>(lab || {
    name: "",
    id: uuidv4(),
    devices: []
  });

  const [selectedDevice, setSelectedDevice] = useState<null | string>(null);

  const snackBar = useContext(SnackBarContext);

  const color = useCssVar("--clr-main-primary");

  const handleDeviceClick = (device: Device) => {

    let name = "";
    let i = 1;

    while (name == "" || json.devices.map(d => d.name).includes(name)) name = `${device.type}${i++}`;

    setJson({
      ...json, devices: [...json.devices, {
        ...device,
        name,
      }]
    });
  };

  const handleSave = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await window.electronAPI.saveData(json);

    snackBar.updateContext({
      duration: 3000,
      icon: "save",
      message: `Saved successfully!`,
    })
  }

  const handleExport = () => {
    console.log("export")
  }

  const handleImport = () => {
    console.log("export")
  }

  const handleNameChange = (name: string) => {
    setJson({
      ...json,
      name
    })
  }

  return (
    <div className={style.page}>
      <Header switchPage={switchPage} name={json.name} onNameChange={handleNameChange} handleSave={handleSave} handleExport={handleExport} handleImport={handleImport}></Header>
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