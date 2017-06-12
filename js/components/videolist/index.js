
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Thumbnail, Left, Body, Right, Item, Input, Card, CardItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image, View, StatusBar } from 'react-native';
import { openDrawer } from '../../actions/drawer';

import styles from './styles';
//import VideoListElement from './element'
import VideoElementList from './elementList'

const {
    popRoute,
} = actions;

class NHListThumbnail extends Component {

    constructor(props) {
      super(props);
      this.state = {
        searchText:"", // keep the search text typed in the Input box
      };
    }


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
            <StatusBar backgroundColor="black"/>
                <Header style={{ backgroundColor: '#aa0000' }} androidStatusBarColor="#000000">
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                            <Title>{this.props.playlist.title}</Title>
                    </Body>
                    <Right>
                            <Thumbnail circular size={30} source={{ uri: this.props.playlist.thumbnail}} />
                    </Right>
                </Header>
            {/*
                <Header searchBar rounded style={{ backgroundColor: '#ED1B24', textDecorationColor:"#fff" }}> 
                    <Item>

                    <Input
                      placeholder="Search"
                      ref= {(el) => { this.searchText = el; }}
                      onChangeText={(searchText) => this.setState({searchText})}
                      value={this.state.searchText} />
                    <Icon active name="search" onPress={() => {

                    }} />

                    </Item> 
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
            */}
                <Content>
                        <VideoElementList videos={this.props.playlist.videos}/> 
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
    //playlist: state.data.finalIssue.playlists[0] //Sample Playlist
});

export default connect(mapStateToProps, bindAction)(NHListThumbnail);

// <Content>
//    {this.props.playlist.videos.map( (video,i) =>{
//      return (
//        <VideoListElement video={video} key={i} />
//      );
//    })}
// </Content>
