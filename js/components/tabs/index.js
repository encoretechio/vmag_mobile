import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Button, Icon, Tabs, Tab, Text, Right, Left, Body, TabHeading } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { actions } from 'react-native-navigation-redux-helpers';
import myTheme from '../../themes/base-theme';
import { openDrawer, closeDrawer } from '../../actions/drawer';

import Issue from './issue';
import CompanyProfile from './companyprofile';
import Profile from './profile';

const {
  popRoute,
} = actions;

class MainTabs extends Component {  // eslint-disable-line

  static propTypes = {
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    return (
      <Container>
      <Header  style={{ backgroundColor: '#ffeb38' }} androidStatusBarColor="#ffeb38" iosBarStyle="light-content" hasTabs>
        <Left>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>V_Mag</Title>
        </Body>
        <Right />
      </Header>
        <Tabs>
          <Tab heading={<TabHeading style={{ backgroundColor: '#ffca0c'}}><Icon name="home" style={{ color: '#ffe896', textDecorationColor:"#fff" }} /></TabHeading>}>
            <Issue />
          </Tab>
          <Tab heading={<TabHeading style={{ backgroundColor: '#ffca0c' }}><Icon name="ios-book" style={{ color: '#ffe896' }}  /></TabHeading>}>
            <CompanyProfile />
          </Tab>
          <Tab heading={<TabHeading style={{ backgroundColor: '#ffca0c' }}><Icon name="person" style={{ color: '#ffe896' }} /></TabHeading>}>
            <Profile />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    closeDrawer: () => dispatch(closeDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(MainTabs);
