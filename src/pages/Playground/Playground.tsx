import React, {useContext, useState} from "react";
import {DeviceCard} from "./components/DeviceCard/DeviceCard";
import {Header} from "./components/Header/Header";
import {Canvas} from "./components/Canvas/Canvas";
import {ConfigPanel} from "./components/ConfigPanel/ConfigPanel";
import style from "./Playground.module.scss"
  ;
import {Pages} from "../../app";
import {Device, devices} from "../../model/Device";
import {useCssVar} from "../../hooks/useCssVar";
import SnackBarContext from "../../context/SnackbarContext";
import {Lab} from "../../model/Lab";
import {v4 as uuidv4} from 'uuid';
import ExportLabConf from "./ExportLabConf"
import ExportDevicesConf from "./ExportDevicesConf";

type componentType = {
  switchPage: (page: Pages) => void;
  lab?: Lab;
};

export const Playground = ({switchPage, lab}: componentType) => {
  const [json, setJson] = useState<Lab>(lab || {
    labName: "",
    id: uuidv4(),
    devices: []
  });

  const [selectedDevice, setSelectedDevice] = useState<null | string>(null);

  const snackBar = useContext(SnackBarContext);

  const color = useCssVar("--clr-main-primary");

  const handleDeviceClick = (device: Device) => {

    let deviceName = "";
    let i = 1;

    while (deviceName == "" || json.devices.map(d => d.deviceName).includes(deviceName)) deviceName = `${device.type}${i++}`;

    setJson({
      ...json, devices: [...json.devices, {
        ...device,
        deviceName,
      }]
    });
  };

  const handleSave = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await window.electronAPI.saveData(json);

    snackBar.updateContext({
      duration: 3000,
      icon: "save",
      message: `Saved successfully!`,
    })
  }

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

  const handleImport = () => {
    console.log("import")
  }

  const handleNameChange = (labName: string) => {
    setJson({
      ...json,
      labName
    })
  }

  return (
      <div className={style.page}>
        <Header switchPage={switchPage} name={json.labName} onNameChange={handleNameChange} handleSave={handleSave}
                handleExport={handleExport} handleImport={handleImport}></Header>
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