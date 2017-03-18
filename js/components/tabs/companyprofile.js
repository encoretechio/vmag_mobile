
import React, { Component } from 'react';

import {connect} from 'react-redux';
import { Container, Content, Card, CardItem, Text, Body, Button, Icon, IconNB, Left, Right, H1, H3, List, ListItem, Thumbnail } from 'native-base';

import {Image, View} from 'react-native';
import {openDrawer} from '../../actions/drawer';

import styles from './styles';

import VideoPlayerElement from '../video/player';
import VideoListElement from '../videolist/element';

const companyLogo = require('../../../img/zero_gravity_logo.png');
const cardImage = require('../../../img/drawer-cover.png');

const company_video = {
  src: "http://techslides.com/demos/sample-videos/small.mp4",
  likes: 152,
  comments: 10,
  hours: 23
};

const Title = ({company}) => {
  return (

    <Content>
      <Card style={styles.mb15}>
        <CardItem style={{ paddingVertical: 3 }}>
          <Left>
            <Thumbnail square size={30} source={companyLogo} />
            <Text>{company.name}</Text>
          </Left>
        </CardItem>
        <CardItem>
          <Text>Website</Text>
          <Right>
            <Text>{company.website}</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Text>Contact</Text>
          <Right>
            <Text>{company.contact}</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Text>Email</Text>
          <Right>
            <Text>{company.email}</Text>
          </Right>
        </CardItem>
      </Card>
    </Content>
  );
}


class CompanyProfile extends Component { // eslint-disable-line

  render() { // eslint-disable-line
    const user_props = this.props.user;
    return (
      <Content padder style={{ marginTop: 0 }}>

        <Title company={company_props} />
        <VideoPlayerElement video={company_video} />

        <VideoListElement />
        <VideoListElement />
      </Content>
    );
  }
}

const company_props = {
  name: "Zero Gravity Creatives",
  website: "www.zerogravitycreatives.com",
  contact: "+94777333098",
  email: "info@zerogravitycreatives.com",
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
