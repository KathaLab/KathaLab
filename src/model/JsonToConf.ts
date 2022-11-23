export enum JsonToConf{

    // FOR THE LAB.CONF

    LAB_NAME = "LAB_NAME=",
    LAB_DESCRIPTION = "LAB_DESCRIPTION=",
    LAB_AUTHOR = "LAB_AUTHOR=",
    LAB_MAIL = "LAB_MAIL=",
    LAB_WEB = "LAB_WEB=",
    BRIDGED =  "%deviceName%[bridged]=%bridged%",
    ROUTER_DEFAULT = "%deviceName%[sysctl]=“/proc/sys/net/ipv4/ip_forward=1 \n" +
                         "%deviceName%[sysctl]=”/proc/sys/net/ipv6/conf/all/forwarding=1",
    COLLISION_DOMAIN = "%deviceName%[%interface%]=%collision_domain%",
    LAB_COMMAND = "%lab_command%",

    //SET_MEMORY =  "%deviceName%[mem]=%memory%",

    //FOR THE DEVICE.STARTUP

    IP_ADDRESS_ADD = "ip address add %ip%/%cidr% dev %interface%",
    IP_UP =  "ip link set up dev %interface%",
    IP_DOWN =  "ip link set down dev %interface%",
    IP_ROUTE = "ip route add %ip%/%cidr% via %gateway_ip%",
    IP_ROUTE_DEFAULT = "ip route add %ip%",
    IPV4_FORWARD = "/proc/sys/net/ipv4/ip_forward",
    IPV6_FORWARD = "/proc/sys/net/ipv6/conf/all/forwarding",
    STARTUP_COMMAND = "%startup_command%"
}