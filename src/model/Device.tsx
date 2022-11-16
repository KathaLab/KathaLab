export type Device = {
    name: string;
    interfaces: Interface[];
    imageUrl: string;
}

export type Interface = string;

export const devices: Device[] = [
    {
        name: "R0",
        interfaces: [],
        imageUrl: "https://i.pravatar.cc/150?img=1"
    },
    {
        name: "R1",
        interfaces: [],
        imageUrl: "https://i.pravatar.cc/150?img=2"
    },
    {
        name: "R2",
        interfaces: [],
        imageUrl: "https://i.pravatar.cc/150?img=3"
    },
]