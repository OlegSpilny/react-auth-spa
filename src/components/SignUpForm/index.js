import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'reactstrap';

import InputLogin from './../InputLogin';
import InputEmail from './../InputEmail';
import InputPassword from './../InputPassword';

import { createUser } from './../../redux/actions/user';

import validate from './../../utils/validate';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      login: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      hasClick: false,
      success: false,
    };

    this.errors = {
      login: 'Invalid login.',
      email: 'Invalid email.',
      password: 'Invalid password.',
      confirmPassword: 'Invalid password.',
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
    const { 
      login, 
      email, 
      password, 
      confirmPassword, 
    } = this.state;

    const errors = {
      loginError: !validate.text(login.trim()) ? this.errors.login : null,
      emailError: !validate.email(email.toLowerCase()) ? this.errors.email : null,
      passwordError: !validate.password(password.trim()) ? this.errors.password : null,
      confirmPasswordError: !(validate.password(confirmPassword.trim()) 
      	&& password === confirmPassword) ? this.errors.confirmPassword : null,
    };

    this.setState({ errors });
    
    const isError = Object.keys(errors).some(item => errors[item]);

    return isError;
  }

  onSubmit(e) {
    const { login, email, password } = this.state;
    const data = ({ login, email, password });

    this.setState({ hasClick: true });

    const isError = this.onValidate();
    if (!isError) {
      e.preventDefault();
      this.setState({ success: true });
      this.props.createUser(data);
    }
  }

  render() {
    const { errors } = this.state;
    const {
      loginError,
      emailError,
      passwordError,
      confirmPasswordError,
    } = errors;

    const inputLoginProps = {
      error: loginError,
      id: 'login1',
      onChange: this.onChange,
    };

    const inputEmailProps = {
      error: emailError,
      onChange: this.onChange,
    };

    const inputPasswordProps = {
      error: passwordError,
      name: 'password',
      label: 'Password',
      id: 'password1',
      onChange: this.onChange,
    };

    const inputConfirmPasswordProps = {
      error: confirmPasswordError,
      name: 'confirmPassword',
      label: 'Confirm Password',
      id: 'confirmPassword',
      onChange: this.onChange,
    };

    return (
      <Form>
        <InputLogin {...inputLoginProps} />
        <InputEmail {...inputEmailProps} />
        <InputPassword {...inputPasswordProps} />
        <InputPassword {...inputConfirmPasswordProps} />
        <Button 
          color='primary' 
          type='submit' 
          onClick={this.onSubmit}
        >
          Sign Up
        </Button>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  createUser: (data) => dispatch(createUser(data)),
});

export default connect(null, mapDispatchToProps)(SignUpForm);