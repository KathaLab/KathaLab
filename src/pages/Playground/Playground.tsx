import React, { useContext, useState } from "react";
import { DeviceCard } from "./components/DeviceCard/DeviceCard";
import { Header } from "./components/Header/Header";
import { Canvas } from "./components/Canvas/Canvas";
import { ConfigPanel } from "./components/ConfigPanel/ConfigPanel";
import style from "./Playground.module.scss";
import { Pages } from "../../app";
import { Device, devices } from "../../model/Device";
import { useId } from "../../hooks/useId";
import { useCssVar } from "../../hooks/useCssVar";
import SnackBarContext from "../../context/SnackbarContext";
type componentType = {
  switchPage: (page: Pages) => void;
};

export const Playground = ({ switchPage }: componentType) => {
  const [json, setJson] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<null | string>(null);

  const snackBar = useContext(SnackBarContext);

  const color = useCssVar("--clr-main-primary");

  const handleDeviceClick = (device: Device) => {
    setJson([
      ...json,
      {
        ...device,
        name: `${device.type}${useId(device.type)}`,
      },
    ]);
  };

  const handleSave = () => {
    console.log("test")
    snackBar.updateContext({
      duration: 2000,
      icon: "save",
      message: "Saved successfully!"
    })
  }

  return (
    <div className={style.page}>
      <Header switchPage={switchPage} handleSave={handleSave}></Header>
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
          setJson={(json: Device[]) => setJson(json)}
          setSelectedDevice={(name: string) => setSelectedDevice(name)}
          selectedDevice={selectedDevice}
        ></Canvas>
        <ConfigPanel device={selectedDevice}></ConfigPanel>
      </div>
    </div>
  );
};
