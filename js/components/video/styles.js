
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30,
  },
  logo: {
    position: 'absolute',
    left: (Platform.OS === 'android') ? 40 : 50,
    top: (Platform.OS === 'android') ? 35 : 60,
    width: 280,
    height: 100,
  },
  text: {
    color: '#000099',
    bottom: 6,
  },
  backgroundVideo: {
    flex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 220,
  },
  mb5: {
    marginBottom:0.1,
  },
  container: {
    flex: 1,
    height: 300,
  },
  toolbar: {
    backgroundColor: 'blue',
    height: 20,
    width: 20,
  },
  mediaPlayer: {
    flex: 1,
    top: 0,
    left: 0,
    height: 300,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
};
