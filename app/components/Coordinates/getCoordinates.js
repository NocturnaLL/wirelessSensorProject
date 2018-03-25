import React, { Component } from 'react';
import {StyleSheet, ImageBackground, Text, View,Alert,TextInput,Button} from 'react-native';
import MapView from 'react-native-maps';
class Location extends Component {
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


  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>

<Text style={styles.buttonText}>Latitude = {this.state.latitude}</Text>
<Text style={styles.buttonText}>Longitude = {this.state.longitude}</Text>
<MapView style={styles.map}
  region={{
    latitude:Number(this.state.latitude),
    longitude:Number(this.state.longitude),
    latitudeDelta:0.01,
    longitudeDelta:0.01
  }}
>
<MapView.Marker
  coordinate={{
    latitude:Number(this.state.latitude)+0.001,
    longitude:Number(this.state.longitude+0.001)
  }}
  title={"Car1"}
  description={""}
>
</MapView.Marker>

<MapView.Marker
  coordinate={{
    latitude:Number(this.state.latitude)+0.002,
    longitude:Number(this.state.longitude-0.002)
  }}
  title={"Car2"}
  description={""}
>
</MapView.Marker>

<MapView.Marker
  coordinate={{
    latitude:Number(this.state.latitude),
    longitude:Number(this.state.longitude)
  }}
  title={"Me"}
  description={""}
>
<View style={styles.radius}>
  <View style={styles.marker}/>
</View>
</MapView.Marker>
</MapView>

<Button onPress={ this.TestFunction } title="Save Location" color="black" />

      </View>
    );
  }
}

const styles = StyleSheet.create({

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
      width: 300,
      height: 400,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#000',
      borderWidth: 3,
      marginTop: 15,

    },

    inner: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    radius: {
      height:50,
      width:50,
      borderRadius:50/2,
      overflow:'hidden',
      backgroundColor:'rgba(0, 122, 255, 0.1)',
      borderWidth: 1,
      borderColor: 'rgba(0,112,255,0.3)',
      justifyContent: 'center',
      alignItems: 'center'
    },
    marker:{
      height:20,
      width:20,
      borderWidth:3,
      borderColor: 'white',
      borderRadius:20/2,
      overflow:'hidden',
      backgroundColor:'#007AFF'
    }
});


export default Location;
