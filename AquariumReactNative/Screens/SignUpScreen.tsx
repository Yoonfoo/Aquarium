import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';


const KeyboardAvoidingComponent = () => {

  const [realname, onChangeRealName] = useState('');
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const [email, onChangeEmail] = useState('');
  const [passwordConfirm, onChangePasswordConfirm] = useState('');

  const navigation = useNavigation();
  
  const handleSignUp = () => {

    const data = {
      grant_type: 'register', 
      client_id: '9a767ba7-88c4-43a3-971e-6bb1045ca384',
      client_secret: 'CzEL96En0HGf3ANi1X1aaI4MsDthtRunGlOD5HRi',
      username: username,
      name: realname,
      email: email, 
      password: password,
      password_confirmation: passwordConfirm
    };

    fetch('https://iqua.atrest.xyz/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.errors != null){
        throw responseData
      }
      if(responseData.status){
        alert("Sign up successful!");
        console.log(responseData);
        navigation.navigate("LoginScreen");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
  };

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <FastImage 
            source={require('../assets/fish.png')} 
            style={styles.logoStyle}
            resizeMode={FastImage.resizeMode.contain}
          />

          <TextInput 
            placeholder="Name" 
            placeholderTextColor="white"
            style={styles.textInput} 
            onChangeText={(realname) => onChangeRealName(realname)}/>
          <TextInput 
            placeholder="Username" 
            placeholderTextColor="white"
            style={styles.textInput} 
            onChangeText={(username) => onChangeUsername(username)}/>
          <TextInput 
            placeholder="Password" 
            placeholderTextColor="white"
            style={styles.textInput} 
            onChangeText={(password) => onChangePassword(password)}/>
          <TextInput 
            placeholder="Confirm Password" 
            placeholderTextColor="white"
            style={styles.textInput} 
            onChangeText={(passwordConfirm) => onChangePasswordConfirm(passwordConfirm)}/>
          <TextInput 
            placeholder="Email" 
            placeholderTextColor="white"
            style={styles.textInput} 
            onChangeText={(email) => onChangeEmail(email)}/>

          <TouchableOpacity 
            style={styles.signUpButton} 
            onPress={() => handleSignUp()}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Have an account?</Text>
            <TouchableOpacity>
              <Text
                style={styles.loginButton}
                onPress={() => navigation.navigate('LoginScreen')}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};


export default function SignUpScreen():JSX.Element{
  return(
    <FastImage 
      source={require('../assets/project.png')} 
      style={styles.background}
    >
      <KeyboardAvoidingComponent/>
    </FastImage>
  );
};

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  //-----------------------Dolphin Logo-----------------------//
  logoStyle: {
    flex:0.6,
    width: 150,
    marginLeft: 95,
    marginBottom: 48,
  },

  //-----------------------Input Part-----------------------//
  container: {
    flex: 1,
  },

  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },

  textInput: {
    height: 50,
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginLeft:20,
    marginRight: 20,
    marginBottom: 10,
  },

  //-----------------------Sign Up Button-----------------------//
  signUpButton: {
    marginTop: 20,
    marginBottom: 40,
    marginRight: 80,
    marginLeft: 80,
    borderRadius: 30,
    backgroundColor: 'white',
  },

  buttonText: {
    padding: 15,
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  //-----------------------Login Button-----------------------//

  loginContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent:'center',
  },

  loginText: {
    color: 'white',
    opacity: 0.5,
    fontSize: 18,
    marginRight: 5,
  },

  loginButton: {
    fontSize: 18,
    color: 'red',
  },
});
