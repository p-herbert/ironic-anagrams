import React, { Component } from 'react';
import DateFormatter from 'dateformat';

import {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import styles from '../styles/EntryStyles';

var Entry = (props) => (
  <TouchableOpacity onPress={click.bind(this)}>
    <View style={ styles.container }>
      <View style={ styles.row }>
        <View style={ styles.rowHeader }>
          <Text style={ styles.leftGroup }>
            <Text style={ styles.username }>
              { props.username }
            </Text>
            <Text style={ styles.date }>
              { parseDate(props.createdAt) }
            </Text>
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
        <View style= { styles.rowFooter }>
          <Text style= {styles.filler}>
          </Text>
          { createTags(props) }
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

module.exports = Entry;


var createTags = (props) => {
  if (props.tags) {
    return props.tags.map(function(tag) {
      return (
          <Text style= { styles.tag }>
            { tag }
          </Text>
        );
    });
  }
};

var parseDate = (date) => {
  date = new Date(date);
  return DateFormatter(date, 'ddd, mmm d HH:MM');
};

var click = function() {
  console.log('Entry Clicked');
}

