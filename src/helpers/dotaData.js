import { esportsTitles } from './constants';

// General
const nip = "Ninjas In Pyjamas";
const secret = "Team Secret"; // team_id: 1838315, last_match_time: 1553088902
const liquid = "Team Liquid";
const vp = "Virtus.Pro";
const navi = "Natus Vincere";
const lgd = "PSG LGD";
const ehome = "EHOME";
const keen = "Keen Gaming";
const fnatic = "Fnatic";
const mineski = "Mineski";
const eg = "Evil Geniuses";
const jstorm = "J.Storm";
const forward = "Forward Gaming";
const infamous = "Infamous";
const og = "OG";
const tnc = "TNC";

export const dotaTournaments = [
  {
    sport: esportsTitles.DOTA,
    name: "The Chongqing Major",
    tier: "Major",
    teams: [],
    startDate: '2019-01-19',
    endDate: '2019-01-27',
    matches: [
      {
        date: '2019-1-27',
        team1: vp,
        team2: secret,
        winner: secret,
        score: "1 - 3"
      },
      {
        date: '2019-1-27',
        team1: secret,
        team2: eg,
        winner: secret,
        score: "2 -0",
        video: ""
      },
      {
        date: '2019-1-27',
        team1: eg,
        team2: lgd,
        winner: eg,
        score: "2 - 0",
        videoUrl: "https://www.youtube.com/embed/k6B-UTAJd5U",
        video: "k6B-UTAJd5U"
      },
    ]
  },
  {
    sport: esportsTitles.DOTA,
    name: "ESL One Katowice 2019",
    tier: "Minor",
    teams: [],
    startDate: '2019-02-19',
    endDate: '2019-02-24'
  },
  {
    sport: esportsTitles.DOTA,
    name: "DreamLeague Season 11",
    tier: "Major",
    teams: [],
    startDate: '2019-03-14',
    endDate: '2019-03-24'
  }
];

const secretData = {
  name: secret,
  players: [],
  tournaments: [],
  highlights: []
};

const liquidData = {
  name: liquid,
  players: [],
  tournaments: [],
  highlights: []
};

const vpData = {
  name: vp,
  players: [],
  tournaments: [],
  highlights: []
};

export const dotaData = {
  secret: secretData,
  liquid: liquidData,
  vp: vpData
};

export const dotaTeams = Object.keys(dotaData).map(key => dotaData[key].name);
