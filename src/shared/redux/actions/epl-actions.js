import axios from 'axios';

import { eplActions as A } from './action-types';
import { youtubeAPI, eplAPI } from '../../../helpers/constants';
import { sleep } from '../../../helpers/utils';

// Mock data
import { TEAMS } from '../../../mockApiData/rapidEpl';
// import { PLAYLIST } from '../../../mockApiData/EplYoutube';


// Get video from youtube playlist of Epl highlights
export const getEplVideosRequest = () => ({ type: A.GET_EPL_VIDEOS_REQUEST });
export const getEplVideosSuccess = (payload) => ({ type: A.GET_EPL_VIDEOS_SUCCESS, payload });
export const getEplVideosFailure = (err) => ({ type: A.GET_EPL_VIDEOS_FAILURE, err });

export const getEplVideos = () => {
  return (dispatch) => {
    // dispatch(getEplVideosRequest());
    // return axios.get(youtubeAPI.HOST + youtubeAPI.PLAYLIST_ITEMS, {
    //   params: {
    //     'part': 'snippet',
    //     'playlistId': youtubeAPI.Epl_ID,
    //     'maxResults': '25',
    //     'key': youtubeAPI.KEY
    //   }
    // }).then(response => {
    //   dispatch(getEplVideosSuccess(response.data.items));
    // }).catch(err => {
    //   dispatch(getEplVideosFailure(err));
    //   throw(err);
    // });
  };
};

// mock data
// export const getEplVideos = () => {
//   return async (dispatch) => {
//     dispatch(getEplVideosRequest());
//     await sleep(1500);
//     return dispatch(getEplVideosSuccess(PLAYLIST.items));
//   };
// };

// Get Schedule
export const getEplScheduleRequest = () => ({ type: A.GET_EPL_SCHEDULE_REQUEST });
export const getEplScheduleSuccess = (payload, schedule) => ({ type: A.GET_EPL_SCHEDULE_SUCCESS, payload, schedule });
export const getEplScheduleFailure = (err) => ({ type: A.GET_EPL_SCHEDULE_FAILURE, err });

export const getEplSchedule = () => {
  return (dispatch) => {
    // dispatch(getEplScheduleRequest());
    // return axios({
    //   method: 'get',
    //   url: EplAPI.HOST + EplAPI.SCHEDULE,
    //   headers: {
    //     'X-RapidAPI-Key': '9a04c3ec1dmshe9bb5802ba2545dp16f979jsndbae1452a5b5'
    //   }
    // }).then(response => {
    //   const sortedSchedule = sortEplSchedule(response.data.api.games);
    //   dispatch(getEplScheduleSuccess(sortedSchedule, response.data.api.games));
    // }).catch(err => {
    //   dispatch(getEplScheduleFailure(err));
    //   throw(err);
    // });
  };
};

// return mock data
// export const getEplSchedule = () => {
//   return async (dispatch) => {
//     dispatch(getEplScheduleRequest());
//     await sleep(2000);
//     const sortedSchedule = sortEplSchedule(SCHEDULE);
//     return dispatch(getEplScheduleSuccess(sortedSchedule, SCHEDULE));
//   };
// };

// Get Teams
export const getEplTeamsRequest = () => ({ type: A.GET_EPL_TEAMS_REQUEST });
export const getEplTeamsSuccess = (payload) => ({ type: A.GET_EPL_TEAMS_SUCCESS, payload });
export const getEplTeamsFailure = (err) => ({ type: A.GET_EPL_TEAMS_FAILURE, err });

// export const getEplTeams = () => {
//   return (dispatch) => {
//     dispatch(getEplTeamsRequest());
//     return axios({
//       method: 'get',
//       url: eplAPI.HOST + eplAPI.TEAMS,
//       headers: {
//         'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
//         'X-RapidAPI-Key': '9a04c3ec1dmshe9bb5802ba2545dp16f979jsndbae1452a5b5'
//       }
//     }).then(response => {
//       const teamsObj = response.data.api.teams;
//       const eplTeams = [];

//       Object.keys(teamsObj).forEach(t => eplTeams.push({
//         fullName: teamsObj[t].name,
//         shortName: teamsObj[t].code,
//         teamId: teamsObj[t].team_id,
//         logo: teamsObj[t].logo
//       }));

//       dispatch(getEplTeamsSuccess(eplTeams));
//     }).catch(err => {
//       dispatch(getEplTeamsFailure(err));
//       throw(err);
//     });
//   };
// };

// return mock data
export const getEplTeams = () => {
  return async (dispatch) => {
    dispatch(getEplTeamsRequest());
    await sleep(2000);

    const teamsObj = TEAMS;
    const eplTeams = [];

    Object.keys(teamsObj).forEach(t => eplTeams.push({
      fullName: teamsObj[t].name,
      shortName: teamsObj[t].code,
      teamId: teamsObj[t].team_id,
      logo: teamsObj[t].logo
    }));

    return dispatch(getEplTeamsSuccess(eplTeams));
  };
};