export type Device = {
  name: string;
  interfaces: Interface[];
  position?: Position;
  type: DeviceType;
};

export enum DeviceType {
  PC = "PC",
  Router = "R",
}

export type Interface = string;
export type Position = { x: number; y: number };

export const deviceSize = { width: 100, height: 100 };

const getImageOfDevice = (url: string) => {
  const image = new Image();
  image.src = url;
  return image;
};

export const deviceToImage: Record<DeviceType, HTMLImageElement> = {
  [DeviceType.PC]: getImageOfDevice("assets/laptop.svg"),
  [DeviceType.Router]: getImageOfDevice("assets/router.svg"),
};

export const devices: Device[] = [
  {
    name: "",
    interfaces: [],
    type: DeviceType.PC,
  },
  {
    name: "",
    interfaces: [],
    type: DeviceType.Router,
  }
];
