import { sports, esports } from './constants';

// List of events in each sport
const basketballEvents = [
  {
    sport: sports.BASKETBALL,
    name: "NBA",
    startDate: '2018-10-16',
    endDate: '2019-4-10',
    matches: [
      {
        date: '2019-2-2',
        home: "Miami Heat",
        away: "Oklahoma City Thunder",
        winner: "Thunder",
        score: "102 - 118"
      },
      {
        date: '2019-2-2',
        home: "Nuggets",
        away: "Rockets",
        winner: "Nuggets",
        score: "136 - 122"
      }
    ]
  }
];

const tennisEvents = [
  {
    sport: sports.TENNIS,
    name: "Australian Open",
    startDate: '2019-1-7',
    endDate: '2019-1-27',
    matches: [
      {
        date: '2019-1-26',
        player1: "Osaka",
        player2: "Kvitova",
        winner: "Osaka",
        score: "7-6, 5-7, 6-4"
      },
      {
        date: '2019-1-27',
        player1: "Djokovic",
        player2: "Nadal",
        winner: "Djokovic",
        score: "6-3, 6-2, 6-3"
      }
    ]
  },
  {
    sport: sports.TENNIS,
    name: "French Open",
    startDate: '2019-5-20',
    endDate: '2019-6-9',
    matches: [

    ]
  }
];

const footballEvents = [
  {
    sport: sports.FOOTBALL,
    name: "English Premier League",
    startDate: '2018-8-11',
    endDate: '2019-5-9',
    matches: [
      {
        date: '2019-2-2',
        home: "Tottenham Spurs",
        away: "Newcastle",
        winner: "Tottenham Spurs",
        score: "1 - 0"
      },
      {
        date: '2019-2-2',
        home: "Chelsea",
        away: "Huddersfield",
        winner: "",
        score: ""
      }
    ]
  },
  {
    name: "UEFA Champions League",
    sport: sports.FOOTBALL,
    startDate: '2018-6-26',
    endDate: '2019-6-1',
    matches: [
      {
        date: '2019-2-12',
        home: "Man Utd",
        away: "PSG",
        winner: "",
        score: ""
      },
      {
        date: '2019-2-12',
        home: "Liverpool",
        away: "Bayern",
        winner: "",
        score: ""
      }
    ]
  }
];

const dotaEvents = [
  {
    name: "Chongqing Major",
    sport: esports.DOTA,
    startDate: '2019-1-19',
    endDate: '2019-1-27',
    matches: [
      {
        date: '2019-1-27',
        team1: "Virtus.pro",
        team2: "Secret",
        winner: "Secret",
        score: "1 - 3"
      },
      {
        date: '2019-1-27',
        team1: "Secret",
        team2: "Evil Geniuses",
        winner: "Secret",
        score: "2 -0"
      }
    ]
  }
];

const lolEvents = [
  {
    name: "League of Legends World Championship",
    sport: esports.LEAGUE,
    startDate: '2018-8-1',
    endDate: '2018-11-3',
    matches: [
      {
        date: '2019-11-3',
        team1: "Invictus Gaming",
        team2: "Fnatic",
        winner: "Invictus Gaming",
        score: "3 - 0"
      }
    ]
  }
];

const csgoEvents = [
  {
    name: "BLAST Pro Series: Miami 2019",
    sport: esports.CSGO,
    startDate: '2019-4-12',
    endDate: '2019-4-13',
    matches: []
  }
];

const overwatchEvents = [
  {
    name: "Overwatch League 2019 Regular Season",
    sport: esports.OVERWATCH,
    startDate: '2019-2-14',
    endDate: '2019-8-25',
    matches: [

    ]
  }
];

export const sportsEvents = {
  basketball: basketballEvents,
  tennis: tennisEvents,
  football: footballEvents,
};

export const eSportsEvents = {
  dota: dotaEvents,
  league: lolEvents,
  csgo: csgoEvents,
  overwatch: overwatchEvents
};
