import React, { Component } from 'react';
import { Content, List, ListItem, Text, Thumbnail, Left, Body, Card, CardItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { startSpinner } from '../../actions/loading';
import {navigateToVideo} from '../../actions/local'

import styles from './styles';

class VideoElementList extends Component {

    render(){
        return (
            <List
                dataArray={this.props.videos} renderRow={video =>
                  <ListItem thumbnail style={{height:120}} button onPress={() => { 
                    this.props.startSpinner();
                    setTimeout(()=>this.props.navigateToVideo(video),100);}}>
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

function bindActions(dispatch) {
  return {
    startSpinner:()=>dispatch(startSpinner()),
    navigateToVideo:(video)=>dispatch(navigateToVideo(video))
  };
}

export default connect(null,bindActions)(VideoElementList);
