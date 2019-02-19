const nip = "Ninjas In Pyjamas";
const secret = "Team Secret";
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
    name: "The Chongqing Major",
    tier: "Major",
    teams: [],
    startDate: '2019-01-19',
    endDate: '2019-01-27'
  },
  {
    name: "ESL One Katowice 2019",
    tier: "Minor",
    teams: [],
    startDate: '2019-02-19',
    endDate: '2019-02-24'
  },
  {
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