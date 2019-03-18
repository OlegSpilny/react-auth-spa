import { createStore } from 'redux';
import { connectRouter } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import history from './history';
import reducers from './redux/reducers';
import middlewares from './redux/middlewares';

const store = createStore(
  connectRouter(history)(reducers),
  composeWithDevTools(middlewares),
);

store.subscribe(() => {
});

export default store;
