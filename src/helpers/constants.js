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

export const footballThumbnails = [
  {
    videoPath: "https://www.youtube.com/watch?v=WHRARy54JdM",
    imgSrc: "https://dummyimage.com/200x160/000/fff.jpg&text=Video1",
    title: "Matchday 32"
  },
  {
    videoPath: "https://www.youtube.com/watch?v=sOSBXhWgx20",
    imgSrc: "https://dummyimage.com/200x160/000/fff.jpg&text=Video2",
    title: "Matchday 31"
  },
  {
    videoPath: "https://www.youtube.com/watch?v=8IwHD9ucbkI",
    imgSrc: "https://dummyimage.com/200x160/000/fff.jpg&text=Video3",
    title: "Matchday 30"
  },
  {
    videoPath: "https://www.youtube.com/watch?v=LoY0szJppCQ",
    imgSrc: "https://dummyimage.com/200x160/000/fff.jpg&text=Video4",
    title: "Matchday 29"
  }
];

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
  KEY: 'AIzaSyDCn1lgLIzn3dZBl4n3b55VK1wwrLV3ako',
  PLAYLIST_ITEMS: '/playlistItems',
  NBA_ID: 'PLKddg6CP4-_wVmmCvSwOIkHu0676TdR_z'
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
