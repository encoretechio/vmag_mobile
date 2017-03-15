import React, {Component} from 'react';
import {Image, View, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Container, Button, H3, Text} from 'native-base';

import {openDrawer} from '../../actions/drawer';
import {login} from '../../actions/api';
import styles from './styles';

const launchscreenBg = require('../../../img/background.jpg');
const launchscreenLogo = require('../../../img/logo-kitchen-sink.png');

class Home extends Component { // eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle='light-content'/>
        <Image source={launchscreenBg} style={styles.imageContainer}>
          <View style={styles.logoContainer}>
            <Image source={launchscreenLogo} style={styles.logo}/>
          </View>
          <View style={{ alignItems: 'center', marginBottom: 50, backgroundColor: 'transparent'}}>
            {/*<H3 style={styles.text}>Welcome to</H3>*/}
            {/*<View style={{ marginTop: 8 }} />*/}
            <H3 style={styles.text}>Login</H3>
          </View>
          <View style={{ marginBottom: 80 }}>
            <Text>{this.props.playlistCount}</Text>
            <Button
              style={{ backgroundColor: '#000099', alignSelf: 'center' }}
              onPress={this.props.openDrawer}
            >
              <Text>Open Drover</Text>
            </Button>
            <Text>{this.props.token}</Text>
            <Button
              style={{ backgroundColor: '#000099', alignSelf: 'center' }}
              onPress={this.props.login}
            >
              <Text>Login</Text>
            </Button>
          </View>
        </Image>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    login: () => dispatch(login()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
  routes: state.drawer.routes,
  token: state.data.token,
  playlistCount: state.data.userData?state.data.userData.playlists.length:0
});

export default connect(mapStateToProps, bindActions)(Home);
