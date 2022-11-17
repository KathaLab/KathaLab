import React, { useEffect, useState } from "react";
import { DeviceCard } from "./components/DeviceCard/DeviceCard";
import { Header } from "./components/Header/Header";
import { Canvas } from "./components/Canvas/Canvas";
import { ConfigPanel } from "./components/ConfigPanel/ConfigPanel";
import style from "./Playground.module.scss";
import { Pages } from "../../app";
import { Device, devices } from "../../model/Device";
import { useId } from "../../hooks/useId";

type componentType = {
  switchPage: (page: Pages) => void;
};

export const Playground = ({ switchPage }: componentType) => {
  const [json, setJson] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<null | string>(null);

  const handleDeviceClick = (device: Device) => {
    setJson([
      ...json,
      {
        ...device,
        name: `${device.type}${useId(device.type)}`,
      },
    ]);
  };

  return (
    <div className={style.page}>
      <Header switchPage={switchPage}></Header>
      <div className={style.content}>
        <ul>
          {devices.map((device, i) => (
            <li key={i}>
              <DeviceCard
                device={device}
                onClick={() => handleDeviceClick(device)}
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
