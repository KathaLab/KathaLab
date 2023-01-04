import React, {useState} from "react";
import {DeviceCard} from "./components/DeviceCard/DeviceCard";
import {Canvas} from "./components/Canvas/Canvas";
import {ConfigPanel} from "./components/ConfigPanel/ConfigPanel";
import style from "./Playground.module.scss";
import {Device, devices} from "../../model/Device";
import {useCssVar} from "../../hooks/useCssVar";
import {Lab} from "../../model/Lab";

type componentType = {
  lab?: Lab;
  setCurrentLab: (lab: Lab) => void;
};

export const Playground = ({ lab, setCurrentLab }: componentType) => {

  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  const color = useCssVar("--clr-main-primary");

  const handleDeviceClick = (device: Device) => {

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