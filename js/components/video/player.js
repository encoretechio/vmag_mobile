import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {Image, View} from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, List, ListItem, Content, Text , Card, CardItem, Thumbnail} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

import styles from './styles';
import { openDrawer, closeDrawer } from '../../actions/drawer';

export default class VideoPlayerElement extends Component {

    render(){
        return (

          <Card style={styles.mb}>
                <CardItem cardBody style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <VideoPlayer
                    source={{uri:this.props.video.src }}
                    navigator={ this.props.navigator }
                    style={styles.backgroundVideo}
                    resizeMode={ 'contain' }
                    seekColor={ '#FFF' }
                    paused={ true }
                />
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


                <CardItem style={{ paddingVertical: 0 }}>
                    <Left>
                        <Button iconLeft transparent>
                            <Icon active name="thumbs-up" />
                            <Text> {this.props.video.likes} Likes</Text>
                        </Button>
                    </Left>
                    <Body>
                    <Button iconLeft transparent>
                        <Icon active name="chatbubbles" />
                        <Text> {this.props.video.comments} Comments</Text>
                    </Button>
                    </Body>
                    <Right>
                        <Text> {this.props.video.hours}h ago</Text>
                    </Right>
                </CardItem>
            </Card>

        );
    }
}
