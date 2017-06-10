
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    backgroundColor: '#FFF',
  },

// profileTab
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
  	// TODO: change this to adjust to device
    width: 80, 
    height: 100,
  },

  mb10: {
    marginBottom: 10,
  },
  mb15: {
    marginBottom: 15,
  },
  logo: {
    width: (Platform.OS === 'android') ? deviceWidth/10 : 10,
    height: (Platform.OS === 'android') ? deviceHeight/15 : 10,
  },
};
