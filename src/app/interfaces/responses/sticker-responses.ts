import { ISticker } from '../sticker';

export interface GetStickersByUserStatusResponse {
  msg?: string;
  stickers?: ISticker[];
  totalStickers?: number;
  skip?: number;
  limit?: number;
}

export interface GetStickerByIdResponse {
  msg?: string;
  sticker?: ISticker;
}
