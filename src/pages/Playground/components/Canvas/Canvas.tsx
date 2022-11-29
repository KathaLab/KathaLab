import React, { useEffect, useRef } from "react";
import style from "./Canvas.module.scss";
import { Lab } from "../../../../model/Lab";
import { deviceSize } from "../../../../model/Device";
import { useColoredImage } from "../../../../hooks/useColoredImage";
import { useCssVar } from "../../../../hooks/useCssVar";

type ComponentType = {
  topoJson: Lab;
};

export const Canvas = ({ topoJson }: ComponentType) => {
  const canvasRef = useRef(null);
  const canvasCenter = useRef({ x: 0, y: 0 });

  const [getImg] = useColoredImage();
  const color = useCssVar("--clr-main-primary");

  const renderJson = (json: Lab) => {
    const ctx = canvasRef.current.getContext("2d");
    const rect = canvasRef.current.getBoundingClientRect();

    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // render devices
    json.devices.forEach((device, i) => {
      if (!device.position)
        json.devices[i].position = device?.position || { x: rect.width / 2 - canvasCenter.current.x, y: rect.height / 2 - canvasCenter.current.y };

      (async () => {
        const color2 = color;

        const image = await getImg(device.type, color2);

        image.onload = () => {
          ctx.drawImage(
            image,
            canvasCenter.current.x + device?.position.x - deviceSize.width / 2,
            canvasCenter.current.y + device?.position.y - deviceSize.height / 2,
            deviceSize.width,
            deviceSize.height
          );
        };

        image.complete && image.onload(null);
      })();

      ctx.textAlign = "center";
      ctx.fillStyle = color;
      ctx.font = "16px 'Be Vietnam Pro'";
      ctx.fillText(
        device.name,
        canvasCenter.current.x + device?.position.x,
        canvasCenter.current.y +
          device?.position.y -
          deviceSize.height / 2 +
          deviceSize.height +
          20
      );
    });
  };

  useEffect(() => {
    const rect = canvasRef.current.getBoundingClientRect();

    canvasCenter.current.x = rect.width / 2;
    canvasCenter.current.y = rect.height / 2;
  }, [canvasRef]);

  useEffect(() => {
    const rect = canvasRef.current.getBoundingClientRect();
    canvasRef.current.width = rect.width;
    canvasRef.current.height = rect.height;

    canvasRef.current.onmousedown = (e: MouseEvent) => {
      canvasRef.current.onmousemove = (evt: MouseEvent) => {
        canvasCenter.current.x += evt.movementX;
        canvasCenter.current.y += evt.movementY;
        renderJson(topoJson);
      };
    };

    canvasRef.current.onmouseleave = () => {
      canvasRef.current.onmousemove = null;
    };
    canvasRef.current.onmouseup = () => {
      canvasRef.current.onmousemove = null;
    };

    console.log("render");

    renderJson(topoJson);

    return () => {
      canvasRef.current.onmousedown = null;
      canvasRef.current.onmouseleave = null;
      canvasRef.current.onmouseup = null;
    };
  }, [canvasRef, topoJson]);

  return (
    <canvas tabIndex={0} ref={canvasRef} className={`${style.canvas}`}></canvas>
  );
};
