export const appName = 'Game On';

export const paths = {
  LANDING: '/',
  LOGIN: '/login',
  HIGHLIGHTS: '/highlights',
  SPORTS: '/sports',
  BASKETBALL: '/basketball',
  FOOTBALL: '/football',
  TENNIS: '/tennis',
  ESPORTS: '/esports',
  DOTA: '/dota',
  LOL: '/lol',
  CSGO: '/csgo',
  OVERWATCH: '/overwatch',
  EVENTS: '/events',
  VIDEO: '/video'
};

export const sports = {
  BASKETBALL: "Basketball",
  TENNIS: "Tennis",
  FOOTBALL: "Football"
};

export const sportsList = Object.keys(sports).map(key => {
  return sports[key];
});

export const esports = {
  DOTA: "Dota 2",
  LEAGUE: "League of Legends",
  CSGO: "Counter Strike: GO",
  OVERWATCH: "Overwatch"
};

export const esportsList = Object.keys(esports).map(key => {
  return esports[key];
});

export const youtubeAPI = {
  HOST: 'https://www.googleapis.com/youtube/v3',
  PLAYLIST_ITEMS: '/playlistItems',
  NBA_ID: 'PLKddg6CP4-_wVmmCvSwOIkHu0676TdR_z' 
};
