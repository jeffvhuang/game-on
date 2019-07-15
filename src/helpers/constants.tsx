/**
 * 
 * Specific app related constants section
 * 
 */

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

export const esportsTitles = {
  DOTA: "Dota 2",
  LEAGUE: "League of Legends",
  CSGO: "Counter Strike: GO",
  OVERWATCH: "Overwatch"
};

export const esports = {
  DOTA: "dota",
  LEAGUE: "lol",
  CSGO: "csgo",
  OVERWATCH: "overwatch"
};

export const esportsList = Object.keys(esports).map(key => {
  return esports[key];
});

export const allSportsList = sportsList.concat(esportsList);


// API from backend
export const gameonAPI = {
  HOST: 'https://localhost:44305/api',
  NBA: '/basketball/nba',
  EPL: '/football/epl',
  CHAMPIONS_LEAGUE: '/football/championsleague',
  EUROPA_LEAGUE: '/football/europaleague',
  TENNIS: '/tennis',
  DOTA: '/dota',
  LOL: '/lol',
  OVERWATCH: '/overwatch',
  CSGO: '/csgo',
  TOURNAMENTS: '/tournaments',
  SCHEDULE: '/schedule',
  TEAMS: '/teams',
  SERIES: '/series',
  MATCHES: '/matches',
  GAMES: '/games',
  LIVE: '/live'
};

// Third party APIs
export const youtubeAPI = {
  HOST: 'https://www.googleapis.com/youtube/v3',
  KEY: 'AIzaSyDCn1lgLIzn3dZBl4n3b55VK1wwrLV3ako',
  PLAYLIST: '/playlists',
  PLAYLIST_ITEMS: '/playlistItems',
  // playlistId
  NBA_ID: 'PLKddg6CP4-_wVmmCvSwOIkHu0676TdR_z', // Ximo Pierto - 2018/19
  CHAMPIONS_LEAGUE_ID: 'PLubVgegS36EMhMb1j0NZL7Fcwy5jioEcg', // BTSport Channel, Champions League 2018/19
  EUROPA_LEAGUE_ID: 'PLubVgegS36EMNu3zRwwppiq3HrOjSNveM', // BTSport Channel, Europ League 2018/19 
  DOTA_ID: 'UUfsOfLvadg89Bx8Sv_6WERg' // NoobfromUA uploads
};


/**
 * 
 * General helper constants
 * 
 */
export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
