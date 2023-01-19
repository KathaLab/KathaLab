export enum ModelToKatharaConf {

    // FOR THE LAB.CONF
    labName = "LAB_NAME=",
    description = "LAB_DESCRIPTION=",
    author = "LAB_AUTHOR=",
    email = "LAB_EMAIL=",
    version = "LAB_VERSION=",
    web = "LAB_WEB=",

    image = "%deviceName%[image]=",
    memory = "%deviceName%[memory]=",
    cpus = "%deviceName%[cpus]=",
    port = "%deviceName%[port]=",
    bridged = "%deviceName%[bridged]=",
    ipv6 = "%deviceName%[ipv6]=",
    exec = "%deviceName%[exec]=",
    sysctl = "%deviceName%[sysctl]=",
    env = "%deviceName%[env]=",
    shell = "%deviceName%[shell]=",
    num_terms = "%deviceName%[num_terms]=",
    collision_domain = "%deviceName%[%interfaceName%]=",

    //FOR THE DEVICE.STARTUP

    IP_ADDRESS_ADD = "ip address add %ip%/%cidr% dev %interfaceName%",
    IP_UP = "ip link set up dev %interfaceName%",
    IP_ROUTE = "ip route add %ip%/%cidr% via %gateway_ip%",
    IP_ROUTE_DEFAULT = "ip route add %ip%",
    IPV4_FORWARD = "/proc/sys/net/ipv4/ip_forward",
    IPV6_FORWARD = "/proc/sys/net/ipv6/conf/all/forwarding",
}
