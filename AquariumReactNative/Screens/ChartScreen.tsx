import React, { useState, useEffect, FC } from 'react';
import Paho from 'paho-mqtt';
import { CurveType, LineChart } from "react-native-gifted-charts";
import {
  Button, 
  ImageBackground, 
  View, 
  StyleSheet, 
  Dimensions,
  Text } from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';
import FastImage from 'react-native-fast-image';
import { WebView } from 'react-native-webview';

const MyLoader = () => (
    <ContentLoader speed={1} backgroundColor='black'>
        <Rect x="0" y="0" rx="5" ry="5" width="395" height="190"/>
    </ContentLoader>
)


export default function ProfileScreen():JSX.Element{
 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

      setTimeout(() => {

        setIsLoading(false);
      }, 2000);
    }, []);

    return(
        <FastImage 
          source={require('../assets/user.png')} 
          style={{flex: 1}}>
              <WebView
                source={{ html: "<iFrame src='http://140.117.172.18:3000/d-solo/e1e47c27-6b8d-4c3d-8f72-3facdb5362da/first-dashboard?orgId=1&refresh=5s&panelId=2' width='960' height='500' frameborder='0' />"}}
                style={{margin: 5, backgroundColor: 'transparent'}}
                containerStyle={{flex:1, marginBottom: -300, backgroundColor:'transparent'}}
                startInLoadingState={true}
                renderLoading={()=><MyLoader/>}
              />
              <WebView
                source={{ html: "<iFrame src='http://140.117.172.18:3000/d-solo/e1e47c27-6b8d-4c3d-8f72-3facdb5362da/first-dashboard?orgId=1&refresh=10s&panelId=3' width='960' height='500' frameborder='0' />"}}
                style={{margin: 5, backgroundColor: 'transparent'}}
                containerStyle={{flex:1, marginBottom: 0, backgroundColor:'transparent'}}
                startInLoadingState={true}
                renderLoading={()=><MyLoader/>}
              />
        </FastImage>
    );
};
