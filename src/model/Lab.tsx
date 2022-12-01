import { Device } from "./Device"

export interface Lab {
    id: string
    labName: string
    description?: string
    version?: string 
    author?: string
    mail?: string
    web?: string
    devices: Device[]
}