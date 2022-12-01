import React, {
  useEffect,
  useRef,
  MouseEventHandler,
  KeyboardEventHandler,
} from "react";
import style from "./Canvas.module.scss";
import { Lab } from "../../../../model/Lab";
import { Device, deviceSize } from "../../../../model/Device";
import { useColoredImage } from "../../../../hooks/useColoredImage";
import { useCssVar } from "../../../../hooks/useCssVar";
import { MouseButtonType } from "./canvaHelper";

type ComponentType = {
  topoJson: Lab;
  setSelectedDevices: (devices: Device[]) => void;
  selectedDevices: Device[];
};

export const Canvas = ({
  topoJson,
  setSelectedDevices,
  selectedDevices,
}: ComponentType) => {
  const canvasRef = useRef(null);
  const canvasCenter = useRef({ x: 0, y: 0 });

  const mouseDownPosRef = useRef({ x: 0, y: 0 });
  const mouseButtonDownRef = useRef<MouseButtonType>(MouseButtonType.None);
  const isMajPressedRef = useRef(false);

  const actionTypeRef = useRef<"move" | "select">("select");

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
        json.devices[i].position = device?.position || {
          x: rect.width / 2 - canvasCenter.current.x,
          y: rect.height / 2 - canvasCenter.current.y,
        };

      (async () => {
        const color2 = selectedDevices.includes(device) ? "red" : color;

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

  const renderSelection = (x: number, y: number) => {
    const ctx = (canvasRef.current as HTMLCanvasElement).getContext("2d");

    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(
      mouseDownPosRef.current.x + canvasCenter.current.x,
      mouseDownPosRef.current.y + canvasCenter.current.y,
      x - mouseDownPosRef.current.x,
      y - mouseDownPosRef.current.y
    );
  };

  const pageMousePositionToCanvasPosition = (x: number, y: number) => {
    const rect = canvasRef.current.getBoundingClientRect();

    return {
      x: x - rect.left - canvasCenter.current.x,
      y: y - rect.top - canvasCenter.current.y,
    };
  };

  const getDeviceInZone = (x1: number, y1: number, x2: number, y2: number) => {
    return topoJson.devices.filter((device) => {
      return (
        x2 >= device.position.x - deviceSize.width / 2 &&
        x1 <= device.position.x + deviceSize.width / 2 &&
        y2 >= device.position.y - deviceSize.height / 2 &&
        y1 <= device.position.y + deviceSize.height / 2
      );
    });
  };
  //#region mouse events

  const handleMouseDown: MouseEventHandler = (e) => {
    mouseButtonDownRef.current = e.buttons;
    renderJson(topoJson);

    if(mouseButtonDownRef.current === MouseButtonType.MiddleClick) {
      canvasRef.current.style.cursor = "grabbing";
    } else {
      canvasRef.current.style.cursor = "default";
    }


    if (e.buttons !== MouseButtonType.LeftClick) return

    const position = pageMousePositionToCanvasPosition(e.pageX, e.pageY);
    mouseDownPosRef.current = position;

    const [devices] = getDeviceInZone(
      position.x,
      position.y,
      position.x,
      position.y
    );

    if (!selectedDevices.includes(devices)) {
      setSelectedDevices([devices]);
    }

    if (!devices) {
      actionTypeRef.current = "select";
    } else if (devices) {
      actionTypeRef.current = "move";
    }
  };

  const handleMouseUp: MouseEventHandler = (e) => {
    

    if (actionTypeRef.current === "select" && mouseButtonDownRef.current === MouseButtonType.LeftClick) {
      renderJson(topoJson);

      const position = pageMousePositionToCanvasPosition(e.pageX, e.pageY);

      setSelectedDevices(
        getDeviceInZone(
          Math.min(mouseDownPosRef.current.x, position.x),
          Math.min(mouseDownPosRef.current.y, position.y),
          Math.max(mouseDownPosRef.current.x, position.x),
          Math.max(mouseDownPosRef.current.y, position.y)
        )
      );
    }
    canvasRef.current.style.cursor = "default"
    mouseButtonDownRef.current = MouseButtonType.None;
  };

  const handleMouseMove: MouseEventHandler = (e) => {

    if (mouseButtonDownRef.current === MouseButtonType.MiddleClick) {
      canvasCenter.current.x += e.movementX;
      canvasCenter.current.y += e.movementY;
      renderJson(topoJson);
    } else if (mouseButtonDownRef.current === MouseButtonType.LeftClick && actionTypeRef.current === "select") {
      const position = pageMousePositionToCanvasPosition(e.pageX, e.pageY);
      renderJson(topoJson);
      renderSelection(position.x, position.y);
    } else if (mouseButtonDownRef.current === MouseButtonType.LeftClick && actionTypeRef.current === "move") {
      selectedDevices.forEach((device) => {
        device.position.x += e.movementX;
        device.position.y += e.movementY;
      });
      renderJson(topoJson);
    }
  };

  //#endregion

  //#region keyboard events

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === "Shift") {
      isMajPressedRef.current = true;
      canvasRef.current.style.cursor = "grab";
    }
  };

  const handleKeyUp: KeyboardEventHandler = (e) => {
    if (e.key === "Shift") {
      isMajPressedRef.current = false;
      canvasRef.current.style.cursor = "default";
    }
  };

  //#endregion

  useEffect(() => {
    const rect = canvasRef.current.getBoundingClientRect();

    canvasRef.current.width = rect.width;
    canvasRef.current.height = rect.height;

    canvasCenter.current.x = rect.width / 2;
    canvasCenter.current.y = rect.height / 2;
  }, []);

  useEffect(() => renderJson(topoJson), [topoJson, selectedDevices]);

  return (
    <canvas
      tabIndex={0}
      ref={canvasRef}
      className={`${style.canvas}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    ></canvas>
  );
};
