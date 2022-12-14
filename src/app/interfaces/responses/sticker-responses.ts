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

export interface GetAllowedStickerStatusesResponse {
  msg?: string;
  statuses?: string[];
}

export interface UpdateStickerResponse {
  msg?: string;
  sticker?: ISticker;
}

export interface SearchStickersResponse {
  msg?: string;
  stickers?: ISticker[];
  total?: number;
}

export interface GetStickersByUserResponse {
  msg?: string;
  stickers?: ISticker[];
}
