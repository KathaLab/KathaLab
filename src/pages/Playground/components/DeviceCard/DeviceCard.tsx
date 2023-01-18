import React, { useLayoutEffect, useRef } from "react";
import { Device } from "../../../../model/Device";
import style from "./DeviceCard.scss";
import { useColoredImage } from "../../../../hooks/useColoredImage";

type ComponentType = {
  onClick: () => void;
  device: Device;
  color: string;
};

export const DeviceCard = ({ onClick, device, color }: ComponentType) => {

  const [getImg] = useColoredImage();
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    if(device.type) imageRef.current.src = getImg(device.type, color).src;
  }, [color])


  const dragStart = (e: any) => {
    e.dataTransfer.setData('device', JSON.stringify(device))
  }

  return (
    <div className={style.deviceCard} onClick={onClick}>
      <img draggable="true" ref={imageRef} alt="img-device" onDragStart={dragStart} />
    </div>
  );
};
