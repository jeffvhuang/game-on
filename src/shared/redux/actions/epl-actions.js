import axios from 'axios';

import { eplActions as A, championsLeagueActions as C, europaLeagueActions as E } from './action-types';
import { youtubeAPI, gameonAPI } from '../../../helpers/constants';
import { sleep, sortFootballSchedule } from '../../../helpers/utils';

// Mock data
import EPL_TEAMS from '../../../mockApiData/eplTeams.json';
import EPL_SCHEDULE from '../../../mockApiData/eplSchedule.json';
import CL_TEAMS from '../../../mockApiData/championsLeagueTeams.json';
import CL_SCHEDULE from '../../../mockApiData/championsLeagueSchedule.json';
import EL_TEAMS from '../../../mockApiData/europaLeagueTeams.json';
import EL_SCHEDULE from '../../../mockApiData/europaLeagueSchedule.json';
import { CL_PLAYLIST } from '../../../mockApiData/champsLeagueYoutube';
import { EL_PLAYLIST } from '../../../mockApiData/europaLeagueYoutube';
// import { PLAYLIST } from '../../../mockApiData/EplYoutube';


// Get video from youtube playlist of Epl highlights
// export const getEplVideosRequest = () => ({ type: A.GET_EPL_VIDEOS_REQUEST });
// export const getEplVideosSuccess = (payload) => ({ type: A.GET_EPL_VIDEOS_SUCCESS, payload });
// export const getEplVideosFailure = (err) => ({ type: A.GET_EPL_VIDEOS_FAILURE, err });

// export const getEplVideos = () => {
//   return (dispatch) => {
//     dispatch(getEplVideosRequest());
//     return axios.get(youtubeAPI.HOST + youtubeAPI.PLAYLIST_ITEMS, {
//       params: {
//         'part': 'snippet',
//         'playlistId': youtubeAPI.CHAMPIONS_LEAGUE_ID,
//         'maxResults': '25',
//         'key': youtubeAPI.KEY
//       }
//     }).then(response => {
//       dispatch(getEplVideosSuccess(response.data.items));
//     }).catch(err => {
//       dispatch(getEplVideosFailure(err));
//       throw(err);
//     });
//   };
// };

// mock data
// export const getEplVideos = () => {
//   return async (dispatch) => {
//     dispatch(getEplVideosRequest());
//     await sleep(1500);
//     return dispatch(getEplVideosSuccess(PLAYLIST.items));
//   };
// };

export const getChampionsLeagueVideosRequest = () => ({ type: C.GET_CHAMPIONS_LEAGUE_VIDEOS_REQUEST });
export const getChampionsLeagueVideosSuccess = (payload) => ({ type: C.GET_CHAMPIONS_LEAGUE_VIDEOS_SUCCESS, payload });
export const getChampionsLeagueVideosFailure = (err) => ({ type: C.GET_CHAMPIONS_LEAGUE_VIDEOS_FAILURE, err });

// export const getChampionsLeagueVideos = () => {
//   return (dispatch) => {
//     dispatch(getChampionsLeagueVideosRequest());
//     return axios.get(youtubeAPI.HOST + youtubeAPI.PLAYLIST_ITEMS, {
//       params: {
//         'part': 'snippet',
//         'playlistId': youtubeAPI.CHAMPIONS_LEAGUE_ID,
//         'maxResults': '25',
//         'key': youtubeAPI.KEY
//       }
//     }).then(response => {
//       dispatch(getChampionsLeagueVideosSuccess(response.data.items));
//     }).catch(err => {
//       dispatch(getChampionsLeagueVideosFailure(err));
//       throw(err);
//     });
//   };
// };

// mock data
export const getChampionsLeagueVideos = () => {
  return async (dispatch) => {
    dispatch(getChampionsLeagueVideosRequest());
    await sleep(1500);
    return dispatch(getChampionsLeagueVideosSuccess(CL_PLAYLIST.items));
  };
};

export const getEuropaLeagueVideosRequest = () => ({ type: E.GET_EUROPA_LEAGUE_VIDEOS_REQUEST });
export const getEuropaLeagueVideosSuccess = (payload) => ({ type: E.GET_EUROPA_LEAGUE_VIDEOS_SUCCESS, payload });
export const getEuropaLeagueVideosFailure = (err) => ({ type: E.GET_EUROPA_LEAGUE_VIDEOS_FAILURE, err });

// export const getEuropaLeagueVideos = () => {
//   return (dispatch) => {
//     dispatch(getEuropaLeagueVideosRequest());
//     return axios.get(youtubeAPI.HOST + youtubeAPI.PLAYLIST_ITEMS, {
//       params: {
//         'part': 'snippet',
//         'playlistId': youtubeAPI.EUROPA_LEAGUE_ID,
//         'maxResults': '50',
//         'key': youtubeAPI.KEY
//       }
//     }).then(response => {
//       dispatch(getEuropaLeagueVideosSuccess(response.data.items));
//     }).catch(err => {
//       dispatch(getEuropaLeagueVideosFailure(err));
//       throw(err);
//     });
//   };
// };

// mock data
export const getEuropaLeagueVideos = () => {
  return async (dispatch) => {
    dispatch(getEuropaLeagueVideosRequest());
    await sleep(1000);
    return dispatch(getEuropaLeagueVideosSuccess(EL_PLAYLIST.items));
  };
};

// Get Schedule
export const getEplScheduleRequest = () => ({ type: A.GET_EPL_SCHEDULE_REQUEST });
export const getEplScheduleSuccess = (payload, schedule) => ({ type: A.GET_EPL_SCHEDULE_SUCCESS, payload, schedule });
export const getEplScheduleFailure = (err) => ({ type: A.GET_EPL_SCHEDULE_FAILURE, err });

// export const getEplSchedule = () => {
//   return (dispatch) => {
//     dispatch(getEplScheduleRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.EPL + gameonAPI.SCHEDULE,
//     }).then(response => {
//       const sortedSchedule = sortEplSchedule(response.data);
//       dispatch(getEplScheduleSuccess(sortedSchedule, response.data));
//     }).catch(err => {
//       dispatch(getEplScheduleFailure(err));
//       throw(err);
//     });
//   };
// };

// return mock data
export const getEplSchedule = () => {
  return async (dispatch) => {
    dispatch(getEplScheduleRequest());
    await sleep(1000);
    const sortedSchedule = sortFootballSchedule(EPL_SCHEDULE);
    return dispatch(getEplScheduleSuccess(sortedSchedule, EPL_SCHEDULE));
  };
};

// Get Teams
export const getEplTeamsRequest = () => ({ type: A.GET_EPL_TEAMS_REQUEST });
export const getEplTeamsSuccess = (payload) => ({ type: A.GET_EPL_TEAMS_SUCCESS, payload });
export const getEplTeamsFailure = (err) => ({ type: A.GET_EPL_TEAMS_FAILURE, err });

// export const getEplTeams = () => {
//   return (dispatch) => {
//     dispatch(getEplTeamsRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.EPL + gameonAPI.TEAMS
//     }).then(response => {
//       dispatch(getEplTeamsSuccess(response.data));
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
    await sleep(1000);
    return dispatch(getEplTeamsSuccess(EPL_TEAMS));
  };
};

// Get Schedule
export const getChampionsLeagueScheduleRequest = () => ({ type: C.GET_CHAMPIONS_LEAGUE_SCHEDULE_REQUEST });
export const getChampionsLeagueScheduleSuccess = (payload, schedule) => ({ type: C.GET_CHAMPIONS_LEAGUE_SCHEDULE_SUCCESS, payload, schedule });
export const getChampionsLeagueScheduleFailure = (err) => ({ type: C.GET_CHAMPIONS_LEAGUE_SCHEDULE_FAILURE, err });

// export const getChampionsLeagueSchedule = () => {
//   return (dispatch) => {
//     dispatch(getChampionsLeagueScheduleRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.EPL + gameonAPI.SCHEDULE,
//     }).then(response => {
//       const sortedSchedule = sortChampionsLeagueSchedule(response.data);
//       dispatch(getChampionsLeagueScheduleSuccess(sortedSchedule, response.data));
//     }).catch(err => {
//       dispatch(getChampionsLeagueScheduleFailure(err));
//       throw(err);
//     });
//   };
// };

// return mock data
export const getChampionsLeagueSchedule = () => {
  return async (dispatch) => {
    dispatch(getChampionsLeagueScheduleRequest());
    await sleep(1000);
    const sortedSchedule = sortFootballSchedule(CL_SCHEDULE);
    return dispatch(getChampionsLeagueScheduleSuccess(sortedSchedule, EPL_SCHEDULE));
  };
};

// Get Teams
export const getChampionsLeagueTeamsRequest = () => ({ type: C.GET_CHAMPIONS_LEAGUE_TEAMS_REQUEST });
export const getChampionsLeagueTeamsSuccess = (payload) => ({ type: C.GET_CHAMPIONS_LEAGUE_TEAMS_SUCCESS, payload });
export const getChampionsLeagueTeamsFailure = (err) => ({ type: C.GET_CHAMPIONS_LEAGUE_TEAMS_FAILURE, err });

// export const getChampionsLeagueTeams = () => {
//   return (dispatch) => {
//     dispatch(getChampionsLeagueTeamsRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.CHAMPIONS_LEAGUE + gameonAPI.TEAMS
//     }).then(response => {
//       dispatch(getChampionsLeagueTeamsSuccess(response.data));
//     }).catch(err => {
//       dispatch(getChampionsLeagueTeamsFailure(err));
//       throw(err);
//     });
//   };
// };

// return mock data
export const getChampionsLeagueTeams = () => {
  return async (dispatch) => {
    dispatch(getChampionsLeagueTeamsRequest());
    await sleep(1000);
    return dispatch(getChampionsLeagueTeamsSuccess(CL_TEAMS));
  };
};

// GET champions league schedule
export const getEuropaLeagueScheduleRequest = () => ({ type: E.GET_EUROPA_LEAGUE_SCHEDULE_REQUEST });
export const getEuropaLeagueScheduleSuccess = (payload, schedule) => ({ type: E.GET_EUROPA_LEAGUE_SCHEDULE_SUCCESS, payload, schedule });
export const getEuropaLeagueScheduleFailure = (err) => ({ type: E.GET_EUROPA_LEAGUE_SCHEDULE_FAILURE, err });

// export const getEuropaLeagueSchedule = () => {
//   return (dispatch) => {
//     dispatch(getEuropaLeagueScheduleRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.EUROPA_LEAGUE + gameonAPI.SCHEDULE,
//     }).then(response => {
//       const sortedSchedule = sortEuropaLeagueSchedule(response.data);
//       dispatch(getEuropaLeagueScheduleSuccess(sortedSchedule, response.data));
//     }).catch(err => {
//       dispatch(getEuropaLeagueScheduleFailure(err));
//       throw(err);
//     });
//   };
// };

// return mock data
export const getEuropaLeagueSchedule = () => {
  return async (dispatch) => {
    dispatch(getEuropaLeagueScheduleRequest());
    await sleep(1000);
    const sortedSchedule = sortFootballSchedule(EL_SCHEDULE);
    return dispatch(getEuropaLeagueScheduleSuccess(sortedSchedule, EL_SCHEDULE));
  };
};

// Get Teams
export const getEuropaLeagueTeamsRequest = () => ({ type: E.GET_CHAMPIONS_LEAGUE_TEAMS_REQUEST });
export const getEuropaLeagueTeamsSuccess = (payload) => ({ type: E.GET_CHAMPIONS_LEAGUE_TEAMS_SUCCESS, payload });
export const getEuropaLeagueTeamsFailure = (err) => ({ type: E.GET_CHAMPIONS_LEAGUE_TEAMS_FAILURE, err });

// export const getEuropaLeagueTeams = () => {
//   return (dispatch) => {
//     dispatch(getEuropaLeagueTeamsRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.EUROPA_LEAGUE + gameonAPI.TEAMS
//     }).then(response => {
//       dispatch(getEuropaLeagueTeamsSuccess(response.data));
//     }).catch(err => {
//       dispatch(getEuropaLeagueTeamsFailure(err));
//       throw(err);
//     });
//   };
// };

// return mock data
export const getEuropaLeagueTeams = () => {
  return async (dispatch) => {
    dispatch(getEuropaLeagueTeamsRequest());
    await sleep(1000);
    return dispatch(getEuropaLeagueTeamsSuccess(EL_TEAMS));
  };
};