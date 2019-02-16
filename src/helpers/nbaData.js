const hawks = "Atlanta Hawks";
const celtics = "Boston Celtics";
const nets = "Brooklyn Nets";
const hornets = "Charlotte Hornets";
const bulls = "Chicago Bulls";
const cavs = "Cleveland Cavaliers";
const mavs = "Dallas Mavericks";
const nuggets = "Denver Nuggets";
const pistons = "Detroit Pistons";
const warriors = "Golden State Warriors";
const rockets = "Houston Rockets";
const pacers = "Indiana Pacers";
const clippers = "LA Clippers";
const lakers = "Los Angeles Lakers";
const grizzlies = "Memphis Grizzlies";
const heat = "Miami Heat";
const bucks = "Milwaukee Bucks";
const wolves = "Minnesota Timberwolves";
const pelicans = "New Orleans Pelicans";
const knicks = "New York Knicks";
const okc = "Oklahoma City Thunder";
const magic = "Orlando Magic";
const p76ers = "Philadelphia 76ers";
const suns = "Phoenix Suns";
const blazers = "Portland Trail Blazers";
const kings = "Sacramento Kings";
const spurs = "San Antonio Spurs";
const raptors = "Toronto Raptors";
const jazz = "Utah Jazz";
const wizards = "Washington Wizards";

const warriorsData = {
  name: warriors,
  players: [],
  matches: [
    {
      date: '2019-2-13',
      home: warriors,
      away: jazz,
      winner: warriors,
      score: "115 - 108"
    },
    {
      date: '2019-2-14',
      home: blazers,
      away: warriors,
      winner: blazers,
      score: "129 - 107"
    },
    {
      date: '2019-2-22',
      home: warriors,
      away: kings,
      winner: '',
      score: ''
    }
  ],
  highlights: []
};

const lakersData = {
  name: "Los Angeles Lakers",
  players: [],
  matches: [
    {
      date: '2019-2-13',
      home: hawks,
      away: lakers,
      winner: hawks,
      score: "117 - 113"
    },
    {
      date: '2019-2-22',
      home: lakers,
      away: rockets,
      winner: '',
      score: ''
    }
  ],
  highlights: []
};

const celticsData = {
  name: celtics,
  players: [],
  matches: [
    {
      date: '2019-2-14',
      home: celtics,
      away: pistons,
      winner: celtics,
      score: "118 - 110"
    },
    {
      date: '2019-2-22',
      home: bucks,
      away: celtics,
      winner: '',
      score: ''
    }
  ],
  highlights: []
};

export const nbaData = {
  warriors: warriorsData,
  lakers: lakersData,
  celtics: celticsData
};