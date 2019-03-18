import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { logout } from './../../redux/actions/user';

class Logout extends Component {
	constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
	  return (
      <Button 
        color='link' 
        key='Button'
        onClick={this.props.logoutUser}
      >
        Click here to logout...
      </Button>
	  )
	}
}

const mapDispatchToProps = dispatch => ({
  logoutUser: (e) => { 
    e.preventDefault(); 
    dispatch(logout()); 
  },
});

export default connect(null, mapDispatchToProps)(Logout);