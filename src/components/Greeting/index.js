import React from 'react';
import { Alert } from 'reactstrap';

import Logout from './../Logout';

export default ({ name, ...rest }) => {
  return [
    <Alert color='primary' key='Alert'>Hello, {name}!</Alert>,
    <Logout key='Logout' />
  ]
};

