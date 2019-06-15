import { PageInfo } from "./youtube-pageinfo.model";
import { YoutubePlaylistItem } from "./youtube-playlist-item.model";

export interface YoutubePlaylist {
  kind: string;
  etag: string;
  nextPageToken: string;
  pageInfo: PageInfo;
  items: YoutubePlaylistItem[];
}