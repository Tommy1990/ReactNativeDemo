import React,{Component} from 'react';
import {createBottomTabNavigator,createStackNavigator,createAppContainer,createSwitchNavigator} from 'react-navigation';
import HomeScreen from './SRC/Home/Home';
import HomeChildPage from './SRC/Home/HomeChildPage'
import SettingScreen from './SRC/Setting/SettingScreen'
import LoginScreen from './SRC/Login/LoginScreen'
import { TouchableOpacity } from 'react-native';

const HomeNav = createStackNavigator({
  Home:HomeScreen,
  ChildFirst:HomeChildPage,
},{
  initialRouteName:'Home',
})

const SettingNav = createStackNavigator({
  Home:SettingScreen,
})
const LoginNav = createStackNavigator({
  Login:LoginScreen,
})
const TabNavigator = createBottomTabNavigator({
  Home:HomeNav,
  Setting:SettingNav,
},{
  tabBarOptions:{
    activeTintColor:'#00a056',
    inactiveTintColor:'#666',
    labelStyle:{
      fontSize:20,
    },
    tabBarButtonComponent:TouchableOpacity,
    tabBarOnpress : ({navigation}) =>{
      if (navigation.routeName === 'Home'){
        navigation.navigate('Home');
      }else if (navigation.routeName === 'Setting'){
        navigation.navigate('Setting');
      }
    }
  },
  
})


const AppContainer = createAppContainer(LoginNav);

export default class App extends Component{
  render(){
    return (
      <AppContainer></AppContainer>
    )
  }
}