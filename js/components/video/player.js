import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {Image, View} from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, List, ListItem, Content, Text , Card, CardItem, Thumbnail} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import {MediaControls, PLAYER_STATE} from 'react-native-media-controls';

import styles from './styles';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import { stopSpinner} from '../../actions/loading';
import { addWatchedVideo, addFavoriteVideo } from '../../actions/api';

class VideoPlayerElement extends Component {
  constructor(props) {
    super(props);

    this.exitFullScreen = this.exitFullScreen.bind(this);
    this.onFullScreen = this.onFullScreen.bind(this);
    this.onSeek = this.onSeek.bind(this);
    this.onPaused = this.onPaused.bind(this);
    this.onReplay = this.onReplay.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.state = {
      isLoading: true,
      isFullScreen: true,
      playerState: PLAYER_STATE.PLAYING,
      paused: false,
      currentTime: 0,
      duration: 0,
    }
    // keep state about favorite - get data
  }

  onSeek(seek) {
    this.player.seek(seek);
  };

  onPaused() {
    this.setState({
      paused: !this.state.paused,
      playerState: !this.state.paused ? PLAYER_STATE.PAUSED : PLAYER_STATE.PLAYING
    });
  };

  onReplay() {
    this.setState({playerState: PLAYER_STATE.PLAYING});
    this.player.seek(0);
  }

  onProgress(data) {
    if (this.state.isLoading) return null;
    this.setState({currentTime: data.currentTime});
  };

  onLoad(data) {
    this.setState({duration: data.duration, isLoading: false});
  };

  onLoadStart(data) {
    this.setState({isLoading: true});
  };

  onEnd() {
    this.setState({playerState: PLAYER_STATE.ENDED});
  };

  onError() {
    //console.log("error", error);
  };

  exitFullScreen() {
    this.setState({isFullScreen: false});
  };

  enterFullScreen() {
    this.setState({isFullScreen: true});
  }

  onFullScreen() {
    this.setState({isFullScreen: true});
  };

  componentDidMount(){
    this.props.stopSpinner();
  }

  clickFavorite(){
    this.props.addFavorite(this.props.user.id, this.props.video.id);
    console.log("click fav", this.props.user.id, this.props.video.id);
  }

    /*
    constructor(props){
      super(props);
      this.state = {  isLiked: false };

      //console.log(this.props.liked);
      // Loop through liked videos to check whether this videdo is watched.
      if(this.props.liked.find( (id) => id == this.props.video.id ) != undefined){
        this.state = {  isLiked: true };
      }
    }

    clickLike(){
      if(this.state.isLiked){
        //console.log('Unlike Now');
        this.props.video.likes -= 1;
      }
      else{
        //console.log('Like Now');
        this.props.video.likes += 1;
      }
      this.state.isLiked = ~this.state.isLiked;
    }
    */
    renderToolbar() {
    return (
      <View style={styles.toolbar}></View>
    );
    }

    render(){
        return (

          <Card>
                <CardItem cardBody style={{
                  flex: 1,
                  height: 300,
                }}>
                      {/*<VideoPlayer
                          source={{uri:this.props.video.src }}
                          navigator={ this.props.navigator }
                          style={styles.backgroundVideo}
                          resizeMode={ 'contain' }
                          seekColor={ '#FFF' }
                          onEnd = { this.props.onEnd(this.props.user.id,this.props.video.id)}
                          onStart = { () => { //console.log("starts");}}
                      />*/}
                      <Video
                        ref={(ref) => {
                           this.player = ref
                         }}
                        style={styles.backgroundVideo}
                        resizeMode="cover"
                        source={{uri:this.props.video.src}}
                        volume={1.0}
                        paused={this.state.paused}
                        onEnd={this.onEnd}
                        onLoad={this.onLoad}
                        onLoadStart={this.onLoadStart}
                        onProgress={this.onProgress}
                      />
                      <MediaControls
                        mainColor="orange"
                        toolbar={this.renderToolbar()}
                        playerState={this.state.playerState}
                        isLoading={this.state.isLoading}
                        isFullScreen={this.state.isFullScreen}
                        progress={this.state.currentTime}
                        duration={this.state.duration}
                        onPaused={this.onPaused}
                        onSeek={this.onSeek}
                        onReplay={this.onReplay}
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
                        <Button iconLeft transparent onPress={() => {this.clickFavorite();} }>
                            <Icon active name="star-half" />
                            <Text> Add Favorite </Text>
                        </Button>
                    </Right>
                </CardItem>
            </Card>

        );
    }
}

const mapStateToProps = state => ({
  user: state.data.user
});

function bindActions(dispatch) {
  return {
    stopSpinner:()=>dispatch(stopSpinner()),
    onEnd : (userID,videoID) => dispatch(addWatchedVideo(userID,videoID)),
    addFavorite : (userID,videoID) => dispatch(addFavoriteVideo(userID,videoID))
  };
}

export default connect(mapStateToProps,bindActions)(VideoPlayerElement);
