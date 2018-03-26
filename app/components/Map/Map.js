import React, { Component } from 'react';
import {StyleSheet, ImageBackground, Text, View,Alert,TextInput,Button} from 'react-native';
import MapView from 'react-native-maps';

class Map extends Component {
  constructor(props) {
    super(props);
    this.calculateDist = this.calculateDist.bind(this);
    this.state = {
      car1lat:null,
      car1lng:null,
      car2lat:null,
      car2lng:null,
      latitude: null,
      longitude: null,
      error: null,
      dist1: 0,
      dist2: 0
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          car1lat:position.coords.latitude +0.003,
          car1lng:position.coords.longitude +0.003,
          car2lat:position.coords.latitude +0.002,
          car2lng:position.coords.longitude -0.002,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,

        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

  }
  rad(x) {
  return x * Math.PI / 180;
  };

  getDistance(c1lat,c1lng,c2lat,c2lng) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = this.rad(c2lat - c1lat);
    var dLong = this.rad(c2lng - c1lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(c1lat)) * Math.cos(this.rad(c2lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };
  calculateDist() {
    this.setState({
              dist1:Number.parseFloat(this.getDistance(this.state.latitude,this.state.longitude,this.state.car2lat,this.state.car2lng)/1000).toPrecision(3) + ' km',
              dist2:Number.parseFloat(this.getDistance(this.state.latitude,this.state.longitude,this.state.car1lat,this.state.car1lng)/1000).toPrecision(3) + ' km'
          })
  }


  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text id='carOne'>Distance to Car1: {this.state.dist1}</Text>
<Text id='carTwo'>Distance to Car2: {this.state.dist2}</Text>
<Button title="Calculate Distance" onPress={this.calculateDist}/>
<Text style={styles.buttonText}>Car1 Latitude = {this.state.latitude}</Text>
<Text style={styles.buttonText}>Car1 Longitude = {this.state.longitude}</Text>
<Text style={styles.buttonText}>Car2 Latitude = {this.state.car1lat}</Text>
<Text style={styles.buttonText}>Car2 Longitude = {this.state.car1lng}</Text>
<Text style={styles.buttonText}>Latitude = {this.state.car2lat}</Text>
<Text style={styles.buttonText}>Longitude = {this.state.car2lng}</Text>
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
    latitude:Number(this.state.latitude)+0.003,
    longitude:Number(this.state.longitude+0.003)
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


export default Map;
