import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Body, Left, Right, ListView, Thumbnail, H3, Item, Input, ListItem, List } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image, View } from 'react-native';
import { addComment } from '../../actions/api';

import styles from './styles';

const logo = require('../../../img/splashscreen.png');
const cover = require('../../../img/web-cover1.jpg');

const {
    popRoute,
} = actions;

class Comment extends Component {

    constructor(props) {
      super(props);
      this.state = {commentText: ''};
      this.handleChange = this.handleChange.bind(this)
    }

    static propTypes = {
        openDrawer: React.PropTypes.func,
        pushRoute: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
    }

    handleChange(text) {
      this.setState({commentText: text});
      console.log(this.props.comments);
    }

    comment(comment){
      this.props.addComment( this.props.userId, this.props.videoId , comment);
      this.setState({commentText: ''});
    }

    pushRoute(route) {
        this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
    }

    render() {
        return (
                <View  style={{flex: 1}}>
                  <Card style={{flex: 1}}>
                    <Item regular>
                      <Input style={{flex: 1}} placeholder="Comment Here" value={this.state.commentText} onChangeText={this.handleChange} />
                      <Button style={styles.mb5} onPress= { () => {this.comment(this.state.commentText);} }>
                          <Text>Comment</Text>
                      </Button>
                    </Item>
                  </Card>

                 {this.props.comments?this.props.comments.map(comment =>
                          <Card>
                              <CardItem>
                                    <Left>
                                      <Image style={{width:40, height: 40}} source={{uri:comment.author.thumbnail}}/>
                                      <Text numberOfLines={1}> {comment.author.firstName} {comment.author.lastName} </Text>
                                    </Left>
                              </CardItem>
                              <CardItem>
                                  <Text numberOfLines={4} note>
                                      {comment.text}
                                  </Text>
                              </CardItem>
                          </Card>):
                   <Card>
                     <CardItem>
                       <Text numberOfLines={4} note>
                         No Comments
                       </Text>
                     </CardItem>
                   </Card>
                 }



                </View>
        );
    }
}

function bindAction(dispatch) {
    return {
        popRoute: key => dispatch(popRoute(key)),
        addComment: (userId, videoId, text) => dispatch(addComment(userId, videoId, text))
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    themeState: state.drawer.themeState,
    comments : state.data.currentVideo.comments
});

export default connect(mapStateToProps, bindAction)(Comment);
