import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import HomePage from './Screens/MonitorScreen';
import ProfileScreen from './Screens/ChartScreen';
import SettingScreen from './Screens/SettingScreen';
import ForgotScreen from './Screens/ForgotPassword';
import TestScreen from './Screens/TestScreen';
import { enableScreens } from 'react-native-screens';

const Stack = createStackNavigator();
enableScreens(true);

export default function App():JSX.Element{

    return (
	<NavigationContainer>
		<Stack.Navigator initialRouteName="TestScreen">
	  		<Stack.Screen name="TestScreen" component={TestScreen} options={{headerShown:false}} />
			<Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}} /> 
  			<Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown:false}} />
    		<Stack.Screen name="ForgotScreen" component={ForgotScreen} options={{headerShown:false}} /> 
    		<Stack.Screen name="HomePage" component={HomePage} options={{headerShown:false}} /> 
			<Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown:false}}/> 
    		<Stack.Screen name="SettingScreen" component={SettingScreen} options={{headerShown:false}}/> 
		</Stack.Navigator>
	</NavigationContainer>
    );
    
};
