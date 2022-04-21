import { ThumbnailType } from "./ThumbnailType";

export type StoriesType = {
  description: string;
  title: string;
  thumbnail: ThumbnailType;
  id: number;
  modified: string;
  urls: {
    url: string;
  };
  startYear: number;
  endYear: number;
  rating: string;
  type: string;
};
