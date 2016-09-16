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
  Linking
} from 'react-native';
import Communications from 'react-native-communications';
import NetworkInfo from 'react-native-network-info';

export default class helpers {
  netListener(reach){
    var SSID = {ssid: 'UNKNOWN'};
    if (NetworkInfo) {
      NetworkInfo.getSSID(ssid => {
        if (ssid !== 'error') {
          SSID = {ssid: ssid};
          if (SSID.ssid !== 'UNKNOWN' || SSID.ssid !== 'error') {
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
                body: JSON.stringify(SSID)
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
    return {tags: tags, ats: ats, inputs: inputs};
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
  parseSpecial(specialAt) {
    if (specialAt === '@network') {
      console.log('attempting to send @network');
      return () => {
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
              /*
              Linking.openURL('sms://open?addresses=6503846438,4083962431');
              var phoneNums = [];
              json.forEach(function(data){
                phoneNums.push(data.phoneNumber);
              });
              */
            })
            .catch((error) => {
              console.warn("fetch error on getrequest:", error);
            });
          });
        });
      };
    }
    return specialAt === '@near' || specialAt === '@network' || specialAt === '@friends';
  };
  parseUsername(username) {
    //Fallback
    return username.slice(1);
  };

}
