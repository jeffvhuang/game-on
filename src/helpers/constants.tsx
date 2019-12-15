import SubMenu from "antd/lib/menu/SubMenu";

/**
 *
 * Specific app related constants section
 *
 */
export const env = "dev";
// export const env = 'prod';

export const appName = "Game On";

export const paths = {
  LANDING: "/",
  LOGIN: "/login",
  HIGHLIGHTS: "/highlights",
  SPORTS: "/sports",
  BASKETBALL: "/basketball",
  FOOTBALL: "/football",
  TENNIS: "/tennis",
  ESPORTS: "/esports",
  DOTA: "/dota",
  LOL: "/lol",
  CSGO: "/csgo",
  OVERWATCH: "/overwatch",
  EVENTS: "/events",
  VIDEO: "/video"
};

export const sports = [
  {
    name: "Basketball",
    abbreviation: "basketball",
    apiAbbreviation: "Basketball",
    leagues: [
      {
        name: "National Basketball Association",
        abbreviation: "NBA",
        apiAbbreviation: "NBA",
        teams: []
      }
    ]
  },
  {
    name: "Football",
    abbreviation: "football",
    apiAbbreviation: "Football",
    leagues: [
      {
        name: "English Premier League",
        abbreviation: "EPL",
        apiAbbreviation: "EPL",
        teams: []
      },
      {
        name: "Europa League",
        abbreviation: "europaLeague",
        apiAbbreviation: "Europa League",
        teams: []
      },
      {
        name: "Champion's League",
        abbreviation: "championsLeague",
        apiAbbreviation: "Champions League",
        teams: []
      }
    ]
  },
  {
    name: "Tennis",
    abbreviation: "tennis",
    apiAbbreviation: "Tennis",
    tournaments: []
  }
];

/**
 * @property selector: used by antd select dropdown to search by typing
 * and match a sequence within the string
 */
export const sportsLeagues = [
  {
    name: "National Basketball Association",
    uiName: "National Basketball Association (NBA)",
    abbreviation: "nba",
    selectors: "nba national basketball association",
    sport: "Basketball",
    teams: []
  },
  {
    name: "English Premier League",
    uiName: "English Premier League (EPL)",
    abbreviation: "epl",
    selectors: "epl english premier league football",
    sport: "football",
    teams: []
  },
  {
    name: "Europa League",
    uiName: "Europa League",
    abbreviation: "europaLeague",
    selectors: "europa league football",
    sport: "football",
    teams: []
  },
  {
    name: "Champions League",
    uiName: "Champions League",
    abbreviation: "championsLeague",
    selectors: "champions league football",
    sport: "football",
    teams: []
  },
  {
    name: "Tennis",
    uiName: "Tennis",
    abbreviation: "tennis",
    selectors: "tennis",
    sport: "tennis",
    tournaments: []
  }
];

export const esports = [
  {
    name: "Dota 2",
    uiName: "Dota 2",
    abbreviation: "dota",
    selectors: "dota 2 defense defence of the ancients"
  },
  {
    name: "League of Legends",
    uiName: "League of Legends",
    abbreviation: "LoL",
    selectors: "lol league of legends"
  },
  {
    name: "Counter Strike: Global Offensive",
    uiName: "Counter Strike: Global Offensive",
    abbreviation: "csgo",
    selectors: "csgo cs:go counter strike global offensive"
  },
  {
    name: "Overwatch",
    uiName: "Overwatch",
    abbreviation: "ow",
    selectors: "overwatch ow"
  }
  // {
  //   name: "Fortnite",
  //   abbreviation: "fortnite"
  // },
  // {
  //   name: "PlayerUnknown's Battleground",
  //   abbreviation: "pubg"
  // }
];

export const sportsList = [...sports, ...esports];

// API from backend
export const gameonAPI = {
  HOST: "https://localhost:44305/api",
  NBA: "/basketball/nba",
  EPL: "/football/epl",
  CHAMPIONS_LEAGUE: "/football/championsleague",
  EUROPA_LEAGUE: "/football/europaleague",
  TENNIS: "/tennis",
  DOTA: "/dota",
  LOL: "/lol",
  OVERWATCH: "/overwatch",
  CSGO: "/csgo",
  TOURNAMENTS: "/tournaments",
  SCHEDULE: "/schedule",
  TEAMS: "/teams",
  SERIES: "/series",
  MATCHES: "/matches",
  GAMES: "/games",
  LIVE: "/live",
  GENERAL: "/general",
  EVENTS: "/events"
};

// Third party APIs
// export const youtubeAPI = {
//   HOST: "https://www.googleapis.com/youtube/v3",
//   KEY: "{your-youtube-api-key}",
//   PLAYLIST: "/playlists",
//   PLAYLIST_ITEMS: "/playlistItems",
//   // playlistId
//   NBA_ID: "PLKddg6CP4-_wVmmCvSwOIkHu0676TdR_z", // Ximo Pierto - 2018/19
//   CHAMPIONS_LEAGUE_ID: "PLubVgegS36EMhMb1j0NZL7Fcwy5jioEcg", // BTSport Channel, Champions League 2018/19
//   EUROPA_LEAGUE_ID: "PLubVgegS36EMNu3zRwwppiq3HrOjSNveM", // BTSport Channel, Europ League 2018/19
//   DOTA_ID: "UUfsOfLvadg89Bx8Sv_6WERg" // NoobfromUA uploads
// };

/**
 *
 * General helper constants
 *
 */
export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
