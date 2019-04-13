import axios from 'axios';

import { tennisActions as A } from './action-types';
import { youtubeAPI, tennisAPI } from '../../../helpers/constants';
import { sleep, sortTennisSchedule } from '../../../helpers/utils';

// Mock data
import { SCHEDULE } from '../../../mockApiData/tennisData';
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
//       url: tennisAPI.HOST + tennisAPI.SCHEDULE,
//       params: {
//         'api_key': 'xuyg3w9bj5gnj6dg5vt6tzkb'
//       }
//     }).then(response => {
//       const today = new Date();
//       const thisYear = today.getFullYear();

//       const schedule = response.data.tournaments.filter(t => t.type == 'singles' && 
//         (t.category.level == 'grand_slam' || t.category.level == 'atp_1000' ||
//         t.category.level == 'wta_championships' || t.category.level == 'wta_premier' ) &&
//         t.current_season.year == thisYear);

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
    await sleep(2000);
    const today = new Date();
    const thisYear = today.getFullYear();

    const schedule = SCHEDULE.tournaments.filter(t => 
      (
        (t.type == 'singles' && 
        (t.category.level == 'grand_slam' || t.category.level == 'atp_1000' || 
        t.category.level == 'atp_500' || t.category.level == 'wta_championships' || t.category.level == 'wta_premier' ))
        || 
        t.type == 'mixed'
      ) &&
      t.current_season.year == thisYear);

    const sortedSchedule = sortTennisSchedule(schedule);
    return dispatch(getTennisScheduleSuccess(sortedSchedule, schedule));
  };
};

// Get Teams
// export const getTennisTeamsRequest = () => ({ type: A.GET_TENNIS_TEAMS_REQUEST });
// export const getTennisTeamsSuccess = (payload) => ({ type: A.GET_TENNIS_TEAMS_SUCCESS, payload });
// export const getTennisTeamsFailure = (err) => ({ type: A.GET_TENNIS_TEAMS_FAILURE, err });

// export const getTennisTeams = () => {
//   return (dispatch) => {
//     dispatch(getTennisTeamsRequest());
//     return axios({
//       method: 'get',
//       url: tennisAPI.HOST + tennisAPI.TEAMS,
//       headers: {
//         'X-RapidAPI-Key': '9a04c3ec1dmshe9bb5802ba2545dp16f979jsndbae1452a5b5'
//       }
//     }).then(response => {
//       const TennisTeams = response.data.api.teams.filter(team => team.TennisFranchise == '1');
//       dispatch(getTennisTeamsSuccess(TennisTeams));
//     }).catch(err => {
//       dispatch(getTennisTeamsFailure(err));
//       throw(err);
//     });
//   };
// };

// return mock data
// export const getTennisTeams = () => {
//   return async (dispatch) => {
//     dispatch(getTennisTeamsRequest());
//     await sleep(2000);
//     const TennisTeams = TEAMS.filter(team => team.TennisFranchise == '1');
//     return dispatch(getTennisTeamsSuccess(TennisTeams));
//   };
// };