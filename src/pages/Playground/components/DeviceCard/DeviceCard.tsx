import React from "react";
import { Device, deviceToImage } from "../../../../model/Device";
import style from "./DeviceCard.scss";

type ComponentType = {
  onClick: () => void;
  device: Device;
};

export const DeviceCard = ({ onClick, device }: ComponentType) => {
  return (
    <div className={style.deviceCard} onClick={onClick}>
      <img src={deviceToImage[device.type].src} alt="img-device" />
    </div>
  );
};
