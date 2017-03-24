
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {Image, View} from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, List, ListItem, Content, Text , Card, CardItem, Thumbnail} from 'native-base';
import { Actions } from 'react-native-router-flux';

import styles from './styles';
import { openDrawer, closeDrawer } from '../../actions/drawer';

import VideoPlayerElement from '../video/player';

class Home extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
        cover: React.PropTypes.object,
    }

    render() {
      if(!this.props.cover || !this.props.playlists ) return null;
        return (
            <Container style={styles.container}>

              <Content>
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail source={{uri: this.props.cover.thumbnail}} />
                      <Body>
                        <Text>Cover</Text>
                        <Text>Story</Text>
                      </Body>
                    </Left>
                  </CardItem>

                  {/*<VideoPlayerElement video={this.props.cover}/>*/}
                </Card>

                <List style ={{marginBottom: 100}}
                    dataArray={this.props.playlists} renderRow={playlist =>
                    <ListItem button onPress={() => { Actions.videolist({playlist:playlist}); this.props.closeDrawer() }} >
                        <Left>
                          <Thumbnail circular size={30} source={{ uri: playlist.thumbnail}} />
                          <Text>{playlist.title}</Text>
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
        closeDrawer: () => dispatch(closeDrawer())
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    themeState: state.drawer.themeState,
    cover: state.data.cover,
    playlists: state.data.playlists,
});

export default connect(mapStateToProps, bindAction)(Home);
