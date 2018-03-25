import React from 'react';
import {StyleSheet, ImageBackground, Text, View,Alert,TextInput} from 'react-native';
import MapView from 'react-native-maps';
import Title from './app/components/Title/Title';
import firebase from 'firebase';
import Map from './app/components/Coordinates/getCoordinates'
const config = {
    apiKey: "AIzaSyDnAkoGDyvST4IzrnBB5o1OIEZBGQ7tZ60",
    authDomain: "react-firebase-ebb66.firebaseapp.com",
    databaseURL: "https://react-firebase-ebb66.firebaseio.com",
    projectId: "react-firebase-ebb66",
    storageBucket: "react-firebase-ebb66.appspot.com",
  };
  firebase.initializeApp(config);

import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      email:'',
      password:''
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
    alert("Saved")
  }

  signUpUser = (email,password) =>{
    try{
      console.log(password)
      if(this.state.password.length<6){
        alert("Password must be longer than 6 characters")
        return;
      }
      else{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        alert("Successful Signup")

      }

    }
    catch(error){
      console.log(error.toString())
    }
  }

  loginUser = (email,password) =>{
    try{
      firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
        alert("Successful login")
        return(<Map id="three"></Map>)
      })
    }
    catch(error){
        console.log(error.toString())
    }
  }


  render() {
    return (

    <View style={styles.container}>
    <Container>
    <Form>
    <Item floatingLabel>
    <Label>Email</Label>
    <Input
      autoCorrect={false}
      autoCapitalize="none"
      onChangeText={(email) => this.setState({email})}
    />

    </Item>
    <Item floatingLabel>
    <Label>Password</Label>
    <Input
      secureTextEntry={true}
      autoCorrect={false}
      autoCapitalize="none"
      onChangeText={(password) => this.setState({password})}
    />

    </Item>
    <Button id='one' style={{marginTop:20}}
      full
      rounded
      success
      onPress={()=> this.loginUser(this.state.email,this.state.password)}
    >
    <Text style={{color:'white'}}>Login</Text>
    </Button>
    <Button id='two' style={{marginTop:20}}
      full
      rounded
      primary
      onPress={() => this.signUpUser(this.state.email,this.state.password)}
    >
    <Text style={{color:'white'}}>Signup</Text>
    </Button>
    </Form>
    </Container>



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
  buttonText:
  {
    fontSize:18,
    color:'black',
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
