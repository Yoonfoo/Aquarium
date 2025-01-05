import React from 'react';
import { 
  View, 
  StyleSheet, 
  Text,
  FlatList,
  TouchableOpacity } from 'react-native';
import { MaterialIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const USERDATALIST = [
  {
    icon: 'user',
    title: 'Username',
    arrow: 'right',
  },
  {
    icon: 'lock',
    title: 'Password',
    arrow: 'right',
  },
  {
    icon: 'mail',
    title: 'Email',
    arrow: 'right',
  },
]

const OTHERLIST = [
  {
    icon: 'info',
    title: 'About Us',
    arrow: 'right',
  },
  {
    icon: 'question-answer',
    title: 'FAQ',
    arrow: 'right',
  },
]

const LOGOUT:{
  icon: string; 
  title: string;
}[] = [
  {
    icon: 'power-off',
    title: 'Log Out'
  }
]

const SettingItem = ({icon, title, arrow}) => (
    <View style={style.itemContainer}>
      <View style={{flex: 0.2,justifyContent:'center',paddingRight: 5, paddingLeft: 20, marginLeft: 20,}}>
        <AntDesign name={icon} size={24}/>
      </View>
      <View style={{flex: 1.6}}>
        <Text style={style.itemText}>{title}</Text>
      </View>
      <View style={{flex: 0.2,justifyContent:'center',alignItems:'flex-end', marginRight: 25}}>
        <AntDesign name={arrow} size={24}/>
      </View>
    </View>
);

const AnotherItem = ({icon, title, arrow}) => (
  <TouchableOpacity style={style.itemContainer}>
    <View style={{flex: 0.2,justifyContent:'center',paddingRight: 5, paddingLeft: 20, marginLeft: 20}}>
      <MaterialIcons name={icon} size={24} />
    </View>
    <View style={{flex: 1.6}}>
      <Text style={style.itemText}>{title}</Text>
    </View>
    <View style={{flex: 0.2,justifyContent:'center',alignItems:'flex-end', marginRight: 25}}>
      <AntDesign name={arrow} size={24}/>
    </View>
  </TouchableOpacity>
);

const LogOutItem = ({icon, title}) => (
  <View style={style.logoutButton}>
    <View style={{flex: 0.5,alignItems: 'flex-end'}}>
      <FontAwesome5 name={icon} size={24} color='red' />
    </View>
    <View style={{flex: 0.5,marginLeft: 10, marginRight: 50}}>
      <Text style={{fontSize: 18, color:'red'}}>{title}</Text>
    </View>
  </View>
)

export default function SettingScreen():JSX.Element {
    
  const navigation = useNavigation();

    return(
      <View style={{flex: 1, backgroundColor:'lightgray'}}>
        <View style={style.titleContainer}>
          <Text style={style.itemTitle}>Settings</Text>
        </View>
        <View style={style.listContainer}>
          <Text style={style.secondTitle}>Login Information</Text>
          <FlatList
            data={USERDATALIST}
            scrollEnabled={false}
            renderItem={({item}) => <SettingItem icon={item.icon} title={item.title} arrow={item.arrow} />}
            /> 
          <Text style={style.thirdTitle}>Others</Text>
          <FlatList
            data={OTHERLIST}
            scrollEnabled={false}
            renderItem={({item}) => <AnotherItem icon={item.icon} title={item.title} arrow={item.arrow} />}
            />
        </View>
        <TouchableOpacity style={style.logoutContainer} activeOpacity={0.4}>
          <FlatList
            data={LOGOUT}
            scrollEnabled={false}
            renderItem={({item}) => <LogOutItem icon={item.icon} title={item.title} />}
            />
        </TouchableOpacity>
      </View>
      
    );
};


const style = StyleSheet.create({
  
  itemContainer:{
    flex: 1,
    flexDirection: 'row',
  },
  logoutButton: {
    flex: 1,
    flexDirection: 'row',
  },
  titleContainer:{
    paddingBottom: 30,
    backgroundColor: '#3399ff',
  },
  itemTitle:{
    padding: 40,
    paddingBottom: 70,
    marginTop: 30,
    marginLeft: -20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
  },
  secondTitle:{
    padding: 10,
    marginTop: 20,
    marginLeft: 20,
    color: 'gray',
    fontSize: 14,
  },
  thirdTitle: {
    padding: 10,
    marginTop: -20,
    marginLeft: 20,
    color: 'gray',
    fontSize: 14
  },
  listContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: -50,
    marginBottom: 100,
    shadowOffset: {width: 0, height: 5},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  logoutContainer: {
    flex: 0.1,
    paddingTop: 20,
    marginTop: -70,
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    shadowOffset: {width: 0, height: 5},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
    backgroundColor: 'white',
  },
  itemText:{
    padding: 20,
    fontSize: 18,
  },
});