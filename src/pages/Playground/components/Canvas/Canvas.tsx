import React, { useEffect, useRef } from "react";
import { Device, deviceSize, deviceToImage } from "../../../../model/Device";
import { roundRect } from "./canvaHelper";
import style from "./Canvas.module.scss";

type ComponentType = {
  topoJson: Device[];
  setJson: (json: Device[]) => void;
  setSelectedDevice: (name: string) => void;
};

export const Canvas = ({ topoJson, setSelectedDevice }: ComponentType) => {
  const canvasRef = useRef(null);
  const currentDevice = useRef(null);

  const drawJson = (json: Device[]) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    json.forEach((device, i) => {
      if (!device.position)
        topoJson[i].position = device?.position || {
          x: 0,
          y: i * deviceSize.height,
        };

      ctx.drawImage(
        deviceToImage[device.type],
        device?.position.x,
        device?.position.y,
        deviceSize.width,
        deviceSize.height
      );

      ctx.textAlign = "center";
      ctx.fillText(
        device.name,
        device?.position.x + deviceSize.width / 2,
        device?.position.y + deviceSize.height + 20
      );

      // roundRect(
      //   ctx,
      //   device?.position.x,
      //   device?.position.y + deviceSize.height + 20,
      //   device?.position.x + deviceSize.width,
      //   device?.position.y + deviceSize.height + 20 + 20,
      //   10,
      //   "#000000"
      // );
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

    drawJson(topoJson);
  }, [topoJson]);

  return <canvas ref={canvasRef} className={`${style.canvas}`}></canvas>;
};
