import { ThumbnailType } from "./ThumbnailType";

export type SeriesType = {
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
