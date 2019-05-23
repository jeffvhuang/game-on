import { dotaActions as A } from './action-types';
import axios from 'axios';

import { gameonAPI, youtubeAPI } from '../../../helpers/constants';
import { sleep, sortESportsSchedule } from '../../../helpers/utils';

// Temporary seed data
import TOURNAMENTS from '../../../mockApiData/dotaTournaments.json';
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
export const getDotaTournamentsSuccess = (payload, schedule) => ({ type: A.GET_DOTA_TOURNAMENTS_SUCCESS, payload });
export const getDotaTournamentsFailure = (err) => ({ type: A.GET_DOTA_TOURNAMENTS_FAILURE, err });

// export const getDotaTournaments = () => {
//   return (dispatch) => {
//     dispatch(getDotaTournamentsRequest());
//     return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.dota + gameonAPI.TOURNAMENTS)
//       .then(response => {
//         dispatch(getDotaTournamentsSuccess(response.data.tournaments));
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
    const today = new Date();
    const thisYear = today.getFullYear();

    // const tournaments = TOURNAMENTS.tournaments.filter(t => 
    //   ((t.type == 'singles' && t.category.level) || t.type == 'mixed') &&
    //   t.currentSeason.year == thisYear);

    const sortedSchedule = sortESportsSchedule(TOURNAMENTS.tournaments);

    return dispatch(getDotaTournamentsSuccess(sortedSchedule, TOURNAMENTS.tournaments));
  };
};

// Get Teams
export const getDotaTeamsRequest = () => ({ type: A.GET_DOTA_TEAMS_REQUEST });
export const getDotaTeamsSuccess = (payload) => ({ type: A.GET_DOTA_TEAMS_SUCCESS, payload });
export const getDotaTeamsFailure = (err) => ({ type: A.GET_DOTA_TEAMS_FAILURE, err });

export const getDotaTeams = () => {
  return (dispatch) => {
    dispatch(getDotaTeamsRequest());
    return axios.get(gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.dota + gameonAPI.TEAMS)
      .then(response => {
        dispatch(getDotaTeamsSuccess(response.data));
      })
      .catch(err => {
        dispatch(getDotaTeamsFailure(err));
        throw(err);
      });
  };
};
