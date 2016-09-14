// app/index.js

import React, { Component } from 'react';
import {
  Alert, 
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  AsyncStorage,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/SettingsTabStyles';
import Prompt from 'react-native-prompt';

var warningMessage = 'Once you delete all entries, you can\'t undo this. Are you sure you\'d like to proceed?';

// () => this.props.deleteEntries(this.state.username)
export default class SettingsTab extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      username: '',
      deletePromptVis: false
    };
    AsyncStorage.getItem('@MySuperStore:username', (err, username) => {
      this.setState({
        username: username
      });
    });
  }

  render() {

   return (
      <View style={ styles.container }>
        <Text style={ styles.subHeader }>Profile information</Text>
        <TouchableHighlight>
          <View style={ styles.rowContainer }>
            <View style={ styles.row }>
              <Text style={ styles.bodyText }>Username: { this.state.username }</Text>
              <Icon style= {styles.arrow} name="navigate-next" ></Icon>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={ () => this.setState({deletePromptVis: true}) }>
          <View style={ styles.rowContainer }>
            <View style={ styles.row }>
              <Text style= { styles.bodyText }>Delete All Entries
              </Text>
              <Icon style= {styles.arrow} name='speaker-notes-off'/>
            </View>
          </View>
        </TouchableHighlight>
        <Prompt
            title="Type Password to Confirm"
            placeholder="Password"
            visible={this.state.deletePromptVis}
            onCancel={() => this.setState({ deletePromptVis: false})}
            onSubmit={(password) => {
              this.props.deleteEntries(this.state.username, password);
              this.setState({ deletePromptVis: false});
            }
            }/>

        <Button onPress= { () => this.props.signOut() } style={ {padding: 20} }>Sign Out</Button>
      </View>
   )
 }
}

