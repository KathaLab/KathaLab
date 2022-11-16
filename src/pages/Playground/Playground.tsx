import React, { useState } from "react";
import { DeviceCard } from "./components/DeviceCard/DeviceCard";
import { Header } from "./components/Header/Header";
import { Canvas } from "./components/Canvas/Canvas";
import { ConfigPanel } from "./components/ConfigPanel/ConfigPanel";
import style from "./Playground.module.scss";
import { Pages } from "../../app"
import { Device, devices } from "../../model/Device";


type componentType = {
  switchPage: (page: Pages) => void
}

export const Playground = ({ switchPage }: componentType) => {

  const [json, setJson] = useState<Device[]>([]);

  const handleDeviceClick = (device: Device) => {
    setJson([...json, device]);
  }

  return (
    <div className={style.page}>
      <Header switchPage={switchPage}></Header>
      <div className={style.content}>
        <ul>
          {devices.map((device) => (
            <li key={device.name}>
              <DeviceCard device={device} onClick={() => handleDeviceClick(device)}></DeviceCard>
            </li>
          ))}
        </ul>
        <Canvas topoJson={json}></Canvas>
        <ConfigPanel device="R0"></ConfigPanel>
      </div>
    </div>
  );
};
