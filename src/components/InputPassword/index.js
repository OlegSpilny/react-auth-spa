import React from 'react';
import classnames from 'classnames';
import { FormGroup, Label, Input } from 'reactstrap';

import InputError from './../InputError';

export default ({ id, name, label, error, onChange, ...rest }) => {
  return (
  	<FormGroup>
      <Label for={id}>{label}</Label>
      <Input
        type='password' 
        name={name} 
        id={id}
        placeholder='Enter your password'
        className={classnames({'is-invalid': error })}
        onChange={onChange}
        minLength='6'
        maxLength='16'
        pattern='.{6,16}'
        required
      />
      <InputError text={error} />
    </FormGroup>
   )
};

