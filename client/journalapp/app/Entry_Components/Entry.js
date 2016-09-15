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

var Entry = (props) => {
  console.log(props);
  return (
  <TouchableOpacity key={props.id + 'a'} onPress={() => props.navigator.push({title: 'CommentsScene'})}>
    <View key={props.id + 'b'} style={ styles.container }>
      <View key={props.id + 'c'} style={ styles.row }>
        <View key={props.id + 'd'} style={ styles.rowHeader }>
          <Text key={props.id + 'e'} style={ styles.leftGroup }>
            <Text key={props.id + 'f'} style={ styles.username }>
              { props.username }
            </Text>
            <Text key={props.id + 'g'} style={ styles.date }>
              { parseDate(props.createdAt) }
            </Text>
          </Text>
          <Text key={props.id + 'h'} style={ styles.location }>
            { props.location }
          </Text>
        </View>
        <View key={props.id + 'i'} style={ styles.rowBody }>
          <Text key={props.id + 'j'} style={ styles.entryText }>
            { props.text }
          </Text>
        </View>
        <View key={props.id + 'k'} style= { styles.rowFooter }>
          <Text key={props.id + 'l'} style= {styles.filler}>
          </Text>
          { createTags(props) }
        </View>
      </View>
    </View>
  </TouchableOpacity>


    );
};

module.exports = Entry;


var createTags = (props) => {
  if (props.tags) {
    return props.tags.map(function(tag) {
      return (
          <Text key={props.id+'m'} style= { styles.tag }>
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

