import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useCssVar } from "../../../../hooks/useCssVar";
import { useColoredImage } from "../../../../hooks/useColoredImage";
import { Device, deviceSize } from "../../../../model/Device";
import style from "./Canvas.module.scss";
import { Lab } from "../../../../model/Lab";

type ComponentType = {
  topoJson: Lab;
  selectedDevice: string;
  setJson: (json: Lab) => void;
  setSelectedDevice: (name: string) => void;
};

export const Canvas = ({
  topoJson,
  setSelectedDevice,
  selectedDevice,
}: ComponentType) => {
  const canvasRef = useRef(null);
  const currentDevice = useRef(null);
  const deviceRef = useRef(selectedDevice);

  const color = useCssVar("--clr-main-primary");
  const [getImg] = useColoredImage();

  useEffect(() => {
    deviceRef.current = selectedDevice;
  }, [selectedDevice]);

  const drawJson = (json: Device[]) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    json.forEach((device, i) => {
      if (!device.position)
        topoJson.devices[i].position = device?.position || {
          x: 10,
          y: 10,
        };

      (async () => {
        const color2 = deviceRef.current === device.name ? color + "99" : color;
        const test = await getImg(device.type, color2);
        test.onload = () => {
          ctx.drawImage(
            test,
            device?.position.x,
            device?.position.y,
            deviceSize.width,
            deviceSize.height
          );
        };

        test.complete && test.onload(null);
      })();

      ctx.textAlign = "center";
      ctx.fillStyle = color;
      ctx.font = "16px 'Be Vietnam Pro'";
      ctx.fillText(
        device.name,
        device?.position.x + deviceSize.width / 2,
        device?.position.y + deviceSize.height + 20
      );
    });
  };

  const getDeviceByPosition = (x: number, y: number) => {
    return topoJson.devices.find((device) => {
      return (
        x > device.position.x &&
        x < device.position.x + deviceSize.width &&
        y > device.position.y &&
        y < device.position.y + deviceSize.height
      );
    })?.name;
  };

  useLayoutEffect(() => {
    const rect = canvasRef.current.getBoundingClientRect();
    canvasRef.current.width = rect.width;
    canvasRef.current.height = rect.height;
    canvasRef.current.onmouseup = () => {
      currentDevice.current = null;
    };
    canvasRef.current.onmousedown = (evt: MouseEvent) => {
      currentDevice.current = getDeviceByPosition(evt.offsetX, evt.offsetY);
      setSelectedDevice(currentDevice.current);
    };
    canvasRef.current.onkeydown = (evt: KeyboardEvent) => {
      if (evt.key === "Delete") {
        const index = topoJson.devices.findIndex((device) => {
          return device.name === deviceRef.current;
        });
        index !== -1 && topoJson.devices.splice(index, 1);
        setSelectedDevice(null);
        drawJson(topoJson.devices);
      }
    };
    canvasRef.current.onmousemove = (evt: MouseEvent) => {
      if (currentDevice.current) {
        const device = topoJson.devices.find(
          (device) => device.name === currentDevice.current
        );
        device.position.x = evt.offsetX - deviceSize.width / 2;
        device.position.y = evt.offsetY - deviceSize.height / 2;
        drawJson(topoJson.devices);
      }
    };
    drawJson(topoJson.devices);
  }, [topoJson, selectedDevice]);

  return (
    <canvas tabIndex={0} ref={canvasRef} className={`${style.canvas}`}></canvas>
  );
};
