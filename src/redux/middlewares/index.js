import { applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import history from './../../history';

import user from './user';

export default applyMiddleware(
  routerMiddleware(history),
  user,
  reduxThunk,
);
