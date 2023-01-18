export enum ModelToKatharaConf {

    // FOR THE LAB.CONF
    labName = "LAB_NAME=",
    description = "LAB_DESCRIPTION=",
    author = "LAB_AUTHOR=",
    email = "LAB_EMAIL=",
    version = "LAB_VERSION=",
    web = "LAB_WEB=",

    image = "%deviceName%[image]=%image%",
    memory = "%deviceName%[memory]=%memory%",
    cpus = "%deviceName%[cpus]=%cpus%",
    port = "%deviceName%[port]=%port%",
    bridged = "%deviceName%[bridged]=%bridged%",
    ipv6 = "%deviceName%[ipv6]=%ipv6%",
    exec = "%deviceName%[exec]=%exec%",
    sysctl = "%deviceName%[sysctl]=%sysctl%",
    env = "%deviceName%[env]=%env%",
    shell = "%deviceName%[shell]=%shell%",
    num_terms = "%deviceName%[num_terms]=%num_terms%",

    collision_domain = "%deviceName%[%interfaceName%]=%collision_domain%",

    //FOR THE DEVICE.STARTUP

    IP_ADDRESS_ADD = "ip address add %ip%/%cidr% dev %interfaceName%",
    IP_UP = "ip link set up dev %interfaceName%",
    IP_ROUTE = "ip route add %ip%/%cidr% via %gateway_ip%",
    IP_ROUTE_DEFAULT = "ip route add %ip%",
    IPV4_FORWARD = "/proc/sys/net/ipv4/ip_forward",
    IPV6_FORWARD = "/proc/sys/net/ipv6/conf/all/forwarding",
}
