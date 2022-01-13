import { ThumbnailType } from "./ThumbnailType";

export type ComicsType = {
    description: string;
    title: string;
    thumbnail: ThumbnailType;
    id: number;
    modified: string;
    urls: {
        url: string;
    }
};