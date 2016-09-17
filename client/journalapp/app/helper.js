import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Alert,
  TextInput,
  ListView,
  View,
  Navigator,
  AsyncStorage,
  Dimensions,
  Image,
  TouchableHighlight,
  Linking,
  ActionSheetIOS
} from 'react-native';
import Communications from 'react-native-communications';
import NetworkInfo from 'react-native-network-info';

var emailArray = (userArray, input) => {
  var allEmails = [];
  userArray.forEach(function(user){
    allEmails.push(user.username);
  });
  Communications.email(null, null, allEmails, null, input);
};

var textArray = (userArray, input) => {
  var allNums = [];
  userArray.forEach(function(user){
    allNums.push(user.phoneNumber);
  });
  var body = ''
  if (input.length > 0) {
    body = input[0].slice(1);
  }
  Linking.openURL(`sms://open?addresses=${allNums.join(',')}&body=${body}`);
};

var callArray = (userArray, input) => {
  var allNums = [];
  userArray.forEach(function(user){
    allNums.push(user.phoneNumber);
  });
  var body = '';
  if (input.length > 0) {
    body = input[0].slice(1);
  }
  Linking.openURL(`telprompt://${allNums.join(', ')}`);
}

var showSpecialAt = (json, input) => {
  ActionSheetIOS.showActionSheetWithOptions({
    options:['Call', 'Text', 'Email', 'Cancel'],
    cancelButtonIndex: 3
  },
  (buttonIndex) => {
    if (buttonIndex === 0){
      callArray(json, input);
    } else if(buttonIndex === 1) {
      textArray(json, input);
    } else if(buttonIndex === 2) {
      emailArray(json, input);
    }
  });
};

export default class helpers {
  constructor() {
    this.showModal = 'test';
  }
  passDisplay(modalDisplay){
    this.showModal = modalDisplay;
  }
  netListener(reach){
    var SSID = {ssid: 'UNKNOWN'};
    var ip = {ip: 'UNKNOWN'};
    if (NetworkInfo) {
      NetworkInfo.getSSID(ssid => {
        NetworkInfo.getIPAddress(ip => {
          if (ssid !== 'error') {
            if (ssid !== 'UNKNOWN' || ssid !== 'error') {
              AsyncStorage.multiGet(['@MySuperStore:token', '@MySuperStore:url'], (err, store) => {
                //AsyncStorage.getItem('@MySuperStore:token', (err, token) => {
                var token = store[0][1];
                var url = store[1][1];
                fetch(`${ url }api/users`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                  },
                  body: JSON.stringify({ip: ip, ssid: ssid})
                })
                .then( resp => { 
                  if (resp.status === 204) {
                    AsyncStorage.setItem('@MySuperStore:ssid', SSID.ssid, function(err){
                      if(err) {
                        console.warn(err);
                      }
                    });
                  }
                });
              });
            };
          };
        });
      });
    };
  };



  parseText(text){
    let tags = [];
    let tag = '';

    let ats = [];
    let at = '';

    let inputs = [];
    let input = '';

    let partOfAt = false;
    let partOfTag = false; 
    let partOfInput = false;

    for (var i = 0; i < text.length; i ++) {
      if (text[i] === '#') {
        partOfTag = true;
      } 
      if (text[i] === '@') {
        partOfAt = true;
      }

      if (text[i] === '&') {
        partOfInput = true;
      }

      if (partOfTag === true) {
        if ((text[i] !== ' ' && text[i] !== ',') || text[i] === '#') {
          tag = tag.concat(text[i]);
        } else {
          if(tag !== '#'){
            tags.push(tag);
          }
          tag = '';
          partOfTag = false;
        }
      }

      if (partOfAt === true) {
        if ((text[i] !== ' ' && text[i] !== ',') || text[i] === '@') {
          at = at.concat(text[i]);
        } else {
          if(at !== '@'){
            ats.push(at);
          }
          at = '';
          partOfAt = false;
        }
      }

      if (partOfInput === true) {
        if (text[i] !== '?') {
          input = input.concat(text[i]);
        } else {
          if(input !== '&?'){
            input = input.concat('?');
            inputs.push(input);
          }
          input = '';
          partOfInput = false;
        }
      }

    }
    if (tag !== '' && tag !== '#') {
      tags.push(tag);
      tag = '';
    }
    if (at !== '' && at !== '@') {
      ats.push(at);
      at = '';
    }
    if (input !== '' && input !== '&') {
      inputs.push(input);
      input = '';
    }
    retval = {tags: tags, ats: ats, inputs: inputs};
    console.log(retval);
    return retval;
}

parsePhoneNumber(phoneNum){
  //Highest Priority
  return phoneNum.match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/);
};

  phoneAlert(phoneNum) {
    Alert.alert(
      'Phone Options:',
      null,
      [
        {text: 'Call', onPress: () => Communications.phonecall(phoneNum[1] + phoneNum[3] + phoneNum[4], true)},
        {text: 'Text', onPress: () => Communications.text(phoneNum[1] + phoneNum[3] + phoneNum[4], data.inputs[0].toString().slice(1))},
        {text: 'Messenger', onPress: () => console.log('Messenger Pressed!')},
        {text: 'Cancel'}
      ]
    );
  }

  parseEmail(email) {
    //2nd Priority
    return email.slice(1).match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
  };
  parseWeb(web) {
    return web.slice(1).match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
  };

  atNetwork(input) {
    console.log(input);
    var context = this;
    AsyncStorage.multiGet(['@MySuperStore:token', '@MySuperStore:url', '@MySuperStore:ssid'], (err, store) => {
    var token = store[0][1];
    var url = store[1][1];
    var ssid = store[2][1];
    fetch(`${ url }api/users?ssid=${ssid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      })
      .then( resp => { resp.json()
        .then( json => {
          console.log(json);
          context.showModal(true, {json: json, input: input});
        })
        .catch((error) => {
          console.warn("fetch error on getrequest:", error);
        });
      });
    });
  };



  atFriends(input) {
    var context = this;
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
      .then( resp => { resp.json()
        .then( json => {
          context.showModal(true, {json: json, input: input});
        })
        .catch((error) => {
          console.warn("error on json():", error);
        });
      })
      .catch( error => {
        console.log("error on fetch()", error);
      });
    });
  };

  parseSpecial(specialAt) {
    if (specialAt === '@network') {
      console.log('@network detected');
      return this.atNetwork;
    } else if (specialAt = '@friends') {
      return this.atFriends;
    }
    return specialAt === '@near' || specialAt === '@network' || specialAt === '@friends';
  };
  parseUsername(username) {
    //Fallback
    return username.slice(1);
  };

}
