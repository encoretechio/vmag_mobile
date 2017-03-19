
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Thumbnail, Left, Body, Right, Item, Input, Card, CardItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image, View } from 'react-native';
import { openDrawer } from '../../actions/drawer';

import styles from './styles';

const cardImage = require('../../../img/drawer-cover.png');
const sankhadeep = require('../../../img/contacts/sankhadeep.png');
const supriya = require('../../../img/contacts/supriya.png');

import VideoListElement from './element'

const videos = [
    {
        img: sankhadeep,
        text: 'Sankhadeep',
        note: 'Its time to build a difference . .',
    },
    {
        img: supriya,
        text: 'Supriya',
        note: 'Its time to build...',
    },
];

const {
    popRoute,
} = actions;

class AllVideosComponent extends Component {

    static propTypes = {
        popRoute: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
        playlist: React.PropTypes.object,
    }

    popRoute() {
        this.props.popRoute(this.props.navigation.key);
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
                            <Title>All Videos</Title>
                    </Body>
                </Header>
                <Header searchBar rounded>
                    <Item>
                        <Icon active name="search" />
                        <Input placeholder="Search" />
                        <Icon active name="people" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>

                <Content>

                {this.props.playlists.map(playlist =>{
                    return (
                        <Card style={styles.mb}>
                            <CardItem style={{ paddingVertical: 3 }}>
                                <Left>
                                    <Thumbnail circular size={55} source={{uri:playlist.thumbnail}} />
                                    <Text>{playlist.title}</Text>
                                </Left>
                            </CardItem>
                            
                            <List
                                dataArray={playlist.videos} renderRow={data =>
                                  <ListItem thumbnail style={{height:120}}>
                                    <Left>
                                      <Image style={{width:150, height: 80}} source={{uri : data.thumbnail}} />
                                    </Left>
                                    <Body>
                                      <Text>{data.title}</Text>
                                      <Text numberOfLines={1} note>{data.description}</Text>
                                    </Body>
                                  </ListItem>
                              }
                              />


                        </Card>


                    );
                  })}

                </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        popRoute: key => dispatch(popRoute(key)),
        openDrawer: () => dispatch(openDrawer())
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    themeState: state.drawer.themeState,
    playlists: state.data.playlists //Sample Playlist
});

export default connect(mapStateToProps, bindAction)(AllVideosComponent);
