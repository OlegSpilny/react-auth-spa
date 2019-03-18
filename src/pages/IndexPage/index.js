import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TabContent, Nav } from 'reactstrap';

import Wrapper from './../../components/Wrapper';
import TabItemContent from './../../components/TabItemContent';
import TabItemLink from './../../components/TabItemLink';
import LoginForm from './../../components/LoginForm';
import SignUpForm from './../../components/SignUpForm';
import Greeting from './../../components/Greeting';

import { getUser } from './../../redux/actions/user';

import { getToken } from './../../utils/tokenStorage';

import 'bootstrap/dist/css/bootstrap.css';

const tabsContent = [
  {
    name: 'Sign Up',
    content: <SignUpForm />,
  },
  {
    name: 'Login',
    content: <LoginForm />,
  }
];

const TabLinks = ({ activeTabIndex, onToggle, ...rest }) => {
  return (
    <Nav tabs>
      {tabsContent.map((item, index) => {
        return (
          <TabItemLink 
            key={`TabItemLink-${index}`} 
            {...item} 
            isActive={activeTabIndex === index}
            onToggle={onToggle}
          />
        )
      })}
    </Nav>
  )
};

const TabItems = ({ tabs, activeTabIndex, ...rest }) => {
  return (
    <TabContent activeTab={activeTabIndex}>
      {tabs.map((item, index) => {
        return (
          <TabItemContent 
            key={`TabItemLink-${index}`} 
            index={index}

          > 
            { tabsContent[index]['content'] }
          </TabItemContent>
        )
      })}
    </TabContent>
  )
};

const Tabs = ({ tabs, activeTabIndex, onToggle, onSetActive, ...rest }) => {
  return [
    <TabLinks 
      key='TabLinks'
      activeTabIndex={activeTabIndex}
      onToggle={onToggle} 
    />,
    <TabItems 
      key='TabItems'
      tabs={tabs}
      activeTabIndex={activeTabIndex}
    />
  ]
};

class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabs: [true, false],
    };

    this.onToggle = this.onToggle.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
  }

  componentDidUpdate(prevProps, prevState) {
    const { createdUser } = this.props;
    if (createdUser && createdUser !== prevProps.createdUser) {
      this.onSetActive();
    }
  }

  onSetActive() {
    this.setState({ 
      tabs: [false, true],
    });
  }

  onToggle(e) {
    const { tabs } = this.state;

    tabsContent.forEach((item, index) => {
      tabs[index] = item.name === e.target.innerText ? true : false;
    });
    
    this.setState({ tabs });
  }

  render() {
    const { name, isUser } = this.props;
    const { tabs } = this.state;

    const activeTabIndex = tabs.findIndex(item => item === true);

    const isTabsIsset = tabsContent && tabsContent.length &&
      tabs && tabs.length;

    const tabsProps = {
      activeTabIndex,
      tabs,
      onToggle: this.onToggle,
      onSetActive: this.onSetActive,
    };

    if (!isTabsIsset) {
      return null;
    }

    return (
      <Wrapper>
        {isUser ?
          <Greeting name={name} /> : 
          <Tabs {...tabsProps} />
        }
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  const { data, create } = user;
  const { login, token } = data;

  return ({
    name: login,
    isUser: token === getToken(),
    createdUser: create && create.data && create.data.login,
  }); 
};

const mapDispatchToProps = (dispatch, ownProps)  => ({
  getUser: () => dispatch(getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);