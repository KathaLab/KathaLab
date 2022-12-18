import { Device } from "./Device"

export interface Lab {
    id: string
    name: string 
    description?: string
    version?: string 
    author?: string
    mail?: string
    web?: string
    devices: Device[]
    canvas : {
        x: number
        y: number
        zoom: number
    }
}