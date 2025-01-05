import React from 'react';
import { View, ViewProps } from 'react-native';
import { WebView } from 'react-native-webview';

export default function AquariumStream(props:ViewProps){


        return (
            <>
            <WebView
                source={{uri: 'http://140.117.172.18:8088/0.m3u8'}}
                style={[props.style]}
                />
            </>
        )

}
