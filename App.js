import React,{Component} from 'react';
import {DrawerItems} from 'react-navigation';
import {createBottomTabNavigator,createStackNavigator,createAppContainer,createSwitchNavigator,createDrawerNavigator} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import HomeScreen from './SRC/Home/Home';
import HomeChildPage from './SRC/Home/HomeChildPage'
import SettingScreen from './SRC/Setting/SettingScreen'
import LoginScreen from './SRC/Login/LoginScreen'
import { SafeAreaView,TouchableOpacity,View,Text } from 'react-native';
import VaildMessageScreen from './SRC/Login/VaildMessageScreen';
import UserModel from './SRC/Base/UserModel';
import ResetPSWDScreen from './SRC/Login/ResetPSWDScreen';
import LoadingScreen from './SRC/Base/LoadingScreen';
import DrawerScreen from './SRC/Drawer/DrawerScreen';
import { ScrollView } from 'react-native-gesture-handler';
import commenStyles from './SRC/Base/CommenStyle';


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
  Main:HomeScreen,
  ChildFirst:HomeChildPage,
},{
  initialRouteName:'Main',
})
//设置
const SettingNav = createStackNavigator({
  Main:SettingScreen,
})
HomeNav.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0){
    tabBarVisible = false;
  }
  return { tabBarVisible};
};
SettingNav.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0){
    tabBarVisible = false;
  }
  return { tabBarVisible};
};


//底部导航
const TabNavigator = createBottomTabNavigator({
  TabHome:HomeNav,
  TabSetting:SettingNav,
},{
  initialRouteName:'TabHome'
})
//抽屉导航
const DrawerNav = createDrawerNavigator({
  TabNav:TabNavigator,
  HomePage:HomeScreen,
  SettingPage:SettingScreen,
  // Drawer:DrawerScreen,
},{
  drawerWidth:200,
  contentComponent: props =>{
  return(<ScrollView>
    <SafeAreaView style={commenStyles.containerNormal}>
       <TouchableOpacity
       onPress = {()=> props.navigation.navigate('HomePage')}
       style={{marginTop:20}}>
       <Text style={{color:'blue',fontSize:16}}>跳转到主导航</Text>
       </TouchableOpacity>
       
    </SafeAreaView>
   </ScrollView>)
  },
})




const SwitchNav = createSwitchNavigator({
  // Tab:TabNavigator,
  DrawerNav:DrawerNav,
  Load:LoginNav,
  Loading:LoadingScreen
},{
  initialRouteName: 'Loading',
})


const AppContainer = createAppContainer(SwitchNav);

export default class App extends Component{
  render(){
    return (
      <AppContainer></AppContainer>
    )
  }
}