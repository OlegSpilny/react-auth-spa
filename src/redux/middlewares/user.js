import { uid } from 'rand-token';

import * as actionTypes from './../actionTypes/user';
import { clearToken, setToken } from './../../utils/tokenStorage';

import { 
  getUsers,
  saveUsers,
  setTokenToUser, 
  removeTokenFromUser,
} from './../../utils/usersStorage';

const user = store => next => (action) => {
  const result = next(action);

  const userState = store.getState().user;

  switch (action.type) {

    case actionTypes.CREATE_USER_SUCCESS: {
      const { data } = result;
      let users = getUsers();
      users.push(data);
      saveUsers(users);
      break;
    }

    case actionTypes.CREATE_USER_ERROR: {
      const { error } = result;
      alert(error);
      break;
    }

    case actionTypes.LOGIN_USER_SUCCESS: {
      const user = action.data;
      const token = uid(24);

      setTokenToUser(user, token);
      setToken(token);
      break;
    }

    case actionTypes.LOGIN_USER_ERROR: {
      const { error } = result;
      alert(error);
      break;
    }

    case actionTypes.LOGOUT_USER:
      const user = userState.data;
      removeTokenFromUser(user);
      break;

    case actionTypes.LOGOUT_USER_SUCCESS:
      clearToken();
      break;

    default:
  }

  return result;
};

export default user;
