import {USER_LOGIN, USER_LOGOUT} from './actionTypes';

export const userLogin = data => async dispatch => {
  console.log('action', data.user.apiKey);
  try {
    const response = data;
    if (response) {
      await dispatch({
        type: USER_LOGIN,
        payload: response,
      });
    }
    return response;
  } catch (err) {
    // if (!(err.message === 'Network Error')) {
    //   throw err;
    // }
    console.log('error', err);
  }
};
