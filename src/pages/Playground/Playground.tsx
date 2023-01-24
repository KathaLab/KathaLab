import React, { useState, useEffect, useContext } from "react";
import { DeviceCard } from "./components/DeviceCard/DeviceCard";
import { Canvas } from "./components/Canvas/Canvas";
import { ConfigPanel } from "./components/ConfigPanel/ConfigPanel";
import style from "./Playground.module.scss";
import { Device, devices, DeviceType } from "../../model/Device";
import { useCssVar } from "../../hooks/useCssVar";
import { Lab } from "../../model/Lab";
import ExportLabConf from "../../lib/ExportLabConf";
import ExportDevicesConf from "../../lib/ExportDevicesConf";
import { keyBindContext } from "../../context/KeybindContext";

type componentType = {
  lab?: Lab;
  setCurrentLab: (lab: Lab) => void;
};

export const Playground = ({ lab, setCurrentLab }: componentType) => {

  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  const color = useCssVar("--clr-main-primary");

  const ctx = useContext(keyBindContext);

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

  const handleNew = (type: DeviceType, pos?: { x: number, y: number }) => {
    handleDeviceClick({ ...devices.find(device => device.type === type), position: pos })
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

    setSelectedDevices(newDevices)

    console.log(selectedDevices)
  }

  const handleExport = async () => {

    const labConf = new ExportLabConf(lab).exportGlobalLabConf();
    const devicesConf = new ExportDevicesConf(lab).exportGlobalDevicesConf()

    //Creating lab.conf and all device.startup
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await window.electronAPI.chooseDirectory()
      .then((filePath: string) => {
        if (filePath && labConf && devicesConf) {
          for (const labName in labConf) {
            const fileName = "lab.conf";

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.electronAPI.saveFile(filePath, fileName, labConf[labName]);
          }
          for (const deviceName in devicesConf) {
            const fileName = deviceName + ".startup";
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.electronAPI.saveFile(filePath, fileName, devicesConf[deviceName])
          }
        }
      })
  }

  const updateDevices = () => {
    setSelectedDevices([...selectedDevices])
  }

  const allCollisionDomain = () => {
    const collisionDomain = lab.devices.flatMap(device => device.interfaces?.flatMap(data => data.collision_domain))
    return collisionDomain.filter((item, idx, self) => self.lastIndexOf(item) === idx)
  }

  useEffect(() => {

    const handleSelectAll = () => setSelectedDevices(lab.devices)

    ctx.on("playground-select-all", handleSelectAll)
    ctx.on("playground-duplicate-device", handleSelectionDuplicate)
    ctx.on("playground-save-lab", handleSave)
    ctx.on("playground-export-lab", handleExport)

    return () => {
      ctx.remove("playground-select-all", handleSelectAll)
      ctx.remove("playground-duplicate-device", handleSelectionDuplicate)
      ctx.remove("playground-save-lab", handleSave)
      ctx.remove("playground-export-lab", handleExport)
    }
  }, [lab.devices, selectedDevices])

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
          onExport={handleExport}
        ></Canvas>
        {selectedDevices?.[0] && <ConfigPanel allCollisionDomain={allCollisionDomain()} updateDevices={updateDevices} device={selectedDevices?.[0]}></ConfigPanel>}
      </div>
    </div>
  );
};