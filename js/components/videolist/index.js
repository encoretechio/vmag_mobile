
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Thumbnail, Left, Body, Right, Item, Input, Card, CardItem} from 'native-base';
import { Actions } from 'react-native-router-flux';
import {Image, View} from 'react-native';
import {openDrawer} from '../../actions/drawer';

import styles from './styles';

const cardImage = require('../../../img/drawer-cover.png');
const sankhadeep = require('../../../img/contacts/sankhadeep.png');
const supriya = require('../../../img/contacts/supriya.png');
const himanshu = require('../../../img/contacts/himanshu.png');
const shweta = require('../../../img/contacts/shweta.png');
const shruti = require('../../../img/contacts/shruti.png');

const datas = [
    {
        img: sankhadeep,
        text: 'Sankhadeep',
        note: 'Its time to build a difference . .',
    },
];




const {
    popRoute,
} = actions;

class NHListThumbnail extends Component {

    static propTypes = {
        popRoute: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
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
                    <Title>List of Video</Title>
                    </Body>
                    <Right />
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
                <Card style={styles.mb}>
                  <CardItem cardBody>
                    <Image style={{ resizeMode: 'cover', width: null, height: 200, flex: 1 }} source={cardImage} />
                  </CardItem>

                  <CardItem>
                    <Body>
                    <Text>Story of My Life</Text>
                    <Text note>This is the story of my life</Text>
                    </Body>
                  </CardItem>

                  <CardItem style={{ paddingVertical: 3 }}>

                    <Left>
                      <Thumbnail circular size={55} source={sankhadeep} />
                      <Text>Category Type</Text>
                    </Left>
                    <Right>
                      <Text note>12.5k views</Text>
                    </Right>
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
        openDrawer: () => dispatch(openDrawer()),
    };
}


const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(NHListThumbnail);


