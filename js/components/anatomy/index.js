
import React, { Component } from 'react';
import { StatusBar, Image, View} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title,Content, Text, H3, Button, Icon, Footer, FooterTab, Left, Right, Body, Card, CardItem, Thumbnail} from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const cardImage = require('../../../img/drawer-cover.png');

class Anatomy extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    photos: React.PropTypes.array,
  }

  render() {

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>PHOTOS</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>

          {this.props.photos.slice(20,30).map(photo => {
            return(
              <Card style={styles.mb} key={photo.id}>
                <CardItem cardBody>
                  <Image style={{ resizeMode: 'cover', width: null, height: 200, flex: 1 }} source={photo.url} />
              </CardItem>
                <CardItem style={{ paddingVertical: 0 }}>
                  <Left>
                    <Button iconLeft transparent>
                      <Icon active name="thumbs-up" />
                      <Text> {photo.id} Likes</Text>
                    </Button>
                  </Left>
                  <Right>
                    <Button iconLeft transparent>
                      <Icon active name="chatbubbles" />
                      <Text> {photo.albumId} Comments</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            );
          })}

        </Content>

        <Footer>
          <FooterTab>
            <Button active full>
              <Text>FOOTER : {this.props.photos[60].id}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
  photos: state.data.photos,
});

export default connect(mapStateToProps, bindAction)(Anatomy);
