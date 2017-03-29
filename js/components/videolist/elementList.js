import React, { Component } from 'react';
import { Content, List, ListItem, Text, Thumbnail, Left, Body, Card, CardItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';

import styles from './styles';

export default class VideoElementList extends Component {

    render(){
        return (
            <List
                dataArray={this.props.videos} renderRow={video =>
                  <ListItem thumbnail style={{height:120}} button onPress={() => { Actions.video({video:video});}}>
                    <Left>
                      <Image style={{width:150, height: 80}} source={{uri : video.thumbnail}} />
                    </Left>
                    <Body>
                      <Text>{video.title}</Text>
                      <Text numberOfLines={1} note>{video.description}</Text>
                    </Body>
                  </ListItem>
              }
              />
          );
    }
}
