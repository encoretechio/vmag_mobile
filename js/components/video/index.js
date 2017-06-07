
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
import { fetchComments } from '../../actions/api';

import VideoPlayerElement from './player';
import Comment from './comment';

const logo = require('../../../img/logo.png');
const cardImage = require('../../../img/drawer-cover.png');

const {
    pushRoute,
} = actions;

class VideoView extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        pushRoute: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
    }

    pushRoute(route) {
        this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
    }

    componentDidMount(){
      this.props.fetchComments(this.props.video.id);
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header style={{ backgroundColor: '#ED1B24' }}>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>

                    <Body>
                    <Title>{this.props.video.title}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                  <VideoPlayerElement video={this.props.video}/>
                  <CardItem>
                      <Comment videoId={this.props.video.id} userId={this.props.userId}/>
                  </CardItem>
                </Content>

            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        closeDrawer: () => dispatch(closeDrawer()),
        pushRoute: (route, key) => dispatch(pushRoute(route, key)),
        fetchComments: (videoId) => dispatch(fetchComments(videoId))
    };
}

function mapStateToProps(state,ownProps) {
   const data = state.data;
    return{
      navigation: state.cardNavigation,
      themeState: state.drawer.themeState,
      video: state.data.currentVideo,
      userId: state.data.user.id
    }
};

export default connect(mapStateToProps, bindAction)(VideoView);
