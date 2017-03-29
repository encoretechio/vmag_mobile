import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Body, Left, Right, ListView, Thumbnail, H3, Item, Input} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image, View } from 'react-native';

import styles from './styles';

const logo = require('../../../img/splashscreen.png');
const cover = require('../../../img/web-cover1.jpg');

const {
    popRoute,
} = actions;

class Comment extends Component {

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
                <View>
                  <Card>
                    <Item regular>
                      <Input placeholder="Comment Here" />
                      <Button style={styles.mb5}>
                          <Text>Comment</Text>
                      </Button>
                    </Item>
                  </Card>

                  <Card>
                      <CardItem>
                            <Left>
                              <Image style={{width:40, height: 40}} source={logo} />
                              <Text numberOfLines={1}> Wathsala Ruberu </Text>
                            </Left>
                      </CardItem>
                      <CardItem>
                          <Text numberOfLines={4} note>
                              This video is really awesome, NativeBase builds a layer on top of React Native that provides you with
                          </Text>
                      </CardItem>
                  </Card>

                  <Card>
                      <CardItem>
                            <Left>
                              <Image style={{width:40, height: 40}} source={logo} />
                              <Text numberOfLines={1}> Wathsala Ruberu </Text>
                            </Left>
                      </CardItem>
                      <CardItem>
                          <Text numberOfLines={4} note>
                              This video is really awesome, NativeBase builds a layer on top of React Native that provides you with
                          </Text>
                      </CardItem>
                  </Card>
                </View>
        );
    }
}

function bindAction(dispatch) {
    return {
        popRoute: key => dispatch(popRoute(key)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    themeState: state.drawer.themeState,
    //comments: state.data.company.comments
});

export default connect(mapStateToProps, bindAction)(Comment);
