import React, { Component } from 'react';
import DateFormatter from 'dateformat';

import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  Dimensions
} from 'react-native';

import styles from '../styles/EntryStyles';

var Entry = (props) => (
  <View style={ styles.container }>
    <View style={ styles.row }>
      <View style={ styles.rowHeader }>
        <Text style={ styles.date }>
          { parseDate(props) }
        </Text>
        <Text style={ styles.location }>
          { props.location }
        </Text>
      </View>
      <View style={ styles.rowBody }>
        <Text style={ styles.entryText }>
          { props.text }
        </Text>
      </View>
    </View>
  </View>
);

module.exports = Entry;

var parseDate = (props) => {
  console.log(props);
  date = new Date(props.createdAt);
  return DateFormatter(date, "ddd, mmm d");
};