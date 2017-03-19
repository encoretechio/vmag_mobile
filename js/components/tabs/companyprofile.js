
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Content, Card, CardItem, Text, Left, Right, List, Thumbnail } from 'native-base';

import {openDrawer} from '../../actions/drawer';
import styles from './styles';
import VideoPlayerElement from '../video/player';
import VideoListElement from '../videolist/element';

const companyLogo = require('../../../img/zero_gravity_logo.png');

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

        <Title company={this.props.company} />
        <VideoPlayerElement video={this.props.company.video} />

        <VideoListElement />
        <VideoListElement />
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
  company: state.data.company
});

export default connect(mapStateToProps, bindActions)(CompanyProfile);
