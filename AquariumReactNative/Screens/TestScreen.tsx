import React from 'react';
import { View, Text } from 'react-native';
import NavigationBar from '../component/NavigationBar';
import AquariumStream from '../component/AquariumStream';

export default function TestScreen() {

    return(
        <View style={{flex:1}}>
            <NavigationBar style={{flex: 0.07, flexDirection: 'row', margin: 5, borderBottomWidth: 1, borderColor: 'lightgray'}}/>
            <View style={{flex: 1}}>
                <Text style={{margin: 5, marginLeft: 15, fontSize: 24}}>IQUA</Text>
                <Text style={{marginLeft: 15}}>Iqua</Text>
                <AquariumStream style={{flex: 0.3, margin: 5}}/>
            </View>
        </View>
    )
}