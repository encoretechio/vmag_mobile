
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



const logo = require('../../../img/logo.png');
const cardImage = require('../../../img/drawer-cover.png');

const {
    pushRoute,
} = actions;
const datas = [
    {
        route: 'basicFab',
        text: 'Basic FAB',
    },
    {
        route: 'multipleFab',
        text: 'Multiple FABs',
    },
];
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


    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>

                    <Body>
                    <Title>Single Video View Page</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>

                  <Card style={styles.mb}>
                        <CardItem cardBody style={{
                          flex: 1,
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <VideoPlayer
                            source={require("./sample.mp4")}
                            navigator={ this.props.navigator }
                            style={styles.backgroundVideo}
                            resizeMode={ 'contain' }
                            seekColor={ '#FFF' }
                        />

                        </CardItem>

                        <CardItem style={{ paddingVertical: 0 }}>
                            <Left>
                                <Button iconLeft transparent>
                                    <Icon active name="thumbs-up" />
                                    <Text>12 Likes</Text>
                                </Button>
                            </Left>
                            <Body>
                            <Button iconLeft transparent>
                                <Icon active name="chatbubbles" />
                                <Text>4 Comments</Text>
                            </Button>
                            </Body>
                            <Right>
                                <Text>11h ago</Text>
                            </Right>
                        </CardItem>
                    </Card>

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
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(VideoView);
