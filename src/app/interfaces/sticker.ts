import { IMetaSticker } from './meta-sticker';
import { IUser } from './user.interface';

export interface ISticker {
  _id?: string;
  amount?: number;
  status?: string;
  metaStickerId?: string;
  userId?: string;
  metaSticker?: IMetaSticker;
  user?: IUser;
}
