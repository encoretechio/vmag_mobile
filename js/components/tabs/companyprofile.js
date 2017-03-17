
import React, { Component } from 'react';

import {connect} from 'react-redux';
import { Container, Content, Card, CardItem, Text, Body, Button, Icon, IconNB, Left, Right, H1, H3, List, ListItem, Thumbnail } from 'native-base';
 
import {Image, View} from 'react-native';
import {openDrawer} from '../../actions/drawer';

import styles from './styles';

const companyLogo = require('../../../img/zero_gravity_logo.png');

const cardImage = require('../../../img/drawer-cover.png');
const sankhadeep = require('../../../img/contacts/sankhadeep.png');
const supriya = require('../../../img/contacts/supriya.png');
const himanshu = require('../../../img/contacts/himanshu.png');
const shweta = require('../../../img/contacts/shweta.png');
const shruti = require('../../../img/contacts/shruti.png');

const Title = ({name}) => {
  return (
    <List>
    <ListItem>
      <Left>
        <Thumbnail square size={55} source={companyLogo} style={styles.mb10}/>
      </Left>
      <Body>
        <H3 style={styles.mb10}>{name}</H3>
      </Body>
      <Right>
        <Thumbnail square size={55} source={companyLogo} style={styles.mb10}/>
      </Right>
      </ListItem>
    </List>
  );
}

const datas = [
    {
        img: sankhadeep,
        text: 'Sankhadeep',
        note: 'Its time to build a difference . .',
    },
    {
        img: supriya,
        text: 'Supriya',
        note: 'One needs courage to be happy and smiling all time . . ',
    },
    {
        img: himanshu,
        text: 'Himanshu',
        note: 'Live a life style that matchs your vision',
    },
    {
        img: shweta,
        text: 'Shweta',
        note: 'Failure is temporary, giving up makes it permanent',
    },
    {
        img: shruti,
        text: 'Shruti',
        note: 'The biggest risk is a missed opportunity !!',
    },
];

class CompanyProfile extends Component { // eslint-disable-line

  render() { // eslint-disable-line
    const user_props = this.props.user;
    return (
      <Content padder style={{ marginTop: 0 }}>
        
        <Title name={company_props.name}/>

        <Card style={styles.mb15}>
        
          <CardItem>
            <Text>Website</Text>
            <Right>
              <Text>{company_props.website}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Text>Contact</Text>
            <Right>
              <Text>{company_props.contact}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Text>Email</Text>
            <Right>
              <Text>{company_props.email}</Text>
            </Right>
          </CardItem>
        </Card>

        <Card style={styles.mb}>
          <CardItem cardBody>
            <Image style={{ resizeMode: 'cover', width: null, height: 200, flex: 1 }} source={cardImage} />
          </CardItem>

          <CardItem style={{ paddingVertical: 0 }}>
            <Left>
              <Button iconLeft transparent>
                <Icon active name="thumbs-up" />
                <Text>12 Likes</Text>
              </Button>
            </Left>
            <Body>
            <Button iconLeft transparent>
              <Icon active name="chatbubbles" />
              <Text>4 Comments</Text>
            </Button>
            </Body>
            <Right>
              <Text>11h ago</Text>
            </Right>
          </CardItem>
        </Card>

        <Card>
          <List dataArray={datas} renderRow={data =>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square size={55} source={data.img} />
              </Left>
              <Body>
                <Text>{data.text}</Text>
                <Text numberOfLines={1} note>{data.note}</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
          }
          />
        </Card>
      </Content>
    );
  }
}

const company_props = {
  name: "Zero Gravity Creatives",
  website: "http://www.zerogravitycreatives.com/",
  contact: "+94777333098",
  email: "info@zerogravitycreatives.com",
}

function bindActions(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  user: state.data.user,
});

export default connect(mapStateToProps, bindActions)(CompanyProfile);