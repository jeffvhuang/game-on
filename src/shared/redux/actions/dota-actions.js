import { dotaActions as A } from './action-types';
import axios from 'axios';

import { gameonAPI, youtubeAPI } from '../../../helpers/constants';
import { sleep, sortESportsMatches } from '../../../helpers/utils';

// Temporary seed data
import TOURNAMENTS from '../../../mockApiData/dotaTournaments.json';
import SERIES from '../../../mockApiData/dotaSeries.json';
import MATCHES from '../../../mockApiData/dotaMatches.json';
// import TEAMS from '../../../mockApiData/dotaTeams.json';
import { PLAYLIST } from '../../../mockApiData/dotaYoutube';

// Get highlights from youtube
export const getDotaVideosRequest = () => ({ type: A.GET_DOTA_VIDEOS_REQUEST });
export const getDotaVideosSuccess = (payload) => ({ type: A.GET_DOTA_VIDEOS_SUCCESS, payload });
export const getDotaVideosFailure = (err) => ({ type: A.GET_DOTA_VIDEOS_FAILURE, err });

// export const getDotaVideos = () => {
//   return (dispatch) => {
//     dispatch(getDotaVideosRequest());
//     return axios.get(youtubeAPI.HOST + youtubeAPI.PLAYLIST_ITEMS, {
//       params: {
//         'part': 'snippet',
//         'playlistId': youtubeAPI.DOTA_ID,
//         'maxResults': '25',
//         'key': youtubeAPI.KEY
//       }
//     }).then(response => {
//       dispatch(getDotaVideosSuccess(response.data.items));
//     }).catch(err => {
//       dispatch(getDotaVideosFailure(err));
//       throw(err);
//     });
//   };
// };

// mock data
export const getDotaVideos = () => {
  return async (dispatch) => {
    dispatch(getDotaVideosRequest());
    await sleep(1000);
    return dispatch(getDotaVideosSuccess(PLAYLIST.items));
  };
};

// Data API
// Get Tournaments
export const getDotaTournamentsRequest = () => ({ type: A.GET_DOTA_TOURNAMENTS_REQUEST });
export const getDotaTournamentsSuccess = (payload) => ({ type: A.GET_DOTA_TOURNAMENTS_SUCCESS, payload });
export const getDotaTournamentsFailure = (err) => ({ type: A.GET_DOTA_TOURNAMENTS_FAILURE, err });

// export const getDotaTournaments = () => {
//   return (dispatch) => {
//     dispatch(getDotaTournamentsRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.DOTA + gameonAPI.TOURNAMENTS)
//       .then(response => {
//         const sortedSchedule = sortESportsSchedule(response.data);
//         dispatch(getDotaTournamentsSuccess(sortedSchedule, response.data));
//         return response.data
//       })
//       .catch(err => {
//         dispatch(getDotaTournamentsFailure(err));
//         throw(err);
//       });
//   };
// };

// This uses mock data to reduce requests to api
export const getDotaTournaments = () => {
  return async (dispatch) => {
    dispatch(getDotaTournamentsRequest());
    await sleep(1000);
    dispatch(getDotaTournamentsSuccess(TOURNAMENTS));
    return TOURNAMENTS;
  };
};

// Get Series
export const getDotaSeriesRequest = () => ({ type: A.GET_DOTA_SERIES_REQUEST });
export const getDotaSeriesSuccess = (payload) => ({ type: A.GET_DOTA_SERIES_SUCCESS, payload });
export const getDotaSeriesFailure = (err) => ({ type: A.GET_DOTA_SERIES_FAILURE, err });

// export const getDotaSeries = () => {
//   return (dispatch) => {
//     dispatch(getDotaSeriesRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.DOTA + gameonAPI.SERIES)
//       .then(response => {
//         dispatch(getDotaSeriesSuccess(response.data));
//       })
//       .catch(err => {
//         dispatch(getDotaSeriesFailure(err));
//         throw(err);
//       });
//   };
// };

export const getDotaSeries = () => {
  return async (dispatch) => {
    dispatch(getDotaSeriesRequest());
    await sleep(1000);
    return dispatch(getDotaSeriesSuccess(SERIES));
  };
};

// Get Matches
export const getDotaMatchesRequest = () => ({ type: A.GET_DOTA_MATCHES_REQUEST });
export const getDotaMatchesSuccess = (payload, matches) => ({ type: A.GET_DOTA_MATCHES_SUCCESS, payload, matches });
export const getDotaMatchesFailure = (err) => ({ type: A.GET_DOTA_MATCHES_FAILURE, err });

// export const getDotaMatches = () => {
//   return (dispatch) => {
//     dispatch(getDotaMatchesRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.DOTA + gameonAPI.MATCHES)
//       .then(response => {
//         const sortedSchedule = sortESportsSchedule(response.data);
//         dispatch(getDotaMatchesSuccess(sortedSchedule, response.data));
//       })
//       .catch(err => {
//         dispatch(getDotaMatchesFailure(err));
//         throw(err);
//       });
//   };
// };

export const getDotaMatches = () => {
  return async (dispatch) => {
    dispatch(getDotaMatchesRequest());
    await sleep(1000);
    const sortedSchedule = sortESportsMatches(MATCHES);
    dispatch(getDotaMatchesSuccess(sortedSchedule, MATCHES));
    return MATCHES;
  };
};

// Get Teams
export const getDotaTeamsRequest = () => ({ type: A.GET_DOTA_TEAMS_REQUEST });
export const getDotaTeamsSuccess = (payload) => ({ type: A.GET_DOTA_TEAMS_SUCCESS, payload });
export const getDotaTeamsFailure = (err) => ({ type: A.GET_DOTA_TEAMS_FAILURE, err });

// export const getDotaTeams = () => {
//   return (dispatch) => {
//     dispatch(getDotaTeamsRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.DOTA + gameonAPI.TEAMS)
//       .then(response => {
//         dispatch(getDotaTeamsSuccess(response.data));
//       })
//       .catch(err => {
//         dispatch(getDotaTeamsFailure(err));
//         throw(err);
//       });
//   };
// };

export const getDotaTeams = () => {
  return async (dispatch) => {
    dispatch(getDotaTeamsRequest());
    await sleep(1000);
    return dispatch(getDotaTeamsSuccess([]));
  };
};
