import { lolActions as A } from './action-types';
import axios from 'axios';

import { gameonAPI, youtubeAPI } from '../../../helpers/constants';
import { sleep, sortESportsTournaments } from '../../../helpers/utils';

// Temporary seed data
import TOURNAMENTS from '../../../mockApiData/lolTournaments.json';
import TOURNAMENT_MATCHES from '../../../mockApiData/lolTournamentMatches.json';
// import { PLAYLIST } from '../../../mockApiData/lolYoutube';

// Get highlights from youtube
export const getLolVideosRequest = () => ({ type: A.GET_LOL_VIDEOS_REQUEST });
export const getLolVideosSuccess = (payload) => ({ type: A.GET_LOL_VIDEOS_SUCCESS, payload });
export const getLolVideosFailure = (err) => ({ type: A.GET_LOL_VIDEOS_FAILURE, err });

// export const getLolVideos = () => {
//   return (dispatch) => {
//     dispatch(getLolVideosRequest());
//     return axios.get(youtubeAPI.HOST + youtubeAPI.PLAYLIST_ITEMS, {
//       params: {
//         'part': 'snippet',
//         'playlistId': youtubeAPI.LOL_ID,
//         'maxResults': '25',
//         'key': youtubeAPI.KEY
//       }
//     }).then(response => {
//       dispatch(getLolVideosSuccess(response.data.items));
//     }).catch(err => {
//       dispatch(getLolVideosFailure(err));
//       throw(err);
//     });
//   };
// };

// mock data
// export const getLolVideos = () => {
//   return async (dispatch) => {
//     dispatch(getLolVideosRequest());
//     await sleep(1000);
//     return dispatch(getLolVideosSuccess(PLAYLIST.items));
//   };
// };

// Data API
// Get Tournaments
export const getLolTournamentsRequest = () => ({ type: A.GET_LOL_TOURNAMENTS_REQUEST });
export const getLolTournamentsSuccess = (payload, sortedTournaments) => ({ type: A.GET_LOL_TOURNAMENTS_SUCCESS, payload, sortedTournaments });
export const getLolTournamentsFailure = (err) => ({ type: A.GET_LOL_TOURNAMENTS_FAILURE, err });

// export const getLolTournaments = () => {
//   return (dispatch) => {
//     dispatch(getLolTournamentsRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.LOL + gameonAPI.TOURNAMENTS)
//       .then(response => {
//         const sortedTournaments = sortESportsTournaments(response.data);
//         dispatch(getLolTournamentsSuccess(response.data, sortedTournaments));
//       })
//       .catch(err => {
//         dispatch(getLolTournamentsFailure(err));
//         throw(err);
//       });
//   };
// };

// This uses mock data to reduce requests to api
export const getLolTournaments = () => {
  return (dispatch) => {
    dispatch(getLolTournamentsRequest());
    const sortedTournaments = sortESportsTournaments(TOURNAMENTS);
    return dispatch(getLolTournamentsSuccess(TOURNAMENTS, sortedTournaments));
  };
};

// Get A Tournament's Matches
export const getLolTournamentMatchesRequest = () => ({ type: A.GET_LOL_TOURNAMENT_MATCHES_REQUEST });
export const getLolTournamentMatchesSuccess = (payload) => ({ type: A.GET_LOL_TOURNAMENT_MATCHES_SUCCESS, payload });
export const getLolTournamentMatchesFailure = (err) => ({ type: A.GET_LOL_TOURNAMENT_MATCHES_FAILURE, err });
export const clearLolTournamentMatchesSuccess = () => ({ type: A.CLEAR_LOL_TOURNAMENT_MATCHES });

// export const getLolTournamentMatches = (tournamentId) => {
//   return async (dispatch) => {
//     dispatch(getLolTournamentMatchesRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.DOTA + gameonAPI.MATCHES, {
//       params: { 'tournamentId': tournamentId }
//     }).then(response => {
//       dispatch(getLolTournamentMatchesSuccess(response.data));
//     }).catch(err => {
//       dispatch(getLolTournamentMatchesFailure(err));
//       throw (err);
//     });
//   };
// };

export const getLolTournamentMatches = (tournamentId) => {
  return async (dispatch) => {
    dispatch(getLolTournamentMatchesRequest());
    await sleep(1000);
    dispatch(getLolTournamentMatchesSuccess(TOURNAMENT_MATCHES));
  };
};

export const clearLolTournamentMatches = () => {
  return (dispatch) => dispatch(clearLolTournamentMatchesSuccess());
};

// Get Teams
export const getLolTeamsRequest = () => ({ type: A.GET_LOL_TEAMS_REQUEST });
export const getLolTeamsSuccess = (payload) => ({ type: A.GET_LOL_TEAMS_SUCCESS, payload });
export const getLolTeamsFailure = (err) => ({ type: A.GET_LOL_TEAMS_FAILURE, err });

export const getLolTeams = () => {
  return (dispatch) => {
    dispatch(getLolTeamsRequest());
    return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.LOL + gameonAPI.TEAMS)
      .then(response => {
        dispatch(getLolTeamsSuccess(response.data));
      })
      .catch(err => {
        dispatch(getLolTeamsFailure(err));
        throw(err);
      });
  };
};
