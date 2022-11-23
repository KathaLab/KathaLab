import { Device } from "./Device"

export interface Lab {
    name: string 
    description?: string
    version?: string 
    author?: string
    mail?: string
    web?: string
    devices: Device[]
}