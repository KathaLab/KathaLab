import React, {
  useEffect,
  useRef,
  MouseEventHandler,
  KeyboardEventHandler,
  WheelEventHandler,
} from "react";
import style from "./Canvas.module.scss";
import { Lab } from "../../../../model/Lab";
import { Device, deviceSize } from "../../../../model/Device";
import { useColoredImage } from "../../../../hooks/useColoredImage";
import { useCssVar } from "../../../../hooks/useCssVar";
import { MouseButtonType, ScrollBarWidth } from "./canvaHelper";

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

  const observer = React.useRef(
    new ResizeObserver(entries => {
      console.log("resize")
      resize()
    })
  )

  const renderHScrollbars = () => {
    if (!topoJson.devices.length) return;

    // most left and most right devices position
    const mostLeftDevicePosition =
      topoJson.devices?.reduce((prev, curr) => {
        return curr.position.x < prev.position.x ? curr : prev;
      })?.position?.x -
      deviceSize.width / 2;

    const mostRightDevicePosition =
      topoJson.devices?.reduce((prev, curr) => {
        return curr.position.x > prev.position.x ? curr : prev;
      })?.position?.x +
      deviceSize.width / 2;

    const viewportLeft = 0 - canvasCenter.current.x;
    const viewportRight = canvasRef.current.width - canvasCenter.current.x;

    const mostLeft = Math.min(mostLeftDevicePosition, viewportLeft);
    const mostRight = Math.max(mostRightDevicePosition, viewportRight);

    const innerWidth = viewportRight - viewportLeft;
    const outerWidth = mostRight - mostLeft;

    const ratio = (100 * innerWidth) / outerWidth;
    const offsetRatio = (100 * (viewportLeft - mostLeft)) / outerWidth;

    if (ratio === 100) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "red";
    ctx.fillRect(
      ScrollBarWidth +
        ((canvasRef.current.width - ScrollBarWidth * 5) * offsetRatio) / 100,
      canvasRef.current.height - ScrollBarWidth * 2,
      ((canvasRef.current.width - ScrollBarWidth * 5) * ratio) / 100,
      ScrollBarWidth
    );
  };

  const renderVScrollbars = () => {
    if (!topoJson.devices.length) return;

    // most left and most right devices position
    const mostTopDevicePosition =
      topoJson.devices?.reduce((prev, curr) => {
        return curr.position.y < prev.position.y ? curr : prev;
      }).position.y -
      deviceSize.height / 2;

    const mostBottomDevicePosition =
      topoJson.devices?.reduce((prev, curr) => {
        return curr.position.y > prev.position.y ? curr : prev;
      }).position.y + deviceSize.height;

    const viewportTop = 0 - canvasCenter.current.y;
    const viewportBottom = canvasRef.current.height - canvasCenter.current.y;

    const mostTop = Math.min(mostTopDevicePosition, viewportTop);
    const mostBottom = Math.max(mostBottomDevicePosition, viewportBottom);

    const innerWidth = viewportBottom - viewportTop;
    const outerWidth = mostBottom - mostTop;

    const ratio = (100 * innerWidth) / outerWidth;
    const offsetRatio = (100 * (viewportTop - mostTop)) / outerWidth;

    if (ratio === 100) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "red";
    ctx.fillRect(
      canvasRef.current.width - ScrollBarWidth * 2,
      10 +
        ((canvasRef.current.height - ScrollBarWidth * 5) * offsetRatio) / 100,
      ScrollBarWidth,
      ((canvasRef.current.height - ScrollBarWidth * 5) * ratio) / 100
    );
  };

  const renderJson = (json: Lab) => {
    const ctx = canvasRef.current.getContext("2d");
    const rect = canvasRef.current.getBoundingClientRect();

    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // render devices
    json.devices.forEach((device) => {
      if (!device.position)
        device.position = device?.position || {
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
        device.deviceName,
        canvasCenter.current.x + device?.position.x,
        canvasCenter.current.y +
          device?.position.y -
          deviceSize.height / 2 +
          deviceSize.height +
          20
      );
    });

    // render scrollbars
    renderHScrollbars();
    renderVScrollbars();
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

    if (mouseButtonDownRef.current === MouseButtonType.MiddleClick) {
      canvasRef.current.style.cursor = "grabbing";
    } else {
      canvasRef.current.style.cursor = "default";
    }

    if (e.buttons !== MouseButtonType.LeftClick) return;

    const position = pageMousePositionToCanvasPosition(e.pageX, e.pageY);
    mouseDownPosRef.current = position;

    const [devices] = getDeviceInZone(
      position.x,
      position.y,
      position.x,
      position.y
    );

    if (devices && !selectedDevices.includes(devices)) {
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
    canvasRef.current.style.cursor = "default";
    mouseButtonDownRef.current = MouseButtonType.None;
  };

  const handleMouseMove: MouseEventHandler = (e) => {
    if (mouseButtonDownRef.current === MouseButtonType.MiddleClick) {
      canvasCenter.current.x += e.movementX;
      canvasCenter.current.y += e.movementY;
      renderJson(topoJson);
    } else if (
      mouseButtonDownRef.current === MouseButtonType.LeftClick &&
      actionTypeRef.current === "select"
    ) {
      const position = pageMousePositionToCanvasPosition(e.pageX, e.pageY);
      renderJson(topoJson);
      renderSelection(position.x, position.y);
    } else if (
      mouseButtonDownRef.current === MouseButtonType.LeftClick &&
      actionTypeRef.current === "move"
    ) {
      selectedDevices.forEach((device) => {
        device.position.x += e.movementX;
        device.position.y += e.movementY;
      });
      renderJson(topoJson);
    }
  };

  const handleWheel: WheelEventHandler = (e) => {
    if (isMajPressedRef.current) {
      canvasCenter.current.x += e.deltaY;

      if (actionTypeRef.current === "move" && mouseButtonDownRef.current === MouseButtonType.LeftClick) {
        selectedDevices.forEach((device) => {
          device.position.x -= e.deltaY;
        });
      }
    } else {
      canvasCenter.current.y -= e.deltaY;
      if (actionTypeRef.current === "move" && mouseButtonDownRef.current === MouseButtonType.LeftClick) {
        selectedDevices.forEach((device) => {
          device.position.y += e.deltaY;
        });
      }
    }

    renderJson(topoJson);
  };

  //#endregion

  //#region keyboard events

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === "Shift") {
      isMajPressedRef.current = true;
    }
    if (e.key === "a" && e.ctrlKey) {
      setSelectedDevices(topoJson.devices);
    }
    if (e.key === "Delete" || e.key === "Backspace") {
      topoJson.devices = topoJson.devices.filter(
        (device) => !selectedDevices.includes(device)
      );
      setSelectedDevices([]);
    }
  };

  const handleKeyUp: KeyboardEventHandler = (e) => {
    if (e.key === "Shift") {
      isMajPressedRef.current = false;
    }
  };

  //#endregion

  useEffect(() => {
    resize(true);
    if (canvasCenter.current) {
      observer.current.observe(canvasRef.current)
    }
    
    // start observing for resize
  }, [canvasCenter, observer]);

  const resize = (changeCenter = false) =>  {
    const rect = canvasRef.current.getBoundingClientRect();

    canvasRef.current.width = rect.width;
    canvasRef.current.height = rect.height;
    
    if (changeCenter) { 
      console.log("change center")
      canvasCenter.current.x = rect.width / 2;
      canvasCenter.current.y = rect.height / 2;
    }

    renderJson(topoJson);
  } 


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
      onWheel={handleWheel}
      
    ></canvas>
  );
};
