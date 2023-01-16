export const LAB_CONF_REGEX = /^(lab_name ?= ?(?<name>.{0,30}))|(lab_email=(?<email>.{0,50}))|(lab_web=(?<web>.{0,255}))|lab_version=(?<version>.{0,30})|(lab_author=(?<author>.{0,128}))|(lab_description=(?<description>.{0,500}))$/gim;

export const LAB_DEVICE_REGEX = /^((?<deviceName>\w{1,32})\[bridged]=(?<isBridged>.\w+))/gim;
