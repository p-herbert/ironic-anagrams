import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  ListView,
  AsyncStorage,
  Navigator,
  Dimensions
} from 'react-native';

import CommentList from './CommentList';
import styles from '../styles/MessageSceneStyles';

export default class CommentsScene extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      testData: ds.cloneWithRows([{text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'}])
    };
    
  }

  render() {
    return (
      <ScrollView style={ styles.container } ref='scrollView'>
        <CommentList entries={this.state.testData}/>
      </ScrollView>
    )
  }
}

