import {combineReducers} from 'redux';
import userData from '../Reducer/userDataReducers';
import userChat from '../Reducer/userChatReducer';
export default combineReducers({userData, userChat});
