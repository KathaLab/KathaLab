export enum JsonToConf {

    // FOR THE LAB.CONF
    labName = "LAB_NAME=",
    description = "LAB_DESCRIPTION=",
    author = "LAB_AUTHOR=",
    email = "LAB_EMAIL=",
    web = "LAB_WEB=",
    bridged = "%deviceName%[bridged]=%bridged%",
    collision_domain = "%deviceName%[%interfaceName%]=%collision_domain%",

    //FOR THE DEVICE.STARTUP

    IP_ADDRESS_ADD = "ip address add %ip%/%cidr% dev %interfaceName%",
    IP_UP = "ip link set up dev %interfaceName%",
    IP_ROUTE = "ip route add %ip%/%cidr% via %gateway_ip%",
    IP_ROUTE_DEFAULT = "ip route add %ip%",
    IPV4_FORWARD = "/proc/sys/net/ipv4/ip_forward",
    IPV6_FORWARD = "/proc/sys/net/ipv6/conf/all/forwarding",
}
