import {Route} from "./Route";

export type Interfaces = {
  interfaceName: string
  ip: string
  cidr: number
  mask: string
  is_up: boolean
  collision_domain: string
  routes?: Route[]
}
