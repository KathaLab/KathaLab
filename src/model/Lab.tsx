import { Device } from "./Device"

export interface Lab {
    id: string
    labName: string
    description?: string
    version?: string
    author?: string
    email?: string
    web?: string
    devices: Device[]
    canvas : {
        x: number
        y: number
        zoom: number
    }

}
