export type Device = {
  name: string
  type: DeviceType
  position?: Position
  memory?: number
  interfaces?: {
      ip: string
      cidr: number 
      is_up: boolean
      collision_domain: string
      bridged: boolean
  }[]
  default_command?: string[]
  startups_commands?: string[]
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
    type: DeviceType.PC,
  },
  {
    name: "",
    type: DeviceType.Router,
  }
];
