import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'reactstrap';

import InputLogin from './../InputLogin';
import InputPassword from './../InputPassword';

import { loginUser } from './../../redux/actions/user';

import validate from './../../utils/validate';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      login: '',
      password: '',
      errors: {},
      hasClick: false,
      success: false,
    };

    this.errors = {
      login: 'Invalid login.',
      password: 'Invalid password.',
    };

    this.state = this.initialState;

    this.onChange = this.onChange.bind(this);
    this.onValidate = this.onValidate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    const { hasClick } = this.state;

    this.setState({
      [name]: value,
    }, () => {
      if (hasClick) {
        this.onValidate();
      }
    });
  }

  onValidate() {
    const { login, password } = this.state;

    const errors = {
      loginError: !validate.text(login.trim()) ? this.errors.login : null,
      passwordError: !validate.password(password.trim()) ? this.errors.password : null,
    };

    this.setState({ errors });
    
    const isError = Object.keys(errors).some(item => errors[item]);

    return isError;
  }

  onSubmit(e) {
    const { login, password } = this.state;

    const payload = { login, password };

    this.setState({ hasClick: true });

    const isError = this.onValidate();
    if (!isError) {
      e.preventDefault();
      this.setState({ success: true });
      this.props.loginUser(payload);
    }
  }

  render() {
    const { errors } = this.state;
    const { loginError, passwordError } = errors;

    const inputLoginProps = {
      error: loginError,
      id: 'login2',
      onChange: this.onChange,
    };

    const inputPasswordProps = {
      error: passwordError,
      name: 'password',
      label: 'Password',
      id: 'password2',
      onChange: this.onChange,
    };

    return (
      <Form>
        <InputLogin {...inputLoginProps} />
        <InputPassword {...inputPasswordProps} />
        <Button 
          color='primary' 
          type='submit' 
          onClick={this.onSubmit}
        >
          Login
        </Button>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  loginUser: (data) => dispatch(loginUser(data)),
});

export default connect(null, mapDispatchToProps)(LoginForm);