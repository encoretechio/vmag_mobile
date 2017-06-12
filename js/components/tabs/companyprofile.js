
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Content, Card, CardItem, Text, Left, Right, List, Thumbnail } from 'native-base';

import {openDrawer} from '../../actions/drawer';
import styles from './styles';
import VideoPlayerElement from '../video/player';
import VideoListElement from '../videolist/element';
import {Image} from 'react-native';

const companyLogo = require('../../../img/zero_gravity_logo.png');

const Title = ({company}) => {
  return (

    <Content>
      <Card style={styles.mb15}>
        <CardItem style={{ paddingVertical: 3 }}>
          <Left>
            <Image style={styles.logo} source={companyLogo} />
            <Text>{company.name}</Text>
          </Left>
        </CardItem>
        <CardItem>
          <Text>Website</Text>
          <Right>
            <Text>www.zerogravity.lk</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Text>Contact</Text>
          <Right>
            <Text>+947123456786</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Text>Email</Text>
          <Right>
            <Text>zerogravity@gmail.com</Text>
          </Right>
        </CardItem>
      </Card>
    </Content>
  );
}

class CompanyProfile extends Component { // eslint-disable-line

  render() { // eslint-disable-line
    const company = this.props.user.company;
    return (
      <Content padder style={{ marginTop: 0 }}>

        <Title company={company} />
        <VideoPlayerElement video={company.video} />
      </Content>
    );
  }
}

function bindActions(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  user: state.data.user,
});

export default connect(mapStateToProps, bindActions)(CompanyProfile);
