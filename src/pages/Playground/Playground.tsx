import React, { useState } from "react";
import { DeviceCard } from "./components/DeviceCard/DeviceCard";
import { Canvas } from "./components/Canvas/Canvas";
import { ConfigPanel } from "./components/ConfigPanel/ConfigPanel";
import style from "./Playground.module.scss"
  ;
import { Device, devices } from "../../model/Device";
import { useCssVar } from "../../hooks/useCssVar";
import { Lab } from "../..//model/Lab";

type componentType = {
  lab?: Lab;
  setCurrentLab: (lab: Lab) => void;
};

export const Playground = ({ lab, setCurrentLab }: componentType) => {

  const [selectedDevice, setSelectedDevice] = useState<null | string>(null);

  const color = useCssVar("--clr-main-primary");

  const handleDeviceClick = (device: Device) => {

    let name = "";
    let i = 0;

    while (name == "" || lab.devices.map(d => d.name).includes(name)) name = `${device.type}${i++}`;

    setCurrentLab({
      ...lab, devices: [...lab.devices, {
        ...device,
        name,
      }]
    });
  };

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
          topoJson={lab}
          setJson={(json: Lab) => setCurrentLab(json)}
          setSelectedDevice={(name: string) => setSelectedDevice(name)}
          selectedDevice={selectedDevice}
        ></Canvas>
        <ConfigPanel device={lab.devices.find(o => o.name === selectedDevice)}></ConfigPanel>
      </div>
    </div>
  );
};