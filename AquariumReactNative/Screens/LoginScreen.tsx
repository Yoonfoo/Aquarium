import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import HomePage from './MonitorScreen';

//---------------User Login Part-------------------

const UserInput = () => {

  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = () => {
    // Prepare the data to send to the server
    const data = {
      grant_type: 'password',
      client_id: '9a767ba7-88c4-43a3-971e-6bb1045ca384',
      client_secret: 'CzEL96En0HGf3ANi1X1aaI4MsDthtRunGlOD5HRi',
      username: username,
      password: password,
    };

    if (!username || !password) {
      alert('Username and password cannot be empty!');
      console.log('Empty username or password');
    } else {
      // Make a POST request to your server
      fetch('https://iqua.atrest.xyz/oauth/token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((responseData) => {
          // Handle the response from the server
          if (responseData.access_token) {
            alert('Login Successful!');
            navigation.navigate('HomePage');
          } else {
            alert('Wrong username or password!');
            console.log(username)
            console.log(password)
            console.log(responseData)
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  };

  return (

    <KeyboardAvoidingView behavior="height" style={styles.kavContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
        <FastImage 
        source={require('../assets/fish.png')} 
        style={{flex:0.4, width: 220,marginLeft: 50,marginBottom: 60}}
        resizeMode={FastImage.resizeMode.contain}
      />
          <Text style={{flex: 0.25, color:'white',fontSize: 36,textAlign:'center',fontWeight:'bold'}}>Login</Text>
          <TextInput
            style={styles.inputBar}
            placeholder="Username"
            placeholderTextColor="gray"
            onChangeText={(username) => onChangeUsername(username)}
            defaultValue={username}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.inputBar}
            placeholder="Password"
            placeholderTextColor="gray"
            onChangeText={(password) => onChangePassword(password)}
            defaultValue={password}
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleLogin()}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPwButton}>
            <Text style={styles.forgotPw}>Forgot Password ?</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>New Here?</Text>
            <TouchableOpacity>
              <Text
                style={styles.signupButton}
                onPress={() => navigation.navigate('SignUpScreen')}>
                
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

//--------------------Login Screen Main Function------------------------------------

export default function LoginScreen():JSX.Element {
  return (
    <FastImage 
      source={require('../assets/project.png')} 
      style={styles.background}
    >
      <UserInput />
    </FastImage>

  );
};

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  kavContainer: {
    flex: 1,
  },

  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },

  inputBar: {
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    padding: 10,
    color: 'white',
  },

  buttonContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },

  loginButton: {
    marginTop: 20,
    marginRight: 80,
    marginLeft: 80,
    borderRadius: 30,
    backgroundColor: 'white',
  },

  buttonText: {
    padding: 15,
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontWeight:'bold'
  },

  forgotPwButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },

  forgotPw: {
    justifyContent: 'center',
    color: 'white',
    fontSize: 15,
  },

  signupContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent:'center',
    marginTop: 150,
  },

  signupText: {
    color: 'white',
    fontSize: 18,
    marginRight: 5,
  },

  signupButton: {
    fontSize: 18,
    color: 'red',
  },

});


