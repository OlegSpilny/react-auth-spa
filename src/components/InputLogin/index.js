import React from 'react';
import classnames from 'classnames';
import { FormGroup, Label, Input } from 'reactstrap';

import InputError from './../InputError';

export default ({ id, error, onChange, ...rest }) => {
  return (
  	<FormGroup>
      <Label for={id}>Login</Label>
      <Input 
        type='text' 
        name='login' 
        id={id} 
        placeholder='Enter your login' 
        className={classnames({'is-invalid': error })}
        onChange={onChange}
        minLength='1'
        pattern='.{1,}'
        required
      />
      <InputError text={error} />
    </FormGroup>
   )
};

