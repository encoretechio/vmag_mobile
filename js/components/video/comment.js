import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Body, Left, Right, ListView, Thumbnail, H3 } from 'native-base';
import { Actions } from 'react-native-router-flux';

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
            <Container style={styles.container}>

                <Content padder>
                    <Card>
                        <CardItem>
                            <Thumbnail square size={50} source={logo} style={styles.mb5} />
                            <Text>   </Text>
                            <Text>Wathsala Ruberu</Text>
                        </CardItem>
                        <CardItem>
                            <Text>
                                This video is really awesome, NativeBase builds a layer on top of React Native that provides you with
                                basic set of components for mobile application development.
                                basic set of components for mobile application development.
                            </Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header>
                            <Thumbnail square source={logo} style={styles.mb5} />
                            <Text>   </Text>
                            <Text>Ravindu Hasantha</Text>
                        </CardItem>
                        <CardItem>
                            <Text>
                                This is really informative and motivative. NativeBase builds a layer on top of React Native that provides you with
                                basic set of components for mobile application development.
                                basic set of components for mobile application development.
                            </Text>
                        </CardItem>
                    </Card>

                </Content>
            </Container>
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
