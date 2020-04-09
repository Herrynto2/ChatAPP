import {USER_LOGIN, USER_LOGOUT, UPDATE_PROFILE} from '../Actions/actionTypes';
const initialState = {
  isLogin: false,
  token: '',
  apiKey: '',
  dataProfile: {},
};

export default function userData(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLogin: true,
        ...action.payload,
      };
    case USER_LOGOUT:
      return initialState;
    case UPDATE_PROFILE:
      return {
        ...state,
        dataProfile: action.payload,
      };
    default:
      return state;
  }
}
