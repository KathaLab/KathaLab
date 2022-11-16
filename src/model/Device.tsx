export type Device = {
    name: string;
    interfaces: Interface[];
    imageUrl: string;
    position?: Position;
    type: DeviceType;
}

export enum DeviceType {
    Device = "Device",
    Router = "Router",
}

export type Interface = string;
export type Position = { x: number, y: number };

export const deviceSize = { width: 100, height: 100 };

export const devices: Device[] = [
    {
        name: "",
        interfaces: [],
        imageUrl: "static/img/device.png",
        type: DeviceType.Device
    },
    {
        name: "",
        interfaces: [],
        imageUrl: "static/img/device.png",
        type: DeviceType.Router
    },
]