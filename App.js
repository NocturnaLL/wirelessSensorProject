import React from 'react';
import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import MapView from 'react-native-maps';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

  }

  TestFunction() {
  Alert.alert("Car location added.");
  }
  render() {
    return (
      <View style={styles.container}>
      
        <Button onPress={ this.TestFunction } title="Car Location" color="#009688" />
        <MapView style={styles.map}
          region={{
            latitude:Number(this.state.latitude),
            longitude:Number(this.state.longitude),
            latitudeDelta:0.1,
            longitudeDelta:0.1
          }}
        >
        <MapView.Marker
          coordinate={{
            latitude:Number(this.state.latitude),
            longitude:Number(this.state.longitude)
          }}
          title={"Marker title"}
          description={"Title Desc"}
        />
        </MapView>

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
  },
  map: {
    position:'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0,

  }
});
