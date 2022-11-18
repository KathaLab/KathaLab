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

export const deviceToImage: Record<DeviceType, string> = {
  [DeviceType.PC]: "assets/laptop.svg",
  [DeviceType.Router]: "assets/router.svg",
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
