
import React, { Component } from 'react';
import { Image , StatusBar, View} from 'react-native';
import {Header,Container, Button, H3, Text} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {loadLocalData} from '../../actions/local';
import {connect} from 'react-redux';

import styles from './styles';

const launchscreenBg = require('../../../img/background.jpg');
const launchscreenLogo = require('../../../img/zerogravity.jpg');

class SplashPage extends Component {

  static propTypes = {
    navigator: React.PropTypes.shape({}),
  }

  componentWillMount() {
    const navigator = this.props.navigator;
    setTimeout(() => {
      this.props.loadData()
    }, 500);
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container>
        <StatusBar backgroundColor="black"/>
        <Image source={launchscreenBg} style={styles.imageContainer}>
          <View style={styles.logoContainer}>
            <Image source={launchscreenLogo} style={styles.logo}/>
          </View>
        </Image>
      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
    loadData:()=>dispatch(loadLocalData())
  };
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, bindActions)(SplashPage);
