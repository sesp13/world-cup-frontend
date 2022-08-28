import { ISticker } from '../sticker';

export interface getStikcersByUserStatusResponse {
  msg?: string;
  stickers?: ISticker[];
  totalStickers?: number;
  skip?: number;
  limit?: number;
}
