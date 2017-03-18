
import React, { Component } from 'react';

import {connect} from 'react-redux';
import { Container, Content, Card, CardItem, Text, Body, Button, Icon, IconNB, Left, Right, H1, List, ListItem } from 'native-base';
 
import {Image, View} from 'react-native';
import {openDrawer} from '../../actions/drawer';

import styles from './styles';

const profilePic = require('../../../img/profilepic.jpg');

const Title = ({name}) => {
  return (
    <View style={styles.centerContent}>
      <H1 style={styles.mb10}>{name}</H1>
    </View>
  );
}

const datas = [
  {
    route: 'default',
    text: 'Favourite Videos',
  },
  {
    route: 'outline',
    text: 'Watched Videos',
  },
];

class Profile extends Component { // eslint-disable-line

  render() { // eslint-disable-line
    const user_props = this.props.user;
    return (
      <Content padder style={{ marginTop: 0 }}>
        
        <Title name={user_props.firstName+" "+user_props.lastName}/>
        <View style={styles.centerContent}>
          <Image 
            style={styles.profileImage} 
            source={profilePic} />
        </View>

        <Card style={styles.mb15}>
          <CardItem header bordered>
            <Text>
              Info
            </Text>
          </CardItem>
          <CardItem>
            <Text>Username</Text>
            <Right>
              <Text>{user_props.username}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Text>Employee ID</Text>
            <Right>
              <Text>{user_props.id}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Text>Email</Text>
            <Right>
              <Text>{user_props.email}</Text>
            </Right>
          </CardItem>
        </Card>

        <Card style={{ flex: 0 }}>
            <List
              dataArray={datas} renderRow={data =>
                <ListItem button onPress={() => { Actions[data.route](); this.props.closeDrawer() }} >
                  <Text>{data.text}</Text>
                  <Right>
                    <Icon name="arrow-forward" style={{ color: '#999' }} />
                  </Right>
                </ListItem>
              }
            />

        </Card>
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

export default connect(mapStateToProps, bindActions)(Profile);