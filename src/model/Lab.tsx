export interface Lab {
    "name": string 
    "description"?: string
    "version"?: string 
    "author"?: string
    "mail"?: string
    "web"?: string
    "devices": {
        "name": string
        "memory"?: number
        "interfaces"?: {
            "ip": string
            "cidr": number 
            "is_up": boolean
            "collision_domain": string
            "bridged": boolean
        }[]
        "default_command"?: string[]
        "startups_commands": string[]
    }[]
}