import React, { Component } from 'react';
import {StyleSheet, ImageBackground, Text, View,Alert,TextInput,Button} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import firebase from 'firebase';
const mode = 'driving'; // 'walking';
const origin = 'coords or address';
const destination = 'coords or address';
const APIKEY = 'AIzaSyCKA32YUr4J24dJe0t4N0Enr0jEQ61W3Dk';
const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

const coordinates = [{latitude:42.0882 , longitude:-75.9695},{latitude:42.0893553 +0.003 , longitude:-75.9697 +0.003}]

class Map extends Component {
  constructor(props) {
    super(props);
    this.calculateDist = this.calculateDist.bind(this);
    this.refresh = this.refresh.bind(this);
    this.car1route = this.car1route.bind(this);
    this.save= this.save.bind(this);
    this.state = {
      car1lat:null,
      car1lng:null,
      car2lat:null,
      car2lng:null,
      latitude: null,
      longitude: null,
      error: null,
      dist1: 0,
      dist2: 0,
      showRoute1: false,
      showRoute2: false,
      carInfoList: []
    };
    this.getCarInfo();
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
              dist1:Number.parseFloat(this.getDistance(this.state.latitude,this.state.longitude,this.state.car1lat,this.state.car1lng)/1000).toPrecision(3) + ' km',

          })
  }

  car1route() {
    if(this.state.showRoute1===false){
      this.setState({
                showRoute1:true,
            })
    }else{
      this.setState({
                showRoute1:false,
            })
    }

  }
  save(){
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref(`/CarInfo/${userId}`).push({
      name: 'Name',
      description: 'Description',
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      carLatitude: this.state.car1lat,
      carLongitude: this.state.car1lng,
    });
    alert("Locations saved successfully.")
  }

  refresh() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          car1lat:42.0893553 +0.003,
          car1lng:-75.9697 +0.003,
          car2lat:position.coords.latitude +0.002,
          car2lng:position.coords.longitude -0.002,
          latitude: 42.0882,
          longitude: -75.9695,
          error: null,

        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

  }
  decode(t,e){for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}
// transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates

  getCarInfo(){
    const userId = firebase.auth().currentUser.uid;

    firebase.database().ref(`/CarInfo/${userId}`).on('value', snapshot => {
      const carInfoList = [];
        snapshot.forEach(child => {
          carInfoList.push(child.val())
        });
        this.setState({
          carInfoList
        });
    })
  }
  renderCarInfo(){
    return this.state.carInfoList
    .map(
      carInfo =>
      <MapView.Marker
        coordinate={{
          latitude:carInfo.latitude,
          longitude:carInfo.longitude
        }}
        title={carInfo.name}
        description={carInfo.description}

      >
      </MapView.Marker>
    )
  }
  render() {
    return (
      <View style={{ flexGrow: 1,justifyContent: 'center',  alignItems: 'center' }}>
<Text id='carOne'>Distance to Car: {this.state.dist1}</Text>
<Text id='user'style={styles.buttonText}>Car Latitude = {this.state.latitude} Longitude = {this.state.longitude} </Text>
<Text id='car' style={styles.buttonText}>Users Latitude = {this.state.car1lat} Longitude = {this.state.car1lng}</Text>
<View style={{flexDirection:"row"}}>
<Button id='distance' title="Calculate Distance" onPress={this.calculateDist}/>
<Button id='route' title="Car" onPress={this.car1route}/>
<Button id='route2' title="Refresh" onPress={this.refresh}/>
<Button id='save' title="Save" onPress={this.save}/>
</View>
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
  title={"Car"}
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


{ this.state.showRoute1 &&
  <MapViewDirections
      origin={
          coordinates[0] // optional
      }
      destination={coordinates[1]}
      apikey={APIKEY}
      strokeWidth={3}
      strokeColor="hotpink"
      id="MapView2"
  />

}

</MapView>
  </View>
    );
  }
}

const styles = StyleSheet.create({

  button:
  {
    height:10,
    backgroundColor:'#48BBEC',
    borderColor:'#48BBEC',
    width:10,
    justifyContent:'center',
    textAlignVertical: "center"
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
