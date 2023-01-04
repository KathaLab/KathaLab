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
    imageRef.current.src = getImg(device.type, color).src;
  }, [color])

  return (
    <div draggable="true" className={style.deviceCard} onClick={onClick}>
      <img ref={imageRef} alt="img-device" />
    </div>
  );
};
