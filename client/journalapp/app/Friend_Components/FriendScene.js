import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage,
  Navigator,
  ListView
} from 'react-native';

import EntryList from '../Entry_Components/EntryList';
import styles from '../styles/FriendSceneStyles';

export default class FriendScene extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      entries: ds.cloneWithRows([])
    }
  };

  componentWillMount(){
    this.getFriendPosts()
  }

  getFriendPosts(){
    var url = 'http://localhost:3000/api/entries' + "/?userId=" + this.props.friendId.toString();
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      fetch(url , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
      .then( resp => { resp.json()
        .then( json => {
          console.log('Fetched friends posts', json);
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            entries: ds.cloneWithRows(json)
          })
        })
        .catch((error) => {
          console.warn("fetch error on getrequest:", error)
        });
      });
    });
  }

  render() {
    return (
      <View style = { styles.container }>
        <EntryList entries={ this.state.entries }
                   navigator={ this.props.navigator } />
      </View>
    )
  }
}