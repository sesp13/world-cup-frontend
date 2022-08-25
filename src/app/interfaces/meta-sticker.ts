import { IGroup } from "./group.interface";

export interface IMetaSticker {
  _id?: string;
  code: string;
  groupId: string;
  name?: string;
  group?: IGroup;
}
