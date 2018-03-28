import React from 'react';
import {StyleSheet, ImageBackground, Text, View,Alert,TextInput} from 'react-native';
import MapView from 'react-native-maps';
import Title from './app/components/Title/Title';
import firebase from 'firebase';
import Map from './app/components/Map/Map'
import {Tabs} from './app/config/router'

const config = {
  apiKey: "AIzaSyD8yxMNYW_1YW9tCqV1gFaSGuZ1CRfNxZc",
    authDomain: "findmycar-5fa8f.firebaseapp.com",
    databaseURL: "https://findmycar-5fa8f.firebaseio.com",
    projectId: "findmycar-5fa8f",
    storageBucket: "findmycar-5fa8f.appspot.com",
    messagingSenderId: "1084486057316"
};
firebase.initializeApp(config);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

    <View style={styles.container}>
    <Tabs/>
    </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: '#fff',
     justifyContent: 'center',
     padding:10,
     position:'relative',
     top:30,
  },


});
