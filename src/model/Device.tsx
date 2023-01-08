import {laptop, router} from "./DeviceSvg";

export type Device = {
  name: string
  type: DeviceType
  position?: Position
  memory?: number
  interfaces?: {
      ip: string
      cidr: string 
      is_up: boolean
      collision_domain: string
      bridged: boolean
  }[]
  default_command?: string[]
  startups_commands?: string[]
  shutdown_commands?: string[]
};

export enum DeviceType {
  PC = "PC",
  Router = "R",
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
    name: "",
    type: DeviceType.PC,
  },
  {
    name: "",
    type: DeviceType.Router,
  }
];
