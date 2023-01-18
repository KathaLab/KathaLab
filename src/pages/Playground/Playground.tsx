import React, { useState, useEffect } from "react";
import { DeviceCard } from "./components/DeviceCard/DeviceCard";
import { Canvas } from "./components/Canvas/Canvas";
import { ConfigPanel } from "./components/ConfigPanel/ConfigPanel";
import style from "./Playground.module.scss";
import { Device, devices, DeviceType } from "../../model/Device";
import { useCssVar } from "../../hooks/useCssVar";
import { Lab } from "../..//model/Lab";

type componentType = {
  lab?: Lab;
  setCurrentLab: (lab: Lab) => void;
};

export const Playground = ({ lab, setCurrentLab }: componentType) => {

  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  const color = useCssVar("--clr-main-primary");

  const handleSave = async () => {
    if (lab.labName === "") lab.labName = "Untitled";

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await window.electronAPI.saveData(lab);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.electronAPI.loadSave();
  }

  const handleDeviceClick = (device: Device) => {
    if (!device) return;
    let deviceName = "";
    let i = 0;

    while (deviceName == "" || lab.devices.map(d => d.deviceName).includes(deviceName)) deviceName = `${device.type}${i++}`;

    setCurrentLab({
      ...lab, devices: [...lab.devices, {
        ...device,
        deviceName,
      }]
    });
  };

  const handleNew = (type: DeviceType, pos?: {x: number, y: number}) => {
    handleDeviceClick({...devices.find(device => device.type === type), position: pos})
  }

  const handleSelectionDuplicate = () => {
    const newDevices: Device[] = [];

    for (const device of selectedDevices) {
      let deviceName = "";
      let i = 0;

      while (deviceName == "" || [...lab.devices, ...newDevices].map(d => d.deviceName).includes(deviceName)) deviceName = `${device.type}${i++}`;

      newDevices.push({
        ...JSON.parse(JSON.stringify(device)),
        deviceName,
      })
    }

    setCurrentLab({
      ...lab, devices: [...lab.devices, ...newDevices]
    });
    }

const updateDevices = () => {
    setSelectedDevices([...selectedDevices])
  }

  const allCollisionDomain = () => {
    const collisionDomain = lab.devices.flatMap(device => device.interfaces?.flatMap(data => data.collision_domain))
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
          interactive={true}
          onSave={handleSave}
          onNew={handleNew}
          onDuplicate={handleSelectionDuplicate}
          topoJson={lab}
          setSelectedDevices={(devices: Device[]) => setSelectedDevices(devices)}
          selectedDevices={selectedDevices}
        ></Canvas>
        {selectedDevices?.[0] && <ConfigPanel allCollisionDomain={allCollisionDomain()} updateDevices={updateDevices} device={selectedDevices?.[0]}></ConfigPanel>}
      </div>
    </div>
  );
};