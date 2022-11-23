import React, { useState } from "react";
import { DeviceCard } from "./components/DeviceCard/DeviceCard";
import { Canvas } from "./components/Canvas/Canvas";
import { ConfigPanel } from "./components/ConfigPanel/ConfigPanel";
import style from "./Playground.module.scss"
  ;
import { Device, devices } from "../../model/Device";
import { useCssVar } from "../../hooks/useCssVar";
import { Lab } from "../..//model/Lab";
import { v4 as uuidv4 } from 'uuid';

type componentType = {
  lab?: Lab;
};

export const Playground = ({ lab }: componentType) => {
  const [json, setJson] = useState<Lab>(lab || {
    name: "",
    id: uuidv4(),
    devices: []
  });

  const [selectedDevice, setSelectedDevice] = useState<null | string>(null);

  const color = useCssVar("--clr-main-primary");

  const handleDeviceClick = (device: Device) => {

    let name = "";
    let i = 0;

    while (name == "" || json.devices.map(d => d.name).includes(name)) name = `${device.type}${i++}`;

    setJson({
      ...json, devices: [...json.devices, {
        ...device,
        name,
      }]
    });
  };

  // const handleSave = async () => {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   await window.electronAPI.saveData(json);

  // }

  return (
    <div className={style.page}>
      <div className={style.content}>
        <ul className={style.list}>
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