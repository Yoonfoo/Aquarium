import FastImage from 'react-native-fast-image';
import {
    StyleSheet,
    Text,
} from 'react-native'

const LogoName: React.FC = ({}) => {

    return(
        <>
        <FastImage
            style={style.logoStyle}
            source={require('../assets/fish.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        <Text style={style.nameStyle}>IQUA</Text>
        </>
    )
}

const style = StyleSheet.create({
    logoStyle:{
        width:80,
        height:50,
        marginTop:40,
        marginLeft:100,
    },

    nameStyle: {
        fontSize: 30,
        marginTop: 42,
        fontWeight: '900',
        color:'white',
    }
})

export default LogoName;