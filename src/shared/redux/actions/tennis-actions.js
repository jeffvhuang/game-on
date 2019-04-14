import axios from 'axios';

import { tennisActions as A } from './action-types';
import { youtubeAPI, tennisAPI } from '../../../helpers/constants';
import { sleep, sortTennisSchedule } from '../../../helpers/utils';

// Mock data
import { SCHEDULE, MONTE_CARLO_SCHEDULE, TOURNAMENT_INFO } from '../../../mockApiData/tennisData';
// import { PLAYLIST } from '../../../mockApiData/TennisYoutube';


// Get video from youtube playlist of Tennis highlights
export const getTennisVideosRequest = () => ({ type: A.GET_TENNIS_VIDEOS_REQUEST });
export const getTennisVideosSuccess = (payload) => ({ type: A.GET_TENNIS_VIDEOS_SUCCESS, payload });
export const getTennisVideosFailure = (err) => ({ type: A.GET_TENNIS_VIDEOS_FAILURE, err });

// export const getTennisVideos = () => {
//   return (dispatch) => {
//     dispatch(getTennisVideosRequest());
//     return axios.get(youtubeAPI.HOST + youtubeAPI.PLAYLIST_ITEMS, {
//       params: {
//         'part': 'snippet',
//         'playlistId': youtubeAPI.Tennis_ID,
//         'maxResults': '25',
//         'key': youtubeAPI.KEY
//       }
//     }).then(response => {
//       dispatch(getTennisVideosSuccess(response.data.items));
//     }).catch(err => {
//       dispatch(getTennisVideosFailure(err));
//       throw(err);
//     });
//   };
// };

// mock data
// export const getTennisVideos = () => {
//   return async (dispatch) => {
//     dispatch(getTennisVideosRequest());
//     await sleep(1500);
//     return dispatch(getTennisVideosSuccess(PLAYLIST.items));
//   };
// };

// Get Schedule
export const getTennisScheduleRequest = () => ({ type: A.GET_TENNIS_SCHEDULE_REQUEST });
export const getTennisScheduleSuccess = (payload, schedule) => ({ type: A.GET_TENNIS_SCHEDULE_SUCCESS, payload, schedule });
export const getTennisScheduleFailure = (err) => ({ type: A.GET_TENNIS_SCHEDULE_FAILURE, err });

// export const getTennisSchedule = () => {
//   return (dispatch) => {
//     dispatch(getTennisScheduleRequest());
//     return axios({
//       method: 'get',
//       url: tennisAPI.HOST + tennisAPI.TOURNAMENTS,
//       params: {
//         'api_key': 'xuyg3w9bj5gnj6dg5vt6tzkb'
//       }
//     }).then(response => {
//       const today = new Date();
//       const thisYear = today.getFullYear();

      // const schedule = response.data.tournaments.filter(t => 
      //   (
      //     (t.type == 'singles' && 
      //     (t.category.level == 'grand_slam' || t.category.level == 'atp_1000' || 
      //     t.category.level == 'atp_500' || t.category.level == 'wta_championships' || t.category.level == 'wta_premier' ))
      //     || 
      //     t.type == 'mixed'
      //   ) &&
      //   t.current_season.year == thisYear);

//       const sortedSchedule = sortTennisSchedule(schedule);
//       dispatch(getTennisScheduleSuccess(sortedSchedule, schedule));
//     }).catch(err => {
//       dispatch(getTennisScheduleFailure(err));
//       throw(err);
//     });
//   };
// };

// return mock data
export const getTennisSchedule = () => {
  return async (dispatch) => {
    dispatch(getTennisScheduleRequest());
    await sleep(1000);
    const today = new Date();
    const thisYear = today.getFullYear();

    const schedule = SCHEDULE.tournaments.filter(t => 
      ((t.type == 'singles' && t.category.level) || t.type == 'mixed') &&
      t.current_season.year == thisYear);

    const sortedSchedule = sortTennisSchedule(schedule);
    return dispatch(getTennisScheduleSuccess(sortedSchedule, schedule));
  };
};

// Get Tournament schedule
export const getTennisTournamentScheduleRequest = () => ({ type: A.GET_TENNIS_TOURNAMENT_SCHEDULE_REQUEST });
export const getTennisTournamentScheduleSuccess = (payload) => ({ type: A.GET_TENNIS_TOURNAMENT_SCHEDULE_SUCCESS, payload });
export const getTennisTournamentScheduleFailure = (err) => ({ type: A.GET_TENNIS_TOURNAMENT_SCHEDULE_FAILURE, err });

// export const getTennisTournamentSchedule = (tournamentId) => {
//   return (dispatch) => {
//     dispatch(getTennisTournamentScheduleRequest());
//     return axios({
//       method: 'get',
//       url: tennisAPI.HOST + '/tournaments/' + tournamentId + tennisAPI.SCHEDULE,
//       params: {
//         'api_key': 'xuyg3w9bj5gnj6dg5vt6tzkb'
//       }
//     }).then(response => {
//       dispatch(getTennisTournamentScheduleSuccess(response.data));
//       return response.data;
//     }).catch(err => {
//       dispatch(getTennisTournamentScheduleFailure(err));
//       throw(err);
//     });
//   };
// };

export const getTennisTournamentSchedule = (tournamentId) => {
  return async (dispatch) => {
    dispatch(getTennisTournamentScheduleRequest());
    await sleep(1000);
    dispatch(getTennisTournamentScheduleSuccess(MONTE_CARLO_SCHEDULE));
    return MONTE_CARLO_SCHEDULE;
  };
};

// Get Teams
export const getTennisTournamentInfoRequest = () => ({ type: A.GET_TENNIS_TOURNAMENT_INFO_REQUEST });
export const getTennisTournamentInfoSuccess = (payload) => ({ type: A.GET_TENNIS_TOURNAMENT_INFO_SUCCESS, payload });
export const getTennisTournamentInfoFailure = (err) => ({ type: A.GET_TENNIS_TOURNAMENT_INFO_FAILURE, err });

// export const getTennisTournamentInfo = (tournamentId) => {
//   return (dispatch) => {
//     dispatch(getTennisTournamentInfoRequest());
//     return axios({
//       method: 'get',
//       url: tennisAPI.HOST + '/tournaments/' + tournamentId + tennisAPI.INFO,
//       params: {
//         'api_key': 'xuyg3w9bj5gnj6dg5vt6tzkb'
//       }
//     }).then(response => {
//       dispatch(getTennisTournamentInfoSuccess(response.data));
//       return response.data;
//     }).catch(err => {
//       dispatch(getTennisTournamentInfoFailure(err));
//       throw(err);
//     });
//   };
// };

export const getTennisTournamentInfo = (tournamentId) => {
  return async (dispatch) => {
    dispatch(getTennisTournamentInfoRequest());
    await sleep(1000);
    dispatch(getTennisTournamentInfoSuccess(TOURNAMENT_INFO));
    return TOURNAMENT_INFO;
  };
};