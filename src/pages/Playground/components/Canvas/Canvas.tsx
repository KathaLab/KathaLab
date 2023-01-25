import React, {
  useEffect,
  useRef,
  MouseEventHandler,
  KeyboardEventHandler,
  WheelEventHandler,
  useState,
  useContext,
} from "react";
import style from "./Canvas.module.scss";
import { Lab } from "../../../../model/Lab";
import { Device, deviceSize, DeviceType } from "../../../../model/Device";
import { useColoredImage } from "../../../../hooks/useColoredImage";
import { useCssVar } from "../../../../hooks/useCssVar";
import { MouseButtonType, ScrollBarWidth } from "./canvaHelper";
import { ContextMenu, option } from "../../../../components/ContextMenu/ContextMenu";
import { keyBindContext } from "../../../../context/KeybindContext";

type ComponentType = {
  topoJson: Lab;
  setSelectedDevices?: (devices: Device[]) => void;
  selectedDevices?: Device[];
  onSave?: () => void;
  onDuplicate?: () => void;
  onNew?: (type: DeviceType, pos?: { x: number, y: number }) => void;
  onExport?: (lab: Lab) => void;
  interactive: boolean
};

export const Canvas = ({
  topoJson,
  setSelectedDevices,
  selectedDevices,
  onSave,
  onDuplicate,
  onNew,
  onExport,
  interactive = true,
}: ComponentType) => {

  const [addDevice, setAddDevice] = useState(false);

  const ctx = useContext(keyBindContext);

  const canvasRef = useRef(null);
  const canvasCenter = useRef({ x: 0, y: 0 });

  const mouseDownPosRef = useRef({ x: 0, y: 0 });
  const mouseButtonDownRef = useRef<MouseButtonType>(MouseButtonType.None);

  const isMajPressedRef = useRef(false);

  const actionTypeRef = useRef<"move" | "select" | "scrollX" | "scrollY">("select");

  const [getImg] = useColoredImage();
  const color = useCssVar("--clr-main-primary");
  const [mouseDownEvent, setMouseDownEvent] = useState<MouseEvent>(null);

  const newDeviceOptions: option[] = Object.entries(DeviceType).map(([name, type]) => {
    return {
      label: name,
      onClick: () => onNew(type)
    }
  })


  const labOptions = [
    { label: 'New', options: newDeviceOptions },
    { label: 'Duplicate', disabled: !selectedDevices?.length, onClick: onDuplicate },
    { separator: true },
    { label: 'Save', onClick: onSave },
    { label: 'Export', onClick: () => onExport(topoJson) },
  ];

  const observer = useRef(
    new ResizeObserver(() => {
      console.log("resize")
      resize()
    })
  )

  const getHSData = () => {
    if (!topoJson.devices.length) return;


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

    const offsetRatio = (100 * (viewportLeft - mostLeft)) / outerWidth;
    const ratio = (100 * innerWidth) / outerWidth

    return {
      ratio,
      innerWidth,
      outerWidth,
      offsetRatio,
      viewportLeft,
      viewportRight,
      mostLeft, mostRight
    }
  }

  const renderHScrollbars = () => {
    if (!interactive) return
    if (!topoJson?.devices.length) return;

    const { ratio, offsetRatio } = getHSData();


    if (ratio === 100) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#333333";
    ctx.fillRect(
      4 * ScrollBarWidth + ((canvasRef.current.width - ScrollBarWidth * 5) * offsetRatio) / 100,
      canvasRef.current.height - ScrollBarWidth * 2,
      ((canvasRef.current.width - ScrollBarWidth * 5) * ratio) / 100,
      ScrollBarWidth
    );
  };

  const getVSData = () => {
    if (!topoJson.devices.length) return;

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

    return {
      ratio,
      innerWidth,
      outerWidth,
      offsetRatio,
      viewportTop,
      viewportBottom,
      mostTop, mostBottom
    }
  }

  const renderVScrollbars = () => {
    if (!interactive) return
    if (!topoJson.devices.length) return;

    const { ratio, offsetRatio } = getVSData()

    if (ratio === 100) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#333333";
    ctx.fillRect(
      10,
      10 + ((canvasRef.current.height - ScrollBarWidth * 5) * offsetRatio) / 100,
      ScrollBarWidth,
      ((canvasRef.current.height - ScrollBarWidth * 5) * ratio) / 100
    );
  };

  const lighten = (color: string, diff = 50) => {
    return `#${Math.min(255, parseInt(color.slice(2, 4), 16) + diff).toString(16).padStart(2, "0")}${Math.min(255, parseInt(color.slice(4, 6), 16) + diff).toString(16).padStart(2, "0")}${Math.min(255, parseInt(color.slice(6, 8), 16) + diff).toString(16).padStart(2, '0')}`
  }

  const renderJson = async (json: Lab) => {
    const ctx = canvasRef.current.getContext("2d");
    const rect = canvasRef.current.getBoundingClientRect();

    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // render links between devices

    ctx.lineWidth = 3
    json.devices?.forEach((device, idx, self) => {
      device.interfaces?.map(inter => inter.collision_domain).filter(Boolean).forEach(domain => {
        json.devices.slice(idx + 1, self.length).forEach(dev => {
          dev.interfaces?.forEach((itr) => {
            if (itr.collision_domain === domain) {
              ctx.beginPath();
              ctx.moveTo(device.position.x + canvasCenter.current.x, device.position.y + canvasCenter.current.y);
              ctx.lineTo(dev.position.x + canvasCenter.current.x, dev.position.y + canvasCenter.current.y);
              ctx.strokeStyle = color
              ctx.stroke();
              ctx.beginPath();
              ctx.fillStyle = "#1e1e1e";
              ctx.arc(dev.position.x + canvasCenter.current.x, dev.position.y + canvasCenter.current.y, 50, 0, Math.PI * 2, true);
              ctx.arc(device.position.x + canvasCenter.current.x, device.position.y + canvasCenter.current.y, 50, 0, Math.PI * 2, true);
              ctx.fill();
            }
          })
        })
      })
    })
    ctx.closePath();

    // render devices
    json.devices && await Promise.all(json.devices.map((device) => {
      if (!device.position)
        device.position = device?.position || {
          x: rect.width / 2 - canvasCenter.current.x,
          y: rect.height / 2 - canvasCenter.current.y,
        };

      const selected = selectedDevices?.includes(device);
      const color2 = selected ? lighten(color, 75) : color;

      return (async () => {

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

        ctx.textAlign = "center";
        ctx.fillStyle = color2;
        ctx.font = `${selected ? '800 18px' : '700 16px'} 'Be Vietnam Pro'`;
        ctx.font
        ctx.fillText(
          device.deviceName,
          canvasCenter.current.x + device?.position.x,
          canvasCenter.current.y +
          device?.position.y -
          deviceSize.height / 2 +
          deviceSize.height +
          20
        );
      })();
    }));

    // render scrollbars
    renderHScrollbars();
    renderVScrollbars();
  };


  const renderSelection = (x: number, y: number) => {
    const ctx = (canvasRef.current as HTMLCanvasElement).getContext("2d");

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
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
    if (!interactive) return
    mouseButtonDownRef.current = e.buttons;

    renderJson(topoJson);

    if (mouseButtonDownRef.current === MouseButtonType.MiddleClick) {
      canvasRef.current.style.cursor = "grabbing";
    } else {
      canvasRef.current.style.cursor = "default";
    }

    if (mouseButtonDownRef.current === MouseButtonType.RightClick) {
      setMouseDownEvent(e as any);
    } else {
      setMouseDownEvent(null);
    }

    if (e.buttons !== MouseButtonType.LeftClick) return;

    const position = pageMousePositionToCanvasPosition(e.pageX, e.pageY);
    mouseDownPosRef.current = position;

    const rect = canvasRef.current.getBoundingClientRect();
    if (e.pageX - rect.left <= 20) {
      return actionTypeRef.current = 'scrollY';
    } else if (e.pageY - rect.top >= rect.height - 20) {
      return actionTypeRef.current = 'scrollX';
    }

    const device = getDeviceInZone(
      position.x,
      position.y,
      position.x,
      position.y
    ).at(-1);

    if (device && !selectedDevices.includes(device)) {
      setSelectedDevices(e.shiftKey ? [...selectedDevices, device] : [device]);
    }

    if (!device) {
      actionTypeRef.current = "select";
    } else if (device) {
      actionTypeRef.current = "move";
    }
  };

  const handleMouseUp: MouseEventHandler = (e) => {
    if (!interactive) return

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

    actionTypeRef.current = "select";
    canvasRef.current.style.cursor = "default";
    mouseButtonDownRef.current = MouseButtonType.None;
  };

  const handleMouseMove: MouseEventHandler = async (e) => {
    if (!interactive) return

    if (mouseButtonDownRef.current === MouseButtonType.MiddleClick) {
      canvasCenter.current.x += e.movementX;
      canvasCenter.current.y += e.movementY;
      renderJson(topoJson);
    } else if (
      mouseButtonDownRef.current === MouseButtonType.LeftClick &&
      actionTypeRef.current === "select"
    ) {
      const position = pageMousePositionToCanvasPosition(e.pageX, e.pageY);
      await renderJson(topoJson);
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
    else if (mouseButtonDownRef.current === MouseButtonType.LeftClick &&
      (actionTypeRef.current === "scrollX" || actionTypeRef.current === "scrollY")) {

      // TODO: revoir le ration pour bouger la scroll bar plutot que le canvas

      if (actionTypeRef.current === "scrollX") {
        canvasCenter.current.x -= e.movementX;
      } else if (actionTypeRef.current === "scrollY") {
        canvasCenter.current.y -= e.movementY;
      }
      renderJson(topoJson);
    }
  };

  const handleWheel: WheelEventHandler = (e) => {
    if (!interactive) return

    canvasCenter.current.y -= e.deltaY;
    canvasCenter.current.x -= e.deltaX;

    if (actionTypeRef.current === "move" && mouseButtonDownRef.current === MouseButtonType.LeftClick) {
      selectedDevices.forEach((device) => {
        device.position.y += e.deltaY;
        device.position.y += e.deltaX;
      });
    }

    renderJson(topoJson);
  };

  //#endregion

  //#region keyboard events

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (!interactive) return

    if (e.key === "Shift") {
      isMajPressedRef.current = true;
    }
    if (e.key === "Delete" || e.key === "Backspace") {
      topoJson.devices = topoJson.devices.filter(
        (device) => !selectedDevices.includes(device)
      );
      setSelectedDevices([]);
    }
  };

  const handleKeyUp: KeyboardEventHandler = (e) => {
    if (!interactive) return

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

  const resize = (changeCenter = false) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();

    canvasRef.current.width = rect.width;
    canvasRef.current.height = rect.height;

    if (changeCenter) {
      canvasCenter.current.x = rect.width / 2;
      canvasCenter.current.y = rect.height / 2;
    }

    renderJson(topoJson);
  }

  useEffect(() => {
    const fn = async () => renderJson(topoJson)
    fn();
  }, [topoJson, selectedDevices]);

  useEffect(() => {
    if (interactive) {
      const handleAdd = () => {
        setAddDevice(true)
      }

      ctx.on('playground-new-device', handleAdd);

      return () => {
        ctx.remove('playground-new-device', handleAdd);
      }
    }else if (topoJson.devices.length) {
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


      const mostTopDevicePosition =
        topoJson.devices?.reduce((prev, curr) => {
          return curr.position.y < prev.position.y ? curr : prev;
        }).position.y -
        deviceSize.height / 2;

      const mostBottomDevicePosition =
        topoJson.devices?.reduce((prev, curr) => {
          return curr.position.y > prev.position.y ? curr : prev;
        }).position.y + deviceSize.height;

      const x = (mostLeftDevicePosition + mostRightDevicePosition) / 2
      const y = (mostTopDevicePosition + mostBottomDevicePosition) / 2


      canvasCenter.current.x = canvasCenter.current.x - x
      canvasCenter.current.y = canvasCenter.current.y - y
      renderJson(topoJson);
    }
  }, [interactive])




  function dragOver(e: any) {
    e.preventDefault();
  }

  function dragEnter(e: any) {
    e.preventDefault();
  }

  function dragDrop(e: any) {
    if (!interactive) return

    const device: Device | null = e.dataTransfer.getData('device') ? JSON.parse(e.dataTransfer.getData('device')) : null;
    if (device) {
      const pos = pageMousePositionToCanvasPosition(e.clientX, e.clientY)
      onNew(device.type, pos)
    }
  }

  return <>
    <div>
      {addDevice}
    </div>
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
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDrop={dragDrop}
    ></canvas>
    {mouseDownEvent && <ContextMenu onHide={() => setMouseDownEvent(null)} options={labOptions} position={{ x: mouseDownEvent?.clientX, y: mouseDownEvent?.clientY - 40 }}></ContextMenu>}
    {addDevice && <ContextMenu className={style.center} onHide={() => setAddDevice(false)} options={newDeviceOptions}></ContextMenu>}
  </>
};
