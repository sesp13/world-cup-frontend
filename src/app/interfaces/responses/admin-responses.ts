import { IGroup } from '../group.interface';
import { IMetaSticker } from '../meta-sticker';

export interface CreateTeamResponse {
  msg?: string;
  group?: IGroup;
  players?: IMetaSticker;
}
