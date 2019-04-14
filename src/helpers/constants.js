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

export const esports = {
  DOTA: "Dota 2",
  LEAGUE: "League of Legends",
  CSGO: "Counter Strike: GO",
  OVERWATCH: "Overwatch"
};

export const esportsList = Object.keys(esports).map(key => {
  return esports[key];
});

export const allSportsList = sportsList.concat(esportsList);

export const youtubeAPI = {
  HOST: 'https://www.googleapis.com/youtube/v3',
  KEY: 'AIzaSyDCn1lgLIzn3dZBl4n3b55VK1wwrLV3ako',
  PLAYLIST: '/playlists',
  PLAYLIST_ITEMS: '/playlistItems',
  // playlistId
  NBA_ID: 'PLKddg6CP4-_wVmmCvSwOIkHu0676TdR_z', // Ximo Pierto - 2018/19
  CHAMPIONS_LEAGUE_ID: 'PLubVgegS36EMhMb1j0NZL7Fcwy5jioEcg', // BTSport Channel, Champions League 2018/19
  EUROPA_LEAGUE_ID: 'PLubVgegS36EMNu3zRwwppiq3HrOjSNveM', // BTSport Channel, Europ League 2018/19 
};

// Third party data APIs
// APi from official NBA but CORS blocked
// export const nbaAPI = {
//   HOST: 'http://data.nba.net/10s',
//   SCHEDULE: '/prod/v1/2018/schedule.json'
// };

// API from Rapidapi.com
export const nbaAPI = {
  HOST: 'https://api-nba-v1.p.rapidapi.com',
  SCHEDULE: '/games/seasonYear' + '/2018',
  TEAMS: '/teams/league/standard'
};

// Rapidapi.com > api-football api
export const eplAPI = {
  HOST: 'https://api-football-v1.p.rapidapi.com',
  SCHEDULE: '/fixtures/league' + '/2',
  TEAMS: '/teams/league/2'
};

export const tennisAPI = {
  HOST: 'https://api.sportradar.com/tennis-t2/en',
  SCHEDULE: '/tournaments' + '.json'
  // TEAMS: '/teams/league/2'
};


/**
 * 
 * General helper constants
 * 
 */
export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
