import React, {Component} from 'react';
import {Image, View, StatusBar, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Container, Button, H3, Text} from 'native-base';

import {openDrawer} from '../../actions/drawer';
import {login} from '../../actions/api';
import styles from './styles';

const launchscreenBg = require('../../../img/background.jpg');
const launchscreenLogo = require('../../../img/logo-kitchen-sink.png');

class Home extends Component { // eslint-disable-line

  constructor(props) {
    super(props);
    this.state = {
      username: 'wathsalaruberu@gmail.com',
      password: "123456"
    };
  }

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
            {/*<H3 style={styles.text}>Login</H3>*/}
            <Button
              style={{ backgroundColor: '#000099', alignSelf: 'center' }}
              onPress={this.props.openDrawer}
            >
              <Text>Open Drover</Text>
            </Button>
          </View>
          <View style={{ marginBottom: 80 }}>


            <TextInput style={{height: 40, width:200, borderColor: 'gray', borderWidth: 1, alignSelf: 'center'}}
                       onChangeText={(username) => this.setState({username})}
                       value={this.state.username}/>
            <TextInput secureTextEntry={true} style={{height: 40, width:200, borderColor: 'gray', borderWidth: 1, alignSelf: 'center'}}
                       onChangeText={(password) => this.setState({password})}
                       value={this.state.password}/>
            <Button
              style={{ backgroundColor: '#000099', alignSelf: 'center' }}
              onPress={()=>this.props.login(this.state.username, this.state.password)}
            >
              <Text>Login</Text>
            </Button>


            {/*<Text  style={{ alignSelf: 'center' }}>{this.props.playlistCount}</Text>*/}
            {/*<Text>{this.props.token}</Text>*/}

          </View>
        </Image>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    login: (username, password) => dispatch(login(username, password)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
  routes: state.drawer.routes,
  token: state.data.token,
  playlistCount: state.data.userData ? state.data.userData.playlists.length : 0
});

export default connect(mapStateToProps, bindActions)(Home);