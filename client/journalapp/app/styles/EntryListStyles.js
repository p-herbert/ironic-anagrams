import {
  StyleSheet,
  Dimensions,
} from 'react-native';

// marginBottom allows space for the lower navbar
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingTop: 10, 
    marginBottom: 37.5,
    opacity: 1
  },
  hiddenRowContainer: {
    borderWidth: 0, 
    height: 90, 
    width: Dimensions.get('window').width, 
    overflow: 'hidden',
    alignSelf: 'flex-start', 
    backgroundColor: 'red'
  },
  hiddenRow: {
    paddingTop: 30,
    paddingLeft: 35,
    fontSize: 15,
    fontWeight: 'normal',
    color: 'white'
  }

});

module.exports = styles;