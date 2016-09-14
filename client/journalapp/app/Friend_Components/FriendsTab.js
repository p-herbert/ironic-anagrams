// app/index.js

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

import FriendList from './FriendList';
import RequestList from './RequestList';
import EntryList from '../Entry_Components/EntryList';

import styles from '../styles/FriendsTabStyles';

export default class FriendsTab extends Component {
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
    this.getFriends();
    this.getFriendRequests();
  }

  // This will happen when the component is mounted, and will show a list (via FriendsList) of 
  // friends (via Friend).
  getFriends(){
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      fetch('http://localhost:3000/api/friends', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
      .then( resp => { resp.json()
        .then( json => {
          if (json.name !== 'SequelizeDatabaseError') {
            this.setState({ friendList: json });
            //Only call this once the friend request has returned
            this.getAllFriendsMessages();
          }
        })
        .catch((error) => {
          console.warn("error on json():", error)
        });
      })
      .catch( error => {
        console.log("error on fetch()", error)
      });
    });
  }


  getAllFriendsMessages() {
    console.log('About to get all friends messages: ', this.state.friendList);
    var count = 0;
    var cb = () => {
      count++;
      console.log(this.state.allMessages, count);
      if (count === this.state.friendList.length) {
        console.log('Update the list entries');
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          entries: ds.cloneWithRows(this.state.allMessages)
        });
        console.log(this.state.entries);
      }
    };
    this.state.friendList.forEach(friend => this.getFriendPosts(friend.id, cb));
  }

  getFriendPosts(friendId, callback) {
    console.log('Getting a friends posts');
    var url = 'http://localhost:3000/api/entries' + "/?userId=" + friendId.toString();
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
          this.setState({
            allMessages: this.state.allMessages.concat(json)
          });
        })
        .then(callback)
        .catch((error) => {
          console.warn("fetch error on getrequest:", error);
        });
      });
    });
  }


  // This will happen when the component is mounted, and will show a list (via RequestList) of 
  // requests (via Request).
  getFriendRequests() {
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      fetch('http://localhost:3000/api/friendreq', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
      .then( resp => { resp.json()
        .then( json => {
          console.log(json, "myjson");
          this.setState({ pendingRequests: json });
        })
        .catch((error) => {
          console.warn("fetch error on getrequest:", error)
        });
      });
    });
  }

  // Accepting a friend request occurs on the Request view.
  acceptFriendRequest(requestId){
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      var message = { requestId: requestId };
      fetch('http://localhost:3000/api/friendreq', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
         'x-access-token': token
        },
        body: JSON.stringify(message)
      })
        .then((response) => {
          this.getFriendRequests();
          this.getFriends();
        })
          .catch((error) => {
            console.warn("fetch error:", error)
          });
    });
  }

  // Rejecting a friend request occurs on the Request view.  
  rejectFriendRequest(requestId) {
    AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
      var req = {requestId: requestId};
      fetch('http://localhost:3000/api/friendreq', {
        method: 'DELETE',
        headers: {
         'Content-Type': 'application/json',
         'x-access-token': token
        },
        body: JSON.stringify(req)
      })
        .then((response) => {
          this.getFriendRequests();
        })
          .catch((error) => {
            console.warn("fetch error:", error)
          });
    });
  }

  render() {

    return (
      <View style= { styles.container } >
        <ScrollView>
          <RequestList 
            requestList={ this.state.pendingRequests } 
            acceptFriend={ this.acceptFriendRequest.bind(this) } 
            rejectFriend={ this.rejectFriendRequest.bind(this) }
            navigator={ this.props.navigator } />
          <FriendList 
            friendList={ this.state.friendList } 
            navigator={ this.props.navigator } 
            updateFriend={ this.props.updateFriend }/>
          <Text style={ styles.subHeader } >Your News Feed</Text>
          <EntryList
            entries={ this.state.entries } users={this.state.friendList} />
        </ScrollView>
      </View>
    )
  }
}


// if (this.state.page === "FeedTab") return <FeedTab
//                                                 navigator={ navigator }
//                                                 filterTags= {this.filterTags.bind(this) }/>; //this method Julian has written


// <View name="SettingsTab" style={styles.tabbarView}>
  // <Image style={styles.tabbarimage} source={require('./images/Settings_Active.png')}/>
  // <Text style={styles.tabbartext}>Settings</Text>
// </View>

