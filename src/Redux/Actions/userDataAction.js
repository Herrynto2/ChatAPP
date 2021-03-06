import {
  USER_LOGIN,
  USER_LOGOUT,
  CLEAR_HISTORY,
  UPDATE_PROFILE,
  LIST_MESSAGE,
} from './actionTypes';

export const userLogin = data => async dispatch => {
  try {
    const response = data.user;
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

export const userLogout = () => async dispatch => {
  await dispatch({
    type: USER_LOGOUT,
  });
  await dispatch({
    type: CLEAR_HISTORY,
  });
};

export const updateProfile = data => async dispatch => {
  try {
    const response = data;
    if (response) {
      await dispatch({
        type: UPDATE_PROFILE,
        payload: response,
      });
    }
    return response.data;
  } catch (err) {
    console.log('error', err);
  }
};

export const chatList = data => async dispatch => {
  try {
    const response = data;
    if (response) {
      await dispatch({
        type: LIST_MESSAGE,
        payload: response,
      });
    }
    return response;
  } catch (err) {
    console.log('error', err);
  }
};
