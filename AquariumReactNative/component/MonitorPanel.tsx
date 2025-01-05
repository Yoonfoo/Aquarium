import React from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export type Props = {
    tds: string
    wl: string
}
const MonitorPanel: React.FC<Props> = ({tds, wl}) => {

    return(
        <>
        <LinearGradient
            colors={['#373b44' , '#4286f4']}
            start={{x:0.1,y:0.5}}
            style={dataPlane.plane}>
            <Text style={dataPlane.text}>Measurement of Aquarium</Text>
            <Text style={dataPlane.text}>Temperature: 30C</Text>
            <Text style={dataPlane.text}>Water Level: {wl}</Text>
            <Text style={dataPlane.text}>Total Dissolve Solid: {tds}mg/L</Text>
          </LinearGradient>
        </>
    )
}

const dataPlane = StyleSheet.create({
    plane:{
      flex: 1,
      borderRadius: 20,
      margin: 10,
      marginBottom: 30,
      opacity: 0.6
    },
    text:{
      flex: 1,
      fontSize: 20,
      color: 'white',
      top: 10,
      left: 30,
    },
   });

export default MonitorPanel;