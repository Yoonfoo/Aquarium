import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

export default function CustomButton(text:String){

    return(
        <TouchableOpacity>
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}