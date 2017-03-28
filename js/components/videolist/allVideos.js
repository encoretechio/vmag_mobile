
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, View, Thumbnail, Left, Body, Right, Item, Input, Card, CardItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image} from 'react-native';
import { openDrawer } from '../../actions/drawer';

import SearchBar from 'react-native-searchbar';

import styles from './styles';
import VideoElementList from './elementList'

const {
    popRoute,
} = actions;

class AllVideosComponent extends Component {

    constructor(props) {
    super(props);
    this.state = {
      items,
      results: []
    };
    this._handleResults = this._handleResults.bind(this);
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

    _handleResults(results) {
      this.setState({ results });
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
<View>
                <SearchBar
                  ref={(ref) => this.searchBar = ref}
                  data={items}
                  handleResults={this._handleResults}
                  showOnLoad
                />
</View>
                <Header searchBar rounded>
                    <Item>
                        <Icon active name="search" />
                        <Input placeholder="Search.." />
                        <Icon active name="people" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>

                <Content>
<SearchBar
                  ref={(ref) => this.searchBar = ref}
                  data={items}
                  handleResults={this._handleResults}
                  showOnLoad
                />
                {this.props.playlists.map( (playlist,i) =>{
                    return (
                        <Card style={styles.mb} key={i}>
                            <CardItem style={{ paddingVertical: 3 }}>
                                <Left>
                                    <Thumbnail circular size={55} source={{uri:playlist.thumbnail}} />
                                    <Text>{playlist.title}</Text>
                                </Left>
                            </CardItem>

                            <VideoElementList playlist={playlist} />
                        </Card>
                    );
                  })}

                </Content>
            </Container>
        );
    }
}

const items = [
  1337,
  'janeway',
  {
    lots: 'of',
    different: {
      types: 0,
      data: false,
      that: {
        can: {
          be: {
            quite: {
              complex: {
                hidden: [ 'gold!' ],
              },
            },
          },
        },
      },
    },
  },
  [ 4, 2, 'tree' ],
];

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
