import axios from 'axios';

import * as T from './dota-types';
import * as C from './dota-constants';
import { gameonAPI, youtubeAPI } from '../../../helpers/constants';
import { sleep, 
  sortESportsTournaments, 
  sortESportByDate,
  getESportsTeamsFromMatches,
  sortESportsSeries } from '../../../helpers/utils';

// Temporary seed data
import TOURNAMENTS from '../../../mockApiData/dotaTournaments.json';
import SERIES from '../../../mockApiData/dotaSeries.json';
import MATCHES from '../../../mockApiData/dotaMatches.json';
import TOURNAMENT_MATCHES from '../../../mockApiData/dotaTournamentMatches.json';
// import TEAMS from '../../../mockApiData/dotaTeams.json';
import { PLAYLIST } from '../../../mockApiData/dotaYoutube';


// Data API
// Get Tournaments
export function getDotaTournamentsRequest(): T.GetDotaTournamentsRequest {
  return { type: C.GET_DOTA_TOURNAMENTS_REQUEST }
}
export function getDotaTournamentsSuccess(payload, sortedTournaments): T.GetDotaTournamentsSuccess {
  return { type:
    C.GET_DOTA_TOURNAMENTS_SUCCESS,
    payload,
    sortedTournaments
  }
}
export function getDotaTournamentsFailure(err): T.GetDotaTournamentsFailure {
  return { type: C.GET_DOTA_TOURNAMENTS_FAILURE, err }
}

// export function getDotaTournaments() {
//   return async function (dispatch) {
//     dispatch(getDotaTournamentsRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.DOTA + gameonAPI.TOURNAMENTS)
//       .then(response {
//         const sortedSchedule = sortESportsTournaments(response.data);
//         dispatch(getDotaTournamentsSuccess(response.data, sortedTournaments));
//         return response.data
//       })
//       .catch(err {
//         dispatch(getDotaTournamentsFailure(err));
//         throw(err);
//       });
//   };
// };

// This uses mock data to reduce requests to api
export function getDotaTournaments() {
  return async function (dispatch) {
    dispatch(getDotaTournamentsRequest());
    await sleep(1000);
    const sortedTournaments = sortESportsTournaments(TOURNAMENTS);
    dispatch(getDotaTournamentsSuccess(TOURNAMENTS, sortedTournaments));
    return TOURNAMENTS;
  };
};

// Get Series
export function getDotaSeriesRequest(): T.GetDotaSeriesRequest {
  return { type: C.GET_DOTA_SERIES_REQUEST }
}
export function getDotaSeriesSuccess(payload, sortedSeries): T.GetDotaSeriesSuccess {
  return { type:
    C.GET_DOTA_SERIES_SUCCESS,
    payload,
    sortedSeries
  }
}
export function getDotaSeriesFailure(err): T.GetDotaSeriesFailure {
  return { type: C.GET_DOTA_SERIES_FAILURE, err }
}

// export function getDotaSeries() {
//   return async function (dispatch) {
//     dispatch(getDotaSeriesRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.DOTA + gameonAPI.SERIES)
//       .then(response {
//         dispatch(getDotaSeriesSuccess(response.data));
//       })
//       .catch(err {
//         dispatch(getDotaSeriesFailure(err));
//         throw(err);
//       });
//   };
// };

export function getDotaSeries() {
  return async function (dispatch) {
    dispatch(getDotaSeriesRequest());
    await sleep(1000);
    const sortedSeries = sortESportsSeries(SERIES);
    return dispatch(getDotaSeriesSuccess(SERIES, sortedSeries));
  };
};

// Get Matches
export function getDotaMatchesRequest(): T.GetDotaMatchesRequest {
  return { type: C.GET_DOTA_MATCHES_REQUEST }
}
export function getDotaMatchesSuccess(payload, matchesTeams): T.GetDotaMatchesSuccess {
  return { type:
    C.GET_DOTA_MATCHES_SUCCESS,
    payload,
    matchesTeams
  }
}
export function getDotaMatchesFailure(err): T.GetDotaMatchesFailure {
  return { type: C.GET_DOTA_MATCHES_FAILURE, err }
}

// export function getDotaMatches() {
//   return async function (dispatch) {
//     dispatch(getDotaMatchesRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.DOTA + gameonAPI.MATCHES)
//       .then(response {
//         dispatch(getDotaMatchesSuccess(sortESportByDate(response.data)));
//       })
//       .catch(err {
//         dispatch(getDotaMatchesFailure(err));
//         throw(err);
//       });
//   };
// };

export function getDotaMatches() {
  return async function (dispatch) {
    dispatch(getDotaMatchesRequest());
    await sleep(1000);
    const matchesTeams = getESportsTeamsFromMatches(MATCHES);
    dispatch(getDotaMatchesSuccess(sortESportByDate(MATCHES), matchesTeams));
    return MATCHES;
  };
};

// Get A Tournament's Matches
export function getDotaTournamentMatchesRequest(): T.GetDotaTournamentMatchesRequest {
  return { type: C.GET_DOTA_TOURNAMENT_MATCHES_REQUEST }
}
export function getDotaTournamentMatchesSuccess(payload): T.GetDotaTournamentMatchesSuccess {
  return { type: C.GET_DOTA_TOURNAMENT_MATCHES_SUCCESS, payload }
}
export function getDotaTournamentMatchesFailure(err): T.GetDotaTournamentMatchesFailure {
  return { type: C.GET_DOTA_TOURNAMENT_MATCHES_FAILURE, err }
}
export function clearDotaTournamentMatchesSuccess(): T.ClearDotaTournamentMatchesSuccess {
  return { type: C.CLEAR_DOTA_TOURNAMENT_MATCHES }
}

// export function getDotaTournamentMatches(tournamentId) {
//   return async function (dispatch) {
//     dispatch(getDotaTournamentMatchesRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.DOTA + gameonAPI.MATCHES, {
//       params: { 'tournamentId': tournamentId }
//     }).then(response {
//       dispatch(getDotaTournamentMatchesSuccess(response.data));
//     }).catch(err {
//       dispatch(getDotaTournamentMatchesFailure(err));
//       throw (err);
//     });
//   };
// };

export function getDotaTournamentMatches(tournamentId) {
  return async function (dispatch) {
    dispatch(getDotaTournamentMatchesRequest());
    await sleep(1000);
    dispatch(getDotaTournamentMatchesSuccess(TOURNAMENT_MATCHES));
  };
};

export function clearDotaTournamentMatches() {
  return function (dispatch) {
    dispatch(clearDotaTournamentMatchesSuccess());
  }
};

// Get Teams
export function getDotaTeamsRequest(): T.GetDotaTeamsRequest {
  return { type: C.GET_DOTA_TEAMS_REQUEST }
}
export function getDotaTeamsSuccess(payload): T.GetDotaTeamsSuccess {
  return { type: C.GET_DOTA_TEAMS_SUCCESS, payload }
}
export function getDotaTeamsFailure(err): T.GetDotaTeamsFailure {
  return { type: C.GET_DOTA_TEAMS_FAILURE, err }
}

// export function getDotaTeams() {
//   return async function (dispatch) {
//     dispatch(getDotaTeamsRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.DOTA + gameonAPI.TEAMS)
//       .then(response {
//         dispatch(getDotaTeamsSuccess(response.data));
//       })
//       .catch(err {
//         dispatch(getDotaTeamsFailure(err));
//         throw(err);
//       });
//   };
// };

export function getDotaTeams() {
  return async function (dispatch) {
    dispatch(getDotaTeamsRequest());
    await sleep(1000);
    return dispatch(getDotaTeamsSuccess([]));
  };
};


// Get highlights from youtube
export function getDotaVideosRequest(): T.GetDotaVideosRequest {
  return { type: C.GET_DOTA_VIDEOS_REQUEST }
}
export function getDotaVideosSuccess(payload): T.GetDotaVideosSuccess {
  return { type: C.GET_DOTA_VIDEOS_SUCCESS, payload }
}
export function getDotaVideosFailure(err): T.GetDotaVideosFailure {
  return { type: C.GET_DOTA_VIDEOS_FAILURE, err }
}

// export function getDotaVideos() {
//   return async function (dispatch) {
//     dispatch(getDotaVideosRequest());
//     return axios.get(youtubeAPI.HOST + youtubeAPI.PLAYLIST_ITEMS, {
//       params: {
//         'part': 'snippet',
//         'playlistId': youtubeAPI.DOTA_ID,
//         'maxResults': '25',
//         'key': youtubeAPI.KEY
//       }
//     }).then(response {
//       dispatch(getDotaVideosSuccess(response.data.items));
//     }).catch(err {
//       dispatch(getDotaVideosFailure(err));
//       throw(err);
//     });
//   };
// };

// mock data
export function getDotaVideos() {
  return async function (dispatch) {
    dispatch(getDotaVideosRequest());
    await sleep(1000);
    return dispatch(getDotaVideosSuccess(PLAYLIST.items));
  };
};