
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {Image, View} from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, List, ListItem, Content, Text , Card, CardItem, Thumbnail} from 'native-base';
import { Actions } from 'react-native-router-flux';

import styles from './styles';
import { openDrawer, closeDrawer } from '../../actions/drawer';

import VideoPlayerElement from '../video/player';

const logo = require('../../../img/logo.png');
const cardImage = require('../../../img/drawer-cover.png');
const coverStory = require('../../../img/swiper-3.png');

const {
    pushRoute,
} = actions;
const datas = [
    {
        route: 'videolist',
        text: 'Eat Healthly',
    },
    {
        route: 'multipleFab',
        text: 'Be Active',
    },
    {
        route: 'basicFab',
        text: 'Eat Healthly',
    },
];

const cover_video = {
  src: "http://techslides.com/demos/sample-videos/small.mp4",
  likes: 30,
  comments: 2,
  hours: 1
};

class Home extends Component {

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

              <Content>
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail source={{uri: 'https://www.jjquilling.co.uk/wp-content/uploads/2013/10/Salmon-Single-Colour-Quilling-Strips.png'}} />
                      <Body>
                        <Text>Cover</Text>
                        <Text>Story</Text>
                      </Body>
                    </Left>
                  </CardItem>

                  <VideoPlayerElement video={cover_video}/>
                </Card>

                <List
                    dataArray={datas} renderRow={data =>
                    <ListItem button onPress={() => { Actions[data.route](); this.props.closeDrawer() }} >
                        <Left>
                          <Thumbnail circular size={30} source={coverStory} />
                          <Text>{data.text}</Text>
                        </Left>
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

export default connect(mapStateToProps, bindAction)(Home);
