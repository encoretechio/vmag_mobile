import React, {Component} from 'react';
import {Image, Platform} from 'react-native';
import {connect} from 'react-redux';
import {
    Content,
    Text,
    List,
    ListItem,
    Icon,
    Container,
    Left,
    Right,
    Badge,
    Button,
    View,
    StyleProvider,
    getTheme,
    variables
} from 'native-base';
import {Actions} from 'react-native-router-flux';

import material from '../../../native-base-theme/variables/material';
import {changePlatform, changeMaterial, closeDrawer} from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import styles from './style';

const drawerCover = require('../../../img/drawer-cover.png');

const drawerImage = require('../../../img/logo-kitchen-sink.png');

const datas = [
    {
        name: 'Home',
        route: 'home',
        icon: 'home',
        bg: '#C5F442',
    },
    {
        name: 'All Videos',
        route: 'allVideosList',
        icon: 'videocam',
        bg: '#29783B',
    },
    {
        name: 'Favourites',
        route: 'favouriteVideosList',
        icon: 'film',
        bg: '#DA4437',
        types: '2',
    },
    {
        name: 'Unwatched',
        route: 'unwatchedVideosList',
        icon: 'film',
        bg: '#DA4437',
        types: '2',
    },
    {
        name: 'Watched',
        route: 'watchedVideosList',
        icon: 'film',
        bg: '#29783B',
        types: '2',
    },
    // {
    //     name: '--> Login',
    //     route: 'login',
    //     icon: 'home',
    //     bg: '#C5F442',
    // },
    // {
    //     name: '--> Video',
    //     route: 'video',
    //     icon: 'search',
    //     bg: '#C5F442',
    // },
    //     {
    //     name: '--> Video List',
    //     route: 'videolist',
    //     icon: 'search',
    //     bg: '#C5F442',
    // },
    // {
    //     name: '-->Welcome',
    //     route: 'welcome',
    //     icon: 'phone-portrait',
    //     bg: '#EB6B23',
    // },
    // {
    //     name: '-->Anatomy',
    //     route: 'anatomy',
    //     icon: 'phone-portrait',
    //     bg: '#C5F442',
    // },
    // {
    //     name: 'Header',
    //     route: 'header',
    //     icon: 'phone-portrait',
    //     bg: '#477EEA',
    //     types: '7',
    // },
    // {
    //     name: 'Footer',
    //     route: 'footer',
    //     icon: 'phone-portrait',
    //     bg: '#DA4437',
    //     types: '4',
    // },
    // {
    //     name: 'Badge',
    //     route: 'badge',
    //     icon: 'notifications',
    //     bg: '#4DCAE0',
    // },
    // {
    //     name: 'Button',
    //     route: 'button',
    //     icon: 'radio-button-off',
    //     bg: '#1EBC7C',
    //     types: '9',
    // },
    // {
    //     name: 'Card',
    //     route: 'card',
    //     icon: 'keypad',
    //     bg: '#B89EF5',
    //     types: '5',
    // },
    // {
    //     name: 'Check Box',
    //     route: 'checkbox',
    //     icon: 'checkmark-circle',
    //     bg: '#EB6B23',
    // },
    // {
    //     name: 'Deck Swiper',
    //     route: 'deckswiper',
    //     icon: 'swap',
    //     bg: '#3591FA',
    // },
    // {
    //     name: 'Fab',
    //     route: 'fab',
    //     icon: 'help-buoy',
    //     bg: '#EF6092',
    //     types: '2',
    // },
    // {
    //     name: 'Form & Inputs',
    //     route: 'form',
    //     icon: 'call',
    //     bg: '#EFB406',
    //     types: '13',
    // },
    // {
    //     name: 'Icon',
    //     route: 'icon',
    //     icon: 'information-circle',
    //     bg: '#EF6092',
    // },
    // {
    //     name: 'Layout',
    //     route: 'layout',
    //     icon: 'grid',
    //     bg: '#9F897C',
    //     types: '5',
    // },
    // {
    //     name: 'List',
    //     route: 'list',
    //     icon: 'lock',
    //     bg: '#5DCEE2',
    //     types: '7',
    // },
    // {
    //     name: 'Picker',
    //     route: 'picker',
    //     icon: 'arrow-dropdown',
    //     bg: '#F50C75',
    // },
    // {
    //     name: 'Radio',
    //     route: 'radio',
    //     icon: 'radio-button-on',
    //     bg: '#6FEA90',
    // },
    // {
    //     name: 'SearchBar',
    //     route: 'searchbar',
    //     icon: 'search',
    //     bg: '#29783B',
    // },
    // {
    //     name: 'Spinner',
    //     route: 'spinner',
    //     icon: 'navigate',
    //     bg: '#BE6F50',
    // },
    // {
    //     name: 'Tabs',
    //     route: 'tab',
    //     icon: 'home',
    //     bg: '#AB6AED',
    //     types: '2',
    // },
    // {
    //     name: 'Thumbnail',
    //     route: 'thumbnail',
    //     icon: 'image',
    //     bg: '#cc0000',
    // },
    // {
    //     name: 'Typography',
    //     route: 'typography',
    //     icon: 'paper',
    //     bg: '#48525D',
    // },

];
class SideBar extends Component {

    static propTypes = {
        navigateTo: React.PropTypes.func,
        themeState: React.PropTypes.string,
        changePlatform: React.PropTypes.func,
        changeMaterial: React.PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4,
        };
    }

    navigateTo(route) {
        this.props.navigateTo(route, 'home');
    }

    render() {
        return (
            <Container>
                <Content
                    bounces={false}
                    style={{ flex: 1, backgroundColor: '#fff', top: -1 }}
                >
                    <Image source={drawerCover} style={styles.drawerCover}>
                        <Image
                            square
                            style={styles.drawerImage}
                            source={drawerImage}
                        />
                    </Image>
                    {(Platform.OS === 'ios') &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <StyleProvider style={getTheme(variables)}>
                            <Button block rounded light onPress={this.props.changePlatform}>
                                <Text>Platform</Text>
                            </Button>
                        </StyleProvider>
                        <StyleProvider style={getTheme(material)}>
                            <Button block rounded onPress={this.props.changeMaterial}>
                                <Text>Material</Text>
                            </Button>
                        </StyleProvider>
                    </View>
                    }
                    <List
                        dataArray={datas} renderRow={data =>
              <ListItem button noBorder onPress={() => { Actions[data.route](); this.props.closeDrawer() }} >
                <Left>
                  <Icon active name={data.icon} style={{ color: '#777' , fontSize: 26, width: 30 }} />
                  <Text style={styles.text}>{data.name}</Text>
                </Left>
                {(data.types) &&
                <Right style={{ flex: 1 }}>
                  <Badge
                    style={{ borderRadius: 3, height: 25, width: 72, backgroundColor: data.bg }}
                  >
                    <Text style={styles.badgeText}>{`${data.types} Videos`}</Text>
                  </Badge>
                </Right>
                }
              </ListItem>}
                    />

                </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
        closeDrawer: () => dispatch(closeDrawer()),
        changePlatform: () => dispatch(changePlatform()),
        changeMaterial: () => dispatch(changeMaterial()),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(SideBar);
