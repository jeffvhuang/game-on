import axios from 'axios';
import { ThunkAction } from 'redux-thunk';

import { ReduxState } from '../redux-state';
import * as T from './general-types';
import * as C from './general-constants';
import { youtubeAPI, gameonAPI } from '../../../helpers/constants';
import { sleep, sortNBASchedule } from '../../../helpers/utils';

// Mock data
import SORTED_EVENTS from '../../../mockApiData/events.json';

// Get video from youtube playlist of general highlights
export function getEventsRequest(): T.GetEventsRequest {
  return { type: C.GET_EVENTS_REQUEST }
}
export function getEventsSuccess(payload): T.GetEventsSuccess {
  return { type: C.GET_EVENTS_SUCCESS, payload }
}
export function getEventsFailure(err): T.GetEventsFailure {
  return { type: C.GET_EVENTS_FAILURE, err }
}

// export const getEvents = (): ThunkAction<
//   Promise<void>, ReduxState, null, T.GeneralActionTypes
// > => async (dispatch) => {
//   dispatch(getEventsRequest());
//   return axios.get(gameonAPI.HOST + gameonAPI.GENERAL + gameonAPI.EVENTS)
//   .then(response => {
//     dispatch(getEventsSuccess(response.data));
//   }).catch(err => {
//     dispatch(getEventsFailure(err));
//     throw (err);
//   });
// };

// mock data
export const getEvents = (): ThunkAction<
  Promise<void>, ReduxState, null, T.GeneralActionTypes
> => async (dispatch) => {
  dispatch(getEventsSuccess(SORTED_EVENTS));
};