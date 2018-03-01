import React from 'react';
import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import Coordinates from './app/components/Coordinates/getCoordinates';
export default class App extends React.Component {
  
  TestFunction() {
  var carLocation = new Coordinates();
  console.log(carLocation.state.latitude);
  Alert.alert("Car location added.");
  }
  render() {
    return (
      <View style={styles.container}>
        <Coordinates />
        <Button onPress={ this.TestFunction } title="Car Location" color="#009688" />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText:
  {
    fontSize:18,
    color:'white',
    alignSelf:'center'
  },
  button:
  {
    height:40,
    backgroundColor:'#48BBEC',
    borderColor:'#48BBEC',
    width:80,
    alignSelf:'stretch',
    justifyContent:'center'
  }
});
