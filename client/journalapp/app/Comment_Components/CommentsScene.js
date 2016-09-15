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
import stylesEntriesTab from '../styles/EntriesTabStyles';

var data = [{text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'},
  {text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'},
  {text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'},
  {text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'},
  {text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'},
  {text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'},
  {text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'},
  {text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'},
  {text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'},
  {text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'},
  {text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'},
  {text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'},
  {text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'},
  {text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'},
  {text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'},
  {text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'},
  {text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'},
  {text: 'Hello World', location: 'Bay Area', createdAt: '2016-09-13T21:45:11.328Z', username: 'Pete'}];

export default class CommentsScene extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      testData: ds.cloneWithRows(data),
      dynamicHeight: () => { return {height: Dimensions.get('window').height - 49 - 500};},
      comment: ''
    };

  }

  updateComment(text) {
    this.setState({
      comment: text
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={
          {marginTop: 0,
            marginLeft: 0,
            borderBottomWidth: 0.5,
            borderColor: '#cccccc',
            paddingBottom: 49}}>
          <TextInput
              keyboardType='default'
              keyboardAppearance='light'
              multiline={ true }
              placeholder= 'Comment...'
              onChangeText={ (text) => this.updateComment(text) }
              style={ [this.state.dynamicHeight(), styles.bodyWidth, styles.fadedText] }
              maxLength={ 100 }/>
          <View style={ [styles.bodyWidth, styles.footer] }>
            <Text style={ [styles.footerContent, styles.footerText] }>{ 100 - this.state.comment.length + ' characters left'}</Text>
            <Text style={ [styles.footerContent, styles.footerArrow] }>{ 'Publish' }</Text>
          </View>
        </View>
        <View style={{
            position: 'relative',
            height: Dimensions.get('window').height - 70,
            width: Dimensions.get('window').width * .93,
            marginLeft: Dimensions.get('window').width * .035,
            marginRight:Dimensions.get('window').width * .035}}>
          <CommentList entries={this.state.testData}/>
        </View>
      </View>
    )
  }
}

