
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;

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
    left: (Platform.OS === 'android') ? 75 : 50,
    top: (Platform.OS === 'android') ? deviceHeight/6 : 60,
    width: 280,
    height: 120,
  },
  text: {
    color: '#000099',
    bottom: 6,
  },
};
