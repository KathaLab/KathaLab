import {laptop, router} from "./DeviceSvg";
import {Interfaces} from "./Interfaces";

export type Device = {
  deviceName: string
  type: DeviceType
  position?: Position
  interfaces?: Interfaces[]
  startups_commands?: string[]
  shutdown_commands?: string[]
  optional_parameters?: OptionalParameters
};

export enum DeviceType {
  PC = "PC",
  Router = "R",
}

export type OptionalParameters = {
  image?: string,
  memory?: string,
  cpus?: number,
  port?: string,
  bridged?: boolean,
  ipv6?: boolean,
  exec?: string,
  sysctl?: string[],
  env?: string[],
  shell?: string,
  num_terms?: number,
}

export type Interface = string;
export type Position = { x: number; y: number };

export const deviceSize = { width: 100, height: 100 };

export const deviceToImage: Record<DeviceType, string> = {
  [DeviceType.PC]: laptop,
  [DeviceType.Router]: router,
};

export const devices: Device[] = [
  {
    deviceName: "",
    type: DeviceType.PC,
  },
  {
    deviceName: "",
    type: DeviceType.Router,
    optional_parameters : {sysctl: ['net.ipv4.ip_forward=1']}
  },
];
