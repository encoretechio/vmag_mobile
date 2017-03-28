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

class VideoPlayerElement extends Component {

    /*
    constructor(props){
      super(props);
      this.state = {  isLiked: false };

      console.log(this.props.liked);
      // Loop through liked videos to check whether this videdo is watched.
      if(this.props.liked.find( (id) => id == this.props.video.id ) != undefined){
        this.state = {  isLiked: true };
      }
    }

    clickLike(){
      if(this.state.isLiked){
        console.log('Unlike Now');
        this.props.video.likes -= 1;
      }
      else{
        console.log('Like Now');
        this.props.video.likes += 1;
      }
      this.state.isLiked = ~this.state.isLiked;
    }
    */

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

const mapStateToProps = state => ({
  //liked: state.data.liked
});

export default connect(mapStateToProps)(VideoPlayerElement);
