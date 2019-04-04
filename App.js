import React,{Component} from 'react';
import {createBottomTabNavigator,createStackNavigator,createAppContainer,createSwitchNavigator} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import HomeScreen from './SRC/Home/Home';
import HomeChildPage from './SRC/Home/HomeChildPage'
import SettingScreen from './SRC/Setting/SettingScreen'
import LoginScreen from './SRC/Login/LoginScreen'
import { TouchableOpacity } from 'react-native';
import VaildMessageScreen from './SRC/Login/VaildMessageScreen';
import UserModel from './SRC/Base/UserModel';
import ResetPSWDScreen from './SRC/Login/ResetPSWDScreen';
//登录
const LoginNav = createStackNavigator({
  Login:LoginScreen,
  Vaild:VaildMessageScreen,
  Reset:ResetPSWDScreen,
},{
  initialRouteName:'Login',
})
//主页
const HomeNav = createStackNavigator({
  Home:HomeScreen,
  ChildFirst:HomeChildPage,
},{
  initialRouteName:'Home',
})
//设置
const SettingNav = createStackNavigator({
  Home:SettingScreen,
})
//底部导航
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
    tabBarOnpress : ({navigation}) =>{
      if (navigation.routeName === 'Home'){
        navigation.navigate('Home');
      }else if (navigation.routeName === 'Setting'){
        navigation.navigate('Setting');
      }
    }
  },
})
const model = new UserModel();
const SwitchNav = createSwitchNavigator({
  Tab:TabNavigator,
  Load:LoginNav
},{
  initialRouteName: model.getToken() ? 'Load' : 'Tab',
})


const AppContainer = createAppContainer(SwitchNav);

export default class App extends Component{
  render(){
    return (
      <AppContainer></AppContainer>
    )
  }
}