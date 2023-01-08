import React, { useState, useEffect } from "react";
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

  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

useEffect(() => {
  console.log(selectedDevices)
}, [selectedDevices] )

useEffect(() => {setInterval(() => console.log(selectedDevices), 500)}, [])

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
          setSelectedDevices={(devices: Device[]) => setSelectedDevices(devices)}
          selectedDevices={selectedDevices}
        ></Canvas>
        <ConfigPanel device={selectedDevices?.[0]}></ConfigPanel>
      </div>
    </div>
  );
};