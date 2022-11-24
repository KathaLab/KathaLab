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

type componentType = {
  switchPage: (page: Pages) => void;
  lab?: Lab;
};

export const Playground = ({switchPage, lab}: componentType) => {
  const [json, setJson] = useState<Lab>(lab || {
    name: "",
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const data = await window.electronAPI.loadSave("test.json");

    const exportedData = new ExportLabConf(data);

    console.log(exportedData.exportGlobalLabConf())

  }

  const handleImport = () => {
    console.log("import")
  }

  const handleNameChange = (name: string) => {
    setJson({
      ...json,
      name
    })
  }

  return (
      <div className={style.page}>
        <Header switchPage={switchPage} name={json.name} onNameChange={handleNameChange} handleSave={handleSave}
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