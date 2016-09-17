import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  DeviceEventEmitter,
  TouchableHighlight
} from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

// VB: Refactored require to use import, for consistency
import Button from 'react-native-button';
import Entry from './Entry';
import styles from '../styles/EntryListStyles';


var findUsername = (id, users) => {
  if (users) {
    return users.filter(user => user.id === id)[0].fullname;
  }
};

var EntryList = ({entries, users, navigator, deleteEntries}) => (
    <SwipeListView style ={styles.container}
      dataSource={entries}
      enableEmptySections={true}
        renderRow={ (rowData, sectionID, rowID) => {
          return (<Entry
            enableEmptySections={true}
            key={rowID}
            id={rowData.id} 
            text={ rowData.text } 
            createdAt={ rowData.createdAt } 
            location={ rowData.location } 
            username= { findUsername(rowData.userId, users) }
            tags={ rowData.tags }
            entryId = {rowData.id}
            userId = {rowData.userId}
            navigator={navigator}/>
         );
        }
      }
        renderHiddenRow={ (rowData, sectionID, rowID) => (
          <SwipeRow
            closeOnRowPress={true}
          >
          <View></View>
          <View>
            <Button onPress= { () => 
              deleteEntries(findUsername(rowData.userId, users), 'RESET', rowData.id) }
              containerStyle={ styles.hiddenRowContainer } 
              ><Text style={ styles.hiddenRow }>Delete</Text>
            </Button>
          </View>
          </SwipeRow>
        ) }
        leftOpenValue={110}
    />//end swipe listview
);

/*
<SwipeRow
  disableRightSwipe={rowID}
  leftOpenValue={20 + parseInt(rowID) * 5}
>
*/

module.exports = EntryList;

