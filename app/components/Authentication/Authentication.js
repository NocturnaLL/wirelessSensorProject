import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import firebase from 'firebase';
import Title from '../Title/Title'


import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base'
class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:''
    };
  }
  signUpUser = (email,password) =>{
    try{
      
      if(this.state.password.length<6){
        alert("Password must be longer than 6 characters")
        return;
      }
      else{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        alert("Signup successfully")

      }

    }
    catch(error){
      console.log(error.toString())
    }
  }

  loginUser = (email,password) =>{
    try{
      firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
        alert("Login successful ")

      })
    }
    catch(error){
        console.log(error.toString())
    }
  }


  render() {
    return (
      <View style={styles.container}>
      <Title/>
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

const styles = {
  container: {
    flex: 1,
     backgroundColor: '#fff',
     justifyContent: 'center',
     padding:10,
  }
};

export default Authentication;
