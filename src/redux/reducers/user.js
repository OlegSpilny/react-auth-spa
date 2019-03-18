import * as actionTypes from './../actionTypes/user';

const userInitState = {
  data: {},
  isFetching: false,
  error: null,
  login: {
    data: {},
    isFetching: false,
    error: null,
  },
  create: {
    data: {},
    isFetching: false,
    error: null,
  },
};

const user = (state = userInitState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false,
      };
    case actionTypes.GET_USER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        login: {
          ...state.login,
          isFetching: true,
          error: null,
        },
      };
    case actionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        data: action.data,
        login: {
          isFetching: false,
        },
      };
    case actionTypes.LOGIN_USER_ERROR:
      return {
        ...state,
        login: {
          isFetching: false,
          error: action.error,
        },
      };
    case actionTypes.CREATE_USER:
      return {
        ...state,
        create: {
          ...state.create,
          isFetching: true,
          error: null,
        },
      };
    case actionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        create: {
          isFetching: false,
          data: action.data,
        },
      };
    case actionTypes.CREATE_USER_ERROR:
      return {
        ...state,
        create: {
          isFetching: false,
          error: action.error,
        },
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.LOGOUT_USER_SUCCESS:
      return {
        ...userInitState,
      };
    default:
      return state;
  }
};


export default user;