import * as actionTypes from './../actionTypes/user';

import { 
  getUserByLogin,
  getUserByToken,
  isUserLoginIsset,
  isUserEmailIsset,
} from './../../utils/usersStorage';

export const loginUser = (payload) => (dispatch) => {
  dispatch({ 
    type: actionTypes.LOGIN_USER, 
  });

  const user = getUserByLogin(payload);

  if (user) {
    dispatch({ 
      type: actionTypes.LOGIN_USER_SUCCESS,
      data: user,
    });
  } else {
    dispatch({
      type: actionTypes.LOGIN_USER_ERROR,
      error: 'Invalid login or password',
    })
  }

};

export const createUser = (data) => (dispatch) => {
  const { login, email } = data;
  
  dispatch({ 
    type: actionTypes.CREATE_USER, 
  });

  switch(true) {
    case isUserLoginIsset(login):
      dispatch({
        type: actionTypes.CREATE_USER_ERROR,
        data,
        error: 'This login is already used!'
      });
      break;
    case isUserEmailIsset(email):
      dispatch({
        type: actionTypes.CREATE_USER_ERROR,
        data,
        error: 'This email is already used!'
      });
      break;
    default:
      dispatch({
        type: actionTypes.CREATE_USER_SUCCESS,
        data,
      });
  }      
};

export const getUser = () => (dispatch) => {
  dispatch({ 
    type: actionTypes.GET_USER, 
  });

  const user = getUserByToken();

  if (user) {
    dispatch({
      type: actionTypes.GET_USER_SUCCESS,
      data: user,
    });
  } else {
    dispatch({
      type: actionTypes.GET_USER_ERROR,
      error: 'User not found',
    });
  }
};


export const logout = () => (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT_USER,
  });
  dispatch({
    type: actionTypes.LOGOUT_USER_SUCCESS,
  });
};
