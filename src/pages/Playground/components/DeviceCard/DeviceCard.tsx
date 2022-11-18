import React, { useLayoutEffect, useRef } from "react";
import { Device, deviceToImage } from "../../../../model/Device";
import style from "./DeviceCard.scss";
import { useColoredImage } from "../../../../hooks/useColoredImage";
import { useCssVar } from "../../../../hooks/useCssVar";

type ComponentType = {
  onClick: () => void;
  device: Device;
};

export const DeviceCard = ({ onClick, device }: ComponentType) => {

  const [getImg] = useColoredImage();
  const value = useCssVar("--clr-main-primary");
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    console.log("value", value);
    (async () => imageRef.current.src = (await getImg(deviceToImage[device.type], value)).src)();
  }, [value])

  return (
    <div className={style.deviceCard} onClick={onClick}>
      <img ref={imageRef}  alt="img-device" />
    </div>
  );
};
