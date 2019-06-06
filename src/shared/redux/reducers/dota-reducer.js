import { dotaActions as A } from '../actions/action-types';
import { createYoutubeThumnailObjects } from '../../../helpers/utils';

const initialState = {
  isFetching: false,
  data: [],
  series: [],
  ongoingSeries: [],
  upcomingSeries: [],
  completedSeries: [],
  tournaments: [],
  ongoing: [],
  upcoming: [],
  completed: [],
  matches: [],
  tournamentMatches: [],
  teams: [],
  matchesTeams: [],
  videos: [],
  thumbnails: []
};

function dotaReducer(state = initialState, action) {
  switch(action.type) {
    case A.GET_DOTA_TOURNAMENTS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_DOTA_TOURNAMENTS_SUCCESS:
      return Object.assign({}, state,
        { 
          isFetching: false,
          tournaments: action.payload,
          ongoing: action.sortedTournaments.ongoing,
          upcoming: action.sortedTournaments.upcoming,
          completed: action.sortedTournaments.completed,
          teams: action.sortedTournaments.teams
        });    
    case A.GET_DOTA_TOURNAMENTS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
  
    case A.GET_DOTA_SERIES_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_DOTA_SERIES_SUCCESS:
      return Object.assign({}, state,
        { 
          isFetching: false,
          series: action.payload,
          ongoingSeries: action.sortedSeries.ongoingSeries,
          upcomingSeries: action.sortedSeries.upcomingSeries,
          completedSeries: action.sortedSeries.completedSeries
        });
    case A.GET_DOTA_SERIES_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    
    case A.GET_DOTA_MATCHES_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_DOTA_MATCHES_SUCCESS:
      return Object.assign({}, state, { isFetching: false, matches: action.payload, matchesTeams: action.matchesTeams });
    case A.GET_DOTA_MATCHES_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });

    case A.GET_DOTA_TOURNAMENT_MATCHES_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_DOTA_TOURNAMENT_MATCHES_SUCCESS:
      return Object.assign({}, state, { isFetching: false, tournamentMatches: action.payload });
    case A.GET_DOTA_TOURNAMENT_MATCHES_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    case A.CLEAR_DOTA_TOURNAMENT_MATCHES:
      return Object.assign({}, state, { tournamentMatches: [] });
    
    case A.GET_DOTA_TEAMS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_DOTA_TEAMS_SUCCESS:
      return Object.assign({}, state, { isFetching: false, teams: action.payload });
    case A.GET_DOTA_TEAMS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });
    
    case A.GET_DOTA_VIDEOS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case A.GET_DOTA_VIDEOS_SUCCESS:
      return Object.assign({}, state, { 
        isFetching: false,
        videos: action.payload,
        thumbnails: createYoutubeThumnailObjects(action.payload) });
    case A.GET_DOTA_VIDEOS_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: action.err });


    default:
      return state;
  }
}

export default dotaReducer;
