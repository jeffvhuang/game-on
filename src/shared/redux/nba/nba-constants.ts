import { NbaGameDetails } from "../../../types/nba-api/nba-game-details.model";

export const GET_NBA_SCHEDULE_REQUEST = 'GET_NBA_SCHEDULE_REQUEST';
export const GET_NBA_SCHEDULE_SUCCESS = 'GET_NBA_SCHEDULE_SUCCESS';
export const GET_NBA_SCHEDULE_FAILURE = 'GET_NBA_SCHEDULE_FAILURE';

export const GET_NBA_GAME_DETAILS_REQUEST = 'GET_NBA_GAME_DETAILS_REQUEST';
export const GET_NBA_GAME_DETAILS_SUCCESS = 'GET_NBA_GAME_DETAILS_SUCCESS';
export const GET_NBA_GAME_DETAILS_FAILURE = 'GET_NBA_GAME_DETAILS_FAILURE';

export const GET_NBA_TEAMS_REQUEST = 'GET_NBA_TEAMS_REQUEST';
export const GET_NBA_TEAMS_SUCCESS = 'GET_NBA_TEAMS_SUCCESS';
export const GET_NBA_TEAMS_FAILURE = 'GET_NBA_TEAMS_FAILURE';

export const GET_NBA_VIDEOS_REQUEST = 'GET_NBA_VIDEOS_REQUEST';
export const GET_NBA_VIDEOS_SUCCESS = 'GET_NBA_VIDEOS_SUCCESS';
export const GET_NBA_VIDEOS_FAILURE = 'GET_NBA_VIDEOS_FAILURE';

// object for initial state
export const initialGameDetails: NbaGameDetails = {
  vTeam: {
    allStar: "",
    nbaFranchise: "",
    score: {
        win: "",
        loss: "",
        seriesWin: "",
        seriesLoss: "",
        lineScore: [''],
        points: ""
    },
    leaders: [
        {
            playerId: "",
            name: "",
            stat: "",
            value: ""
        }
    ],
    fullName: "",
    teamId: "",
    nickName: "",
    logo: "",
    shortName: ""
},
  hTeam: {
      allStar: "",
      nbaFranchise: "",
      score: {
          win: "",
          loss: "",
          seriesWin: "",
          seriesLoss: "",
          lineScore: [],
          points: ""
      },
      leaders: [
          {
              playerId: "",
              name: "",
              stat: "",
              value: ""
          }
      ],
      fullName: "",
      teamId: "",
      nickName: "",
      logo: "",
      shortName: ""
  },
  officials: [{"name": "" }],
  seasonYear: "",
  league: "",
  gameId: "",
  startTimeUTC: "",
  endTimeUTC: "",
  arena: "",
  city: "",
  country: "",
  clock: "",
  gameDuration: "",
  currentPeriod: "",
  halftime: "",
  endOfPeriod: "",
  seasonStage: "",
  statusShortGame: "",
  statusGame: ""
}
