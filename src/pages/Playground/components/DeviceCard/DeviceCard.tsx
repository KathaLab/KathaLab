import React from "react";
import { Device } from "../../../../model/Device";
import style from "./DeviceCard.scss";

type ComponentType = {
  onClick: () => void;
  device: Device;
};

export const DeviceCard = ({onClick, device}: ComponentType) => {
  return (
    <div className={style.deviceCard} onClick={onClick}>
      <img src={device.imageUrl} alt="img-device" />
    </div>
  );
};
