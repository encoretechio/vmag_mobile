
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem,H1, Text, View, Thumbnail, Left, Body, Right, Item, Input, Card, CardItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image} from 'react-native';
import { openDrawer } from '../../actions/drawer';

import styles from './styles';
import VideoElementList from './elementList'

const {
    popRoute,
} = actions;

class FavouriteVideosComponent extends Component {

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
                <Header style={{ backgroundColor: '#ffeb38' }}>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                            <Title>Favourite Videos</Title>
                    </Body>
                </Header>



                <Header searchBar rounded style={{ backgroundColor: '#ffca0c', textDecorationColor:"#fff" }}>
                  <Item>
                {/* Input box for search */}
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

                <Content>

                {this.props.playlists.map( (playlist,i) =>{
                    {/* filter watched videos */}
                    const filteredFavouriteVideos = playlist.videos.filter((video)=>{
                        return this.props.favouriteVideos.indexOf(video.id) >= 0;
                    });

                    {/* filtered videos list for search */}
                    const filteredSearchVideos = filteredFavouriteVideos.filter((video)=>{
                        {/* return all videos if search text is empty */}
                        if(this.state.searchText==="") return true;
                        else if (video.title.toLowerCase().indexOf(this.state.searchText.toLowerCase()) >= 0) {
                          return video;
                        };
                    });

                    {/* if no match return null to avoid showing category */}
                    if(filteredSearchVideos.length===0) return null;

                    return (
                        <Card style={styles.mb} key={i}>
                            <CardItem style={{ paddingVertical: 3 }}>
                                <Left>
                                    <Thumbnail circular size={55} source={{uri:playlist.thumbnail}} />
                                    <Text>{playlist.title}</Text>
                                </Left>
                            </CardItem>

                            <VideoElementList videos={filteredSearchVideos} />
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
    playlists: state.data.playlists, //Sample Playlist
    favouriteVideos: state.data.user.favoriteVideos
});

export default connect(mapStateToProps, bindAction)(FavouriteVideosComponent);
