import React from 'react';
import { 
  View
} from 'react-native';
import { 
  Entypo, 
  FontAwesome5, 
  Ionicons 
} from '@expo/vector-icons';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingScreen from './SettingScreen';
import ProfileScreen from './ChartScreen';
import { WebView } from 'react-native-webview';
import FastImage from 'react-native-fast-image';
import MqttComponent from '../component/MqttServer';
import MonitorPanel from '../component/MonitorPanel';
import LogoName from '../component/LogoName';


const MonitorScreen = () => {

  const [mqttTds, setMqttTds] = React.useState('');
  const [mqttWaterLevel, setMqttWaterLevel] = React.useState('');

  function handleTds(newValue:string){
    setMqttTds(newValue);
  }

  function handleWl(newValue:string){
    setMqttWaterLevel(newValue);
  }

  return(
    <FastImage 
      source={require('../assets/user.png')}
      style={{flex:1}}>
      
      <MqttComponent brokerUrl={'140.117.172.18'} setTds={handleTds} setWl={handleWl}/>

        <View style={{flex:0.15,flexDirection:'row'}}>
          <LogoName/>
        </View>
        
        <View style={{flex:0.45}}>
          <WebView
            source={{uri: 'http://140.117.172.18:8088/0.m3u8'}} 
            style={{flex: 0.8}}
          />
        </View>

        <View style={{flex: 0.45,marginTop: -20}}>
          <MonitorPanel tds={mqttTds} wl={mqttWaterLevel}/>
        </View>

      </FastImage>
    );
  };

export default function HomePage():JSX.Element{
  const Tab = createBottomTabNavigator();
  return (
      <Tab.Navigator screenOptions={{headerShown:false, tabBarShowLabel:false, tabBarStyle:{backgroundColor:'black', paddingTop:15}}}>
        <Tab.Screen 
          name="Home" 
          component={MonitorScreen} 
          options={{tabBarIcon:() => (<Entypo name='home' size={32} color="white"/>)}}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarIcon:() => (<FontAwesome5 name='user-alt' size={32} color="white"/>)}}/>
        <Tab.Screen name="Settings" component={SettingScreen} options={{tabBarIcon:() => (<Ionicons name='settings' size={32} color="white"/>)}}/>
      </Tab.Navigator>
  );
}
