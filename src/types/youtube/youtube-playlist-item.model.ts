import { YoutubeSnippet } from "./youtube-snippet.model";

export interface YoutubePlaylistItem {
  kind: string;
  etag: string;
  id: string;
  snippet: YoutubeSnippet;
}