import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6f6',
  },
  textinput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 22
  },
  faintText: {
    color: 'rgba(100,100,100,.6)'
  },
  largerText: {
    marginTop: -2,
    fontSize: 19
  },
  topBar: {
    width: Dimensions.get('window').width,
    height: 60,
    backgroundColor: '#f5f6f6',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(175,175,175,.6)',
  },
  topBarView: {
    marginTop: 3,
    borderBottomColor: 'rgba(100,100,100,.6)',
  },
  tabbar: {
    backgroundColor:'white',
    height: 49,
    borderTopColor: 'gray',
    borderTopWidth: 0.5
  },
  tabbarView: {
    opacity: 0.45,
    paddingTop:6
  },
  tabbarimage: {
    height: 30,
    width:37.5,
    marginTop:6.5,
    alignSelf:'center'
  },
  tabbartext: {
   fontSize:10,
   fontWeight:'700',
   marginBottom:12,
   color:"#333333"
  },
  arrow: {
    alignSelf:'flex-end',
    flexDirection: 'column',
    fontSize:30,
    color:"#c7c7cc",
    marginLeft: 12
  },
  image: {
    height: 30,
    width: 30,
    alignSelf:'flex-end',
    flexDirection: 'column'
  },
  title: {
    marginTop: 5,
    height: 53,
    fontSize: 17,
    fontWeight: '600'
  },
  titleCounter: {
    marginTop: 9,
    fontSize: 17,
    fontWeight: '400'
  },
  rightArrow: {
    marginTop: 10,
    marginRight: 10,
    height: 53,
    fontSize: 14,
  }
});

module.exports = styles;