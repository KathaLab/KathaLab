export enum JsonToConf {

    // FOR THE LAB.CONF
    name = "LAB_NAME=",
    description = "LAB_DESCRIPTION=",
    author = "LAB_AUTHOR=",
    mail = "LAB_MAIL=",
    web = "LAB_WEB=",

    bridged = "%deviceName%[bridged]=%bridged%",
    default_command = "%deviceName%[sysctl]=“/proc/sys/net/ipv4/ip_forward=1 \n" +
        "%deviceName%[sysctl]=”/proc/sys/net/ipv6/conf/all/forwarding=1",
    collision_domain = "%deviceName%[%interfaceName%]=%collision_domain%",

    //SET_MEMORY =  "%deviceName%[mem]=%memory%",


    //FOR THE DEVICE.STARTUP

    IP_ADDRESS_ADD = "ip address add %ip%/%cidr% dev %interfaceName%",
    IP_UP = "ip link set up dev %interfaceName%",
    IP_DOWN = "ip link set down dev %interfaceName%",
    IP_ROUTE = "ip route add %ip%/%cidr% via %gateway_ip%",
    IP_ROUTE_DEFAULT = "ip route add %ip%",
    IPV4_FORWARD = "/proc/sys/net/ipv4/ip_forward",
    IPV6_FORWARD = "/proc/sys/net/ipv6/conf/all/forwarding",
    STARTUP_COMMAND = "%startup_command%",

}