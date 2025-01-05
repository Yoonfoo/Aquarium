import React from 'react';
import { View, Text, TouchableOpacity, ViewProps, ImageBackgroundProps } from 'react-native';
import FastImage from 'react-native-fast-image';


export default function NavigationBar(props:ViewProps){

    return(
        <View
            style={[props.style]}>
            <FastImage 
            style={{width: 50, height: 25,margin: 5}}
            source={require('../assets/fish.png')}
            resizeMode={FastImage.resizeMode.contain} />
            <TouchableOpacity>
                <Text style={{margin: 5, marginTop: 10}}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{margin: 5, marginTop: 10}}>Groups</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{margin: 5, marginTop: 10}}>About Us</Text>
            </TouchableOpacity>
        </View>
    )
}

// export default NavigationBar;