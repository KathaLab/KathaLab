import React, { useEffect, useRef } from "react";
import { Device, deviceSize, deviceToImage } from "../../../../model/Device";
import { roundRect } from "./canvaHelper";
import style from "./Canvas.module.scss";

type ComponentType = {
  topoJson: Device[];
  selectedDevice: string
  setJson: (json: Device[]) => void;
  setSelectedDevice: (name: string) => void;
};

export const Canvas = ({ topoJson, setSelectedDevice, selectedDevice }: ComponentType) => {
  const canvasRef = useRef(null);
  const currentDevice = useRef(null);
  const deviceRef = useRef(selectedDevice);


  useEffect(() => {
    deviceRef.current = selectedDevice;
  }, [selectedDevice]);

  const drawJson = (json: Device[]) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    json.forEach((device, i) => {
      if (!device.position)
        topoJson[i].position = device?.position || {
          x: 10,
          y: 10, 
        };

      ctx.drawImage(
        deviceToImage[device.type],
        device?.position.x,
        device?.position.y,
        deviceSize.width,
        deviceSize.height
      );

      ctx.textAlign = "center";
      ctx.font = "16px 'Be Vietnam Pro'";
      ctx.fillText(
        device.name,
        device?.position.x + deviceSize.width / 2,
        device?.position.y + deviceSize.height + 20
      );
    });
  };

  const getDeviceByPosition = (x: number, y: number) => {
    return topoJson.find((device) => {
      return (
        x > device.position.x &&
        x < device.position.x + deviceSize.width &&
        y > device.position.y &&
        y < device.position.y + deviceSize.height
      );
    })?.name;
  };

  useEffect(() => {
    const rect = canvasRef.current.getBoundingClientRect();
    canvasRef.current.width = rect.width;
    canvasRef.current.height = rect.height;

    canvasRef.current.onmouseup = () => {
      setSelectedDevice(currentDevice.current);
      currentDevice.current = null;
    };

    canvasRef.current.onmousedown = (evt: MouseEvent) => {
      currentDevice.current = getDeviceByPosition(evt.offsetX, evt.offsetY);
      canvasRef.current.focus()

    };

    canvasRef.current.onkeydown = (evt: KeyboardEvent) => {

      if (evt.key === "Delete") {
        const index =  topoJson.findIndex(
          (device) => {
            return device.name === deviceRef.current;
          }
          );
          
        index !== -1 && topoJson.splice(index, 1);
        setSelectedDevice(null);
        drawJson(topoJson);
      }
    };

    canvasRef.current.onmousemove = (evt: MouseEvent) => {
      if (currentDevice.current) {
        const device = topoJson.find(
          (device) => device.name === currentDevice.current
        );
        device.position.x = evt.offsetX - deviceSize.width / 2;
        device.position.y = evt.offsetY - deviceSize.height / 2;
        drawJson(topoJson);
      }
    };

    console.dir(canvasRef.current);

    drawJson(topoJson);
  }, [topoJson]);

  return <canvas tabIndex={0} ref={canvasRef} className={`${style.canvas}`}></canvas>;
};
