// List of events in each sport
export const sportsEvents = {
  basketball: basketballEvents,
  tennis: tennisEvents,
  football: footballEvents,
};

export const eSportsEvents = {
  dota: dotaEvents,
  league: lolEvents,
  csgo: csgoEvents,
};

const basketballEvents =  [
  {
    name: "NBA",
    startDate: "16 Oct",
    endDate: "10 Apr",
    matches: [
      {
        date: "2 Feb",
        home: "Miami Heat",
        away: "Oklahoma City Thunder",
        winner: "Thunder",
        score: "102 - 118"
      },
      {
        date: "2 Feb",
        home: "Nuggets",
        away: "Rockets",
        winner: "Nuggets",
        score: "136 - 122"
      }
    ]
  }
];

const tennisEvents =  [
  {
    name: "Australian Open",
    startDate: "7 Jan",
    endDate: "27 Jan",
    matches: [
      {
        date: "26 Jan",
        player1: "Osaka",
        player2: "Kvitova",
        winner: "Osaka",
        score: "7-6, 5-7, 6-4"
      },
      {
        date: "27 Jan",
        player1: "Djokovic",
        player2: "Nadal",
        winner: "Djokovic",
        score: "6-3, 6-2, 6-3"
      }
    ]
  },
  {
    name: "French Open",
    startDate: "20 May",
    endDate: "9 Jun",
    matches: [

    ]
  }
];

const footballEvents =  [
  {
    name: "English Premier League",
    startDate: "11 Aug 2018",
    endDate: "9 May 2019",
    matches: [
      {
        date: "2 Feb",
        home: "Tottenham Spurs",
        away: "Newcastle",
        winner: "Tottenham Spurs",
        score: "1 - 0"
      },
      {
        date: "2 Feb",
        home: "Chelsea",
        away: "Huddersfield",
        winner: "",
        score: ""
      }
    ]
  },
  {
    name: "UEFA Champions League",
    startDate: "26 Jun 2018",
    endDate: "1 Jun 2019",
    matches: [
      {
        date: "12 Feb 2019",
        home: "Man Utd",
        away: "PSG",
        winner: "",
        score: ""
      },
      {
        date: "12 Feb 2019",
        home: "Liverpool",
        away: "Bayern",
        winner: "",
        score: ""
      }
    ]
  }
];

const dotaEvents =  [
  {
    name: "Chongqing Major",
    startDate: "19 Jan 2019",
    endDate: "27 Jan 2019",
    matches: [
      {
        date: "27 Jan",
        team1: "Virtus.pro",
        team2: "Secret",
        winner: "Secret",
        score: "1 - 3"
      },
      {
        date: "27 Jan",
        team1: "Secret",
        team2: "Evil Geniuses",
        winner: "Secret",
        score: "2 -0"
      }
    ]
  }
];

const lolEvents =  [
  {
    name: "League of Legends World Championship",
    startDate: "1 Oct 2018",
    endDate: "3 Nov 2018",
    matches: [
      {
        date: "3 Nov",
        team1: "Invictus Gaming",
        team2: "Fnatic",
        winner: "Invictus Gaming",
        score: "3 - 0"
      }
    ]
  }
];

const csgoEvents =  [
  {
    name: "BLAST Pro Series: Miami 2019",
    startDate: "12 Apr 2019",
    endDate: "13 Apr 2019",
    matches: [

    ]
  }
];
