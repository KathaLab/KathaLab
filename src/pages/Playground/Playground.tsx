import React, {useContext, useState} from "react";
import {DeviceCard} from "./components/DeviceCard/DeviceCard";
import {Header} from "./components/Header/Header";
import {Canvas} from "./components/Canvas/Canvas";
import {ConfigPanel} from "./components/ConfigPanel/ConfigPanel";
import style from "./Playground.module.scss";
import {Pages} from "../../app";
import {Device, devices} from "../../model/Device";
import {useCssVar} from "../../hooks/useCssVar";
import SnackBarContext from "../../context/SnackbarContext";
import {Lab} from "../../model/Lab";
import {v4 as uuidv4} from 'uuid';
import ExportLabConf from "./ExportLabConf"
import ExportDevicesConf from "./ExportDevicesConf";


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

    while (name == "" || lab.devices.map(d => d.deviceName).includes(name)) deviceName = `${device.type}${i++}`;

    setCurrentLab({
      ...lab, devices: [...lab.devices, {
        ...device,
        deviceName,
      }]
    });
  };
  
  const handleExport = async () => {

    //Getting data sets in a json file
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const data = await window.electronAPI.loadSave("test.json");
    const labConf = new ExportLabConf(data).exportGlobalLabConf();
    const devicesConf = new ExportDevicesConf(data).exportGlobalDevicesConf()

    //Creating lab.conf and all device.startup
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await window.electronAPI.chooseDirectory()
        .then((filePath: string) => {
          if (filePath && labConf && devicesConf) {
            for (const labName in labConf){
              const fileName = labName + ".txt";
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              window.electronAPI.saveFile(filePath, fileName, labConf[labName]);
            }
            for (const deviceName in devicesConf) {
              const fileName = deviceName + ".txt";
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              window.electronAPI.saveFile(filePath, fileName, devicesConf[deviceName])
            }
          }
        })
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
        <ConfigPanel device={selectedDevices?.[0]}></ConfigPanel>
      </div>
  );
};