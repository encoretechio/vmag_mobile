import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Button, Icon, Tabs, Tab, Text, Right, Left, Body, TabHeading, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { actions } from 'react-native-navigation-redux-helpers';
import myTheme from '../../themes/base-theme';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import {Image} from 'react-native';
import styles from './styles';

import Issue from './issue';
import CompanyProfile from './companyprofile';
import Profile from './profile';
import SideBar from './sideBar';

const zeroGravityWhiteLogo = require('../../../img/zero_gravity_logo_white.png');

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
      <Header  style={{ backgroundColor: '#aa0000' }} androidStatusBarColor="#000000" iosBarStyle="light-content" hasTabs>
     {/*   <Left>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="menu" />
          </Button>
        </Left> */}
        <Left>
          <Image style ={styles.logo} source={zeroGravityWhiteLogo} />
        </Left>
        <Right />
      </Header>
        <Tabs>
          <Tab heading={<TabHeading style={{ backgroundColor: '#ED1B24'}}><Icon name="home" style={{ color: '#FFFFFF', textDecorationColor:"#fff" }} /></TabHeading>}>
            <Issue />
          </Tab>
          <Tab heading={<TabHeading style={{ backgroundColor: '#ED1B24' }}><Icon name="ios-book" style={{ color: '#FFFFFF' }}  /></TabHeading>}>
            <CompanyProfile />
          </Tab>
          <Tab heading={<TabHeading style={{ backgroundColor: '#ED1B24' }}><Icon name="person" style={{ color: '#FFFFFF' }} /></TabHeading>}>
            <Profile />
          </Tab>
          <Tab heading={<TabHeading style={{ backgroundColor: '#ED1B24' }}><Icon name="menu" style={{ color: '#FFFFFF' }} /></TabHeading>}>
            <SideBar />
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
