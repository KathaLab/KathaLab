//export const LAB_CONF_REGEX = /(lab_name ?= ?(?<name>.{0,30}))|(lab_email=(?<email>.{0,50}))|(lab_web=(?<web>.{0,255}))|(lab_version=(?<version>.{0,30}))|(lab_author=(?<author>.{0,128}))|(lab_description=(?<description>.{0,500}))/gim;

export const LAB_NAME_REGEX =/lab_name ?= ?(?<name>.{0,32})/gi;
export const LAB_AUTHOR_REGEX =/lab_author ?= ?(?<author>.{0,128})/gi;
export const LAB_DESCRIPTION_REGEX = /lab_description ?= ?(?<description>.{0,512})/gi;
export const LAB_EMAIL_REGEX = /lab_email ?= ?(?<email>.{0,64})/gi;
export const LAB_WEB_REGEX = /lab_web ?= ?(?<web>.{0,128})/gi;
export const LAB_VERSION_REGEX = /lab_version ?= ?(?<version>.{0,32})/gi;

export const LAB_DEVICE_BRIDGED_REGEX = /\w{1,32}\[bridged]=(?<bridged>\w+)/gi;
export const LAB_DEVICE_IMAGE_REGEX = /\w{1,32}\[image]=(?<image>.+)/gi;
export const LAB_DEVICE_MEMORY_REGEX = /\w{1,32}\[memory]=(?<memory>.+)/gi;
export const LAB_DEVICE_CPUS_REGEX = /\w{1,32}\[cpus]=(?<cpus>.+)/gi;
export const LAB_DEVICE_PORT_REGEX = /\w{1,32}\[port]=(?<port>.+)/gi;
export const LAB_DEVICE_IPV6_REGEX = /\w{1,32}\[ipv6]=(?<ipv6>\w+.)/gi;
export const LAB_DEVICE_EXEC_REGEX = /\w{1,32}\[exec]=(?<exec>.+)/gi;
export const LAB_DEVICE_SYSCTL_REGEX = /\w{1,32}\[sysctl]=(?<sysctl>.+)/gi;
export const LAB_DEVICE_ENV_REGEX = /\w{1,32}\[env]=(?<env>.+)/gi;
export const LAB_DEVICE_SHELL_REGEX = /\w{1,32}\[shell]=(?<shell>.+)/gi;
export const LAB_DEVICE_NUM_TERMS_REGEX = /\w{1,32}\[num_terms]=(?<num_terms>[0-9]+)/gi;

export const LAB_DEVICE_INTERFACE_NAME_REGEX = /\w{1,32}\[(?<interfaceName>\w{1,64})]=\w{1,64}/gi;
export const LAB_DEVICE_INTERFACE_COLLISION_DOMAIN_REGEX = /\w{1,32}\[\w{1,64}]=(?<collision_domain>\w{1,64})/gi;
export const LAB_DEVICE_INTERFACE_IP_REGEX = /ip +address +add +(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/\d{1,2} +dev +\w{1,64} ?|ip +addr +add +(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/\d{1,2} +dev +\w{1,64} ?|ip +a +add +(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/\d{1,2} +dev +\w{1,64} ?|ip +a +a +(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/\d{1,2} +dev +\w{1,64} ?|ip +addr +a +(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/\d{1,2} +dev +\w{1,64} ?/gi;
export const LAB_DEVICE_INTERFACE_NAME_FROM_IP_ADD = /ip +address +add +\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2} +dev +(\w{1,64}) ?|ip +addr +add +\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2} +dev +(\w{1,64}) ?|ip +a +add +\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2} +dev +(\w{1,64}) ?|ip +a +a +\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2} +dev +(\w{1,64}) ?|ip +addr +a +\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2} +dev +(\w{1,64}) ?/gi;
export const LAB_DEVICE_INTERFACE_NAME_AND_IP_IS_UP_REGEX = /ip +link +set +up +dev +(\w{1,64})|ip +link +set +dev +(\w{1,64}) +up|ip +link +set +(\w{1,64}) +up|ip +link +set +up +(\w{1,64})/gi;
export const LAB_DEVICE_INTERFACE_CIDR_REGEX = /ip +address +add +\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/(\d{1,2}) +dev +\w{1,64} ?|ip +addr +add +\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/(\d{1,2}) +dev +\w{1,64} ?|ip +a +add +\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/(\d{1,2}) +dev +\w{1,64} ?|ip +a +a +\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/(\d{1,2}) +dev +\w{1,64} ?|ip +addr +a +\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/(\d{1,2}) +dev +\w{1,64} ?/gi;

export const LAB_DEVICE_INTERFACE_DEFAULT_ROUTE_REGEX =/a/gi;
export const LAB_DEVICE_INTERFACE_CUSTOM_ROUTE_REGEX = /a/gi;

export const LAB_DEVICE_NAME_REGEX = /(?<deviceName>\w{1,32})\[\w+]=.*;?/gi;

export const DEVICE_IP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g
export const DEVICE_CIDR = /^(?:(?:3[0-2]|2[0-9]|1[0-9]|[0-9]?))$/g;

export const EXPORTED_LAB_NAME_REGEX = /^([\w-_ ]{1,32})$/gi
export const EXPORTED_NAME_REGEX = /^(\w{1,32})$/gi
export const EXPORTED_NUMBER_VAR_REGEX = /^([0-9]+)$/gi
