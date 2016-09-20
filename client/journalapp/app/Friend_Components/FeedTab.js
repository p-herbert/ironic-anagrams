//News feed tab!

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  AsyncStorage,
  Navigator,
  Dimensions,
  ListView
} from 'react-native';

import EntryList from '../Entry_Components/EntryList';
import styles from '../styles/FriendsTabStyles';

export default class FeedTab extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      friendList: [],
      pendingRequests: [],
      allMessages: [],
      entries: ds.cloneWithRows([])
    };
  }

  componentWillMount() {
    this.getFriends(() => this.getAllFriendsMessages());
  }

  // This will happen when the component is mounted, and will show a list (via FriendsList) of 
  // friends (via Friend).
  getFriends(callback) {
    AsyncStorage.multiGet(['@MySuperStore:token', '@MySuperStore:url'], (err, store) => {
      var token = store[0][1];
      var url = store[1][1];
      fetch(`${url}api/friends`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
      .then( resp => { 
        resp.json().then( json => {
          if (json.name !== 'SequelizeDatabaseError') {
            this.setState({ friendList: json });
            callback(json);
          }
        })
        .catch((error) => {
          console.warn('error on json():', error);
        });
      })
      .catch( error => {
        console.log('error on fetch()', error);
      });
    });
  }


  getAllFriendsMessages(tags) {
    tags = tags || [];
    var count = 0;
    var cb = () => {
      count++;
      if (count === this.state.friendList.length) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //Sort the entries by date
        var cloneMessages = this.state.allMessages.slice();
        console.log('clone', cloneMessages);
        cloneMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        this.setState({
          entries: ds.cloneWithRows(cloneMessages)
        });
      }
    };
    
    // Clear the messages
    this.setState({
      allMessages: []
    });

    this.state.friendList.forEach(friend => this.getFriendPosts(friend.id, cb, tags));
  }

  getFriendPosts(friendId, callback, tags) {
    AsyncStorage.multiGet(['@MySuperStore:token', '@MySuperStore:url'], (err, store) => {
      var token = store[0][1];
      var url0 = store[1][1];
      var url = `${url0}api/entries` + '/?userId=' + friendId.toString() + '&tags=' + JSON.stringify(tags);
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
      .then( resp => { 
        resp.json().then( json => {
          this.setState({
            allMessages: this.state.allMessages.concat(json)
          });
        })
        .then(callback)
        .catch((error) => {
          console.warn('fetch error on getrequest:', error);
        });
      });
    });
  }

  render() {

    return (
      <View style= { styles.container } >
       <TextInput
           keyboardType='default'
           keyboardAppearance='light'
           placeholder= 'Search tags'
           style={{
             height: 50, 
             textAlign: 'center', 
             borderWidth: 1, 
             borderColor: '#cccccc', 
             marginBottom: 16, 
             marginTop: 12,
             backgroundColor: '#f9ebc3'}}
           onChangeText={ (text) => this.props.filterTags(text, (tags) => this.getAllFriendsMessages(tags)) }/>
        <ScrollView>
          <EntryList
            entries={ this.state.entries } 
            users={this.state.friendList}
            navigator={this.props.navigator} />
        </ScrollView>
      </View>
    );
  }
}
