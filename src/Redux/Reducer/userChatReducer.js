import {LIST_MESSAGE} from '../Actions/actionTypes';

const initialState = {
  dataChat: [],
};

export default function userChat(state = initialState, action) {
  console.log('reducer'.action);
  switch (action.type) {
    case LIST_MESSAGE:
      return {
        ...state,
        dataChat: action.payload,
      };
    default:
      return state;
  }
}
