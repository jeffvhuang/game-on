import { YoutubeResourceId } from "./youtube-resource-id.model";
import { YoutubeThumbnails } from "./youtube-thumbnails.model";

export interface YoutubeSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: YoutubeThumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: YoutubeResourceId;
}