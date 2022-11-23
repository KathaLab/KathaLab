import React, { useLayoutEffect, useRef } from "react";
import { Device, deviceToImage } from "../../../../model/Device";
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
    console.log(color);
    (async () => imageRef.current.src = (await getImg(deviceToImage[device.type], color)).src)();
  }, [color])

  return (
    <div className={style.deviceCard} onClick={onClick}>
      <img ref={imageRef} alt="img-device" />
    </div>
  );
};
