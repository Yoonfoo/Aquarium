import React from 'react'
import {
    Text,
    StyleSheet,
    View
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ControlScreen(): JSX.Element {

    return(
         <View style={style.main}>
            <View style={style.controller}>
                <Text>Feeder</Text>
                <TouchableOpacity>
                    <View>
                        <Text>Run</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={style.controller}>
                <Text>Light</Text>
                <TouchableOpacity>
                    <View>
                        <Text>Light On</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={style.controller}>
                
            </View>
            <View style={style.controller}>
                
            </View>
         </View>
    );
} 
  
const style = StyleSheet.create({
 
    main:{
        flex: 1
    } ,
    controller:{
        flex: 0.25,
        margin: 20,
        borderRadius: 10,
    }
})