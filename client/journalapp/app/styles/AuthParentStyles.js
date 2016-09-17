import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fdf6e3',
  },
  tabbar: {
    backgroundColor:'#fdf6e3',
    height: 54,
    borderTopColor: '#878787',
    borderTopWidth: 1,
  },
  tabbartext: {
   fontSize:15,
   fontWeight:'600',
   marginBottom:5,
   color:"#878787"
  }
});

module.exports = styles;