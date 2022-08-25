import { IGroup } from "../group.interface";

export interface GetAllGroupsResponse {
  msg?: string,
  groups?: IGroup[]
}