import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import IndexPage from './pages/IndexPage';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' component={IndexPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}