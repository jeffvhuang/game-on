import axios from 'axios';

import * as T from './lol-types';
import * as C from './lol-constants';
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
export function getLolTournamentsRequest(): T.GetLolTournamentsRequest {
  return { type: C.GET_LOL_TOURNAMENTS_REQUEST }
}
export function getLolTournamentsSuccess(payload, sortedTournaments): T.GetLolTournamentsSuccess {
  return { type:
    C.GET_LOL_TOURNAMENTS_SUCCESS,
    payload,
    sortedTournaments
  }
}
export function getLolTournamentsFailure(err): T.GetLolTournamentsFailure {
  return { type: C.GET_LOL_TOURNAMENTS_FAILURE, err }
}

// export function getLolTournaments() {
//   return async function (dispatch) {
//     dispatch(getLolTournamentsRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.LOL + gameonAPI.TOURNAMENTS)
//       .then(response {
//         const sortedSchedule = sortESportsTournaments(response.data);
//         dispatch(getLolTournamentsSuccess(response.data, sortedTournaments));
//         return response.data
//       })
//       .catch(err {
//         dispatch(getLolTournamentsFailure(err));
//         throw(err);
//       });
//   };
// };

// This uses mock data to reduce requests to api
export function getLolTournaments() {
  return async function (dispatch) {
    dispatch(getLolTournamentsRequest());
    await sleep(1000);
    const sortedTournaments = sortESportsTournaments(TOURNAMENTS);
    dispatch(getLolTournamentsSuccess(TOURNAMENTS, sortedTournaments));
    return TOURNAMENTS;
  };
};

// Get Series
// export function getLolSeriesRequest(): T.GetLolSeriesRequest {
//   return { type: C.GET_LOL_SERIES_REQUEST }
// }
// export function getLolSeriesSuccess(payload, sortedSeries): T.GetLolSeriesSuccess {
//   return { type:
//     C.GET_LOL_SERIES_SUCCESS,
//     payload,
//     sortedSeries
//   }
// }
// export function getLolSeriesFailure(err): T.GetLolSeriesFailure {
//   return { type: C.GET_LOL_SERIES_FAILURE, err }
// }

// export function getLolSeries() {
//   return async function (dispatch) {
//     dispatch(getLolSeriesRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.LOL + gameonAPI.SERIES)
//       .then(response {
//         dispatch(getLolSeriesSuccess(response.data));
//       })
//       .catch(err {
//         dispatch(getLolSeriesFailure(err));
//         throw(err);
//       });
//   };
// };

// export function getLolSeries() {
//   return async function (dispatch) {
//     dispatch(getLolSeriesRequest());
//     await sleep(1000);
//     const sortedSeries = sortESportsSeries(SERIES);
//     return dispatch(getLolSeriesSuccess(SERIES, sortedSeries));
//   };
// };

// Get Matches
export function getLolMatchesRequest(): T.GetLolMatchesRequest {
  return { type: C.GET_LOL_MATCHES_REQUEST }
}
export function getLolMatchesSuccess(payload, matchesTeams): T.GetLolMatchesSuccess {
  return { type:
    C.GET_LOL_MATCHES_SUCCESS,
    payload,
    matchesTeams
  }
}
export function getLolMatchesFailure(err): T.GetLolMatchesFailure {
  return { type: C.GET_LOL_MATCHES_FAILURE, err }
}

// export function getLolMatches() {
//   return async function (dispatch) {
//     dispatch(getLolMatchesRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.LOL + gameonAPI.MATCHES)
//       .then(response {
//         dispatch(getLolMatchesSuccess(sortESportByDate(response.data)));
//       })
//       .catch(err {
//         dispatch(getLolMatchesFailure(err));
//         throw(err);
//       });
//   };
// };

export function getLolMatches() {
  return async function (dispatch) {
    dispatch(getLolMatchesRequest());
    await sleep(1000);
    const matchesTeams = getESportsTeamsFromMatches(MATCHES);
    dispatch(getLolMatchesSuccess(sortESportByDate(MATCHES), matchesTeams));
    return MATCHES;
  };
};

// Get A Tournament's Matches
export function getLolTournamentMatchesRequest(): T.GetLolTournamentMatchesRequest {
  return { type: C.GET_LOL_TOURNAMENT_MATCHES_REQUEST }
}
export function getLolTournamentMatchesSuccess(payload): T.GetLolTournamentMatchesSuccess {
  return { type: C.GET_LOL_TOURNAMENT_MATCHES_SUCCESS, payload }
}
export function getLolTournamentMatchesFailure(err): T.GetLolTournamentMatchesFailure {
  return { type: C.GET_LOL_TOURNAMENT_MATCHES_FAILURE, err }
}
export function clearLolTournamentMatchesSuccess(): T.ClearLolTournamentMatchesSuccess {
  return { type: C.CLEAR_LOL_TOURNAMENT_MATCHES }
}

// export function getLolTournamentMatches(tournamentId) {
//   return async function (dispatch) {
//     dispatch(getLolTournamentMatchesRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.LOL + gameonAPI.MATCHES, {
//       params: { 'tournamentId': tournamentId }
//     }).then(response {
//       dispatch(getLolTournamentMatchesSuccess(response.data));
//     }).catch(err {
//       dispatch(getLolTournamentMatchesFailure(err));
//       throw (err);
//     });
//   };
// };

export function getLolTournamentMatches(tournamentId) {
  return async function (dispatch) {
    dispatch(getLolTournamentMatchesRequest());
    await sleep(1000);
    dispatch(getLolTournamentMatchesSuccess(TOURNAMENT_MATCHES));
  };
};

export function clearLolTournamentMatches() {
  return function (dispatch) {
    dispatch(clearLolTournamentMatchesSuccess());
  }
};

// Get Teams
export function getLolTeamsRequest(): T.GetLolTeamsRequest {
  return { type: C.GET_LOL_TEAMS_REQUEST }
}
export function getLolTeamsSuccess(payload): T.GetLolTeamsSuccess {
  return { type: C.GET_LOL_TEAMS_SUCCESS, payload }
}
export function getLolTeamsFailure(err): T.GetLolTeamsFailure {
  return { type: C.GET_LOL_TEAMS_FAILURE, err }
}

// export function getLolTeams() {
//   return async function (dispatch) {
//     dispatch(getLolTeamsRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.LOL + gameonAPI.TEAMS)
//       .then(response {
//         dispatch(getLolTeamsSuccess(response.data));
//       })
//       .catch(err {
//         dispatch(getLolTeamsFailure(err));
//         throw(err);
//       });
//   };
// };

export function getLolTeams() {
  return async function (dispatch) {
    dispatch(getLolTeamsRequest());
    await sleep(1000);
    return dispatch(getLolTeamsSuccess([]));
  };
};


// Get highlights from youtube
export function getLolVideosRequest(): T.GetLolVideosRequest {
  return { type: C.GET_LOL_VIDEOS_REQUEST }
}
export function getLolVideosSuccess(payload): T.GetLolVideosSuccess {
  return { type: C.GET_LOL_VIDEOS_SUCCESS, payload }
}
export function getLolVideosFailure(err): T.GetLolVideosFailure {
  return { type: C.GET_LOL_VIDEOS_FAILURE, err }
}

// export function getLolVideos() {
//   return async function (dispatch) {
//     dispatch(getLolVideosRequest());
//     return axios.get(youtubeAPI.HOST + youtubeAPI.PLAYLIST_ITEMS, {
//       params: {
//         'part': 'snippet',
//         'playlistId': youtubeAPI.LOL_ID,
//         'maxResults': '25',
//         'key': youtubeAPI.KEY
//       }
//     }).then(response {
//       dispatch(getLolVideosSuccess(response.data.items));
//     }).catch(err {
//       dispatch(getLolVideosFailure(err));
//       throw(err);
//     });
//   };
// };

// mock data
export function getLolVideos() {
  return async function (dispatch) {
    dispatch(getLolVideosRequest());
    await sleep(1000);
    return dispatch(getLolVideosSuccess(PLAYLIST.items));
  };
};
