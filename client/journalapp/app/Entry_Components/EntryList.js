import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  DeviceEventEmitter
} from 'react-native';




// VB: Refactored require to use import, for consistency
import Entry from './Entry';
import styles from '../styles/EntryListStyles';

var findUsername = (id, users) => {
  if (users) {
    return users.filter(user => user.id === id)[0].fullname;
  }
};

var EntryList = ({entries, users, navigator}) => (
    <ListView style ={styles.container}
       dataSource={entries}
       renderRow={ (rowData) =>
          <Entry 
            text={ rowData.text } 
            createdAt={ rowData.createdAt } 
            location={ rowData.location } 
            username= { findUsername(rowData.userId, users) }
            tags={ rowData.tags }
            id = {rowData.id}
            navigator={navigator}/>
    }/>
);

module.exports = EntryList;

