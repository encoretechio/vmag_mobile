import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Thumbnail, Left, Body, Right, Item, Input, Card, CardItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import {Image, View} from 'react-native';
import {openDrawer} from '../../actions/drawer';

import styles from './styles';

const cardImage = require('../../../img/drawer-cover.png');
const sankhadeep = require('../../../img/contacts/sankhadeep.png');
const supriya = require('../../../img/contacts/supriya.png');

export default class VideoListElement extends Component {

    render(){
        return (
            <Card style={styles.mb}>
              <CardItem cardBody>
                <Image style={{ resizeMode: 'cover', width: null, height: 200, flex: 1 }} source={{uri : this.props.video.thumbnail}} />
              </CardItem>

              <CardItem>
                <Body>
                <Text>{this.props.video.title}</Text>
                <Text note>{this.props.video.description}</Text>
                </Body>
                <Right>
                  <Text note>12.5k views</Text>
                </Right>
              </CardItem>
            </Card>
        );
    }
}
