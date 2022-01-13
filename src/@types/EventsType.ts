import { ThumbnailType } from "./ThumbnailType";

export type EventsType = {
    description: string;
    title: string;
    thumbnail: ThumbnailType;
    id: number;
    modified: string;
    urls: {
        url: string;
    }
    start: string;
    end: string;
};