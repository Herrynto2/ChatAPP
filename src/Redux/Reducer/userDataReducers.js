import {
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_PROFILE,
  LIST_MESSAGE,
} from '../Actions/actionTypes';
const initialState = {
  isLogin: false,
  dataProfile: {},
  dataUser: {},
  dataChat: [],
};

export default function userData(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLogin: true,
        dataUser: action.payload,
      };
    case USER_LOGOUT:
      return initialState;
    case UPDATE_PROFILE:
      return {
        ...state,
        dataProfile: action.payload,
      };
    case LIST_MESSAGE:
      return {
        ...state,
        dataChat: action.payload,
      };
    default:
      return state;
  }
}
