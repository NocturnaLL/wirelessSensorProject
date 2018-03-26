import React from 'react';
import {StyleSheet, ImageBackground, Text, View,Alert,TextInput} from 'react-native';
import MapView from 'react-native-maps';
import Title from './app/components/Title/Title';
import firebase from 'firebase';
import Map from './app/components/Map/Map'
import {Tabs} from './app/config/router'


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
     padding:10
  },


});
