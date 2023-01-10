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
  }, [selectedDevices])

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

  const updateDevices = () => {
    setSelectedDevices([...selectedDevices])
  }

  const allCollisionDomain = () => {
    let collisionDomain = lab.devices.flatMap(device => device.interfaces?.flatMap(data => data.collision_domain))
    console.log(collisionDomain.filter((item, idx, self) => self.lastIndexOf(item) === idx))
    return collisionDomain.filter((item, idx, self) => self.lastIndexOf(item) === idx)
  }

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
        {selectedDevices?.[0] && <ConfigPanel allCollisionDomain={allCollisionDomain()} updateDevices={updateDevices} device={selectedDevices?.[0]}></ConfigPanel>}
      </div>
    </div>
  );
};