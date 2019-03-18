import React from 'react';
import classnames from 'classnames';
import { FormGroup, Label, Input } from 'reactstrap';

import InputError from './../InputError';

import { EMAIL_PATTERN } from './../../config';

export default ({ error, onChange, ...rest }) => {
  return (
  	<FormGroup>
      <Label for='email'>Email</Label>
      <Input 
        type='email' 
        name='email' 
        id='email'
        placeholder='Enter your email' 
        className={classnames({'is-invalid': error })}
        onChange={onChange}
        autoCapitalize='off' 
        autoCorrect='off'
        autoComplete='email'
        pattern={EMAIL_PATTERN} 
        required
      />
      <InputError text={error} />
    </FormGroup>
   )
};

