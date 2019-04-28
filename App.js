import React,{Component} from 'react';
import {DrawerItems} from 'react-navigation';
import {createBottomTabNavigator,createStackNavigator,createAppContainer,createSwitchNavigator,createDrawerNavigator} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import HomeScreen from './SRC/Home/Home';
import HomeChildPage from './SRC/Home/HomeChildPage'
import SettingScreen from './SRC/Setting/SettingScreen'
import LoginScreen from './SRC/Login/LoginScreen'
import { SafeAreaView,TouchableOpacity,View,Text,Dimensions } from 'react-native';
import VaildMessageScreen from './SRC/Login/VaildMessageScreen';
import UserModel from './SRC/Base/UserModel';
import ResetPSWDScreen from './SRC/Login/ResetPSWDScreen';
import LoadingScreen from './SRC/Base/LoadingScreen';
import DrawerScreen from './SRC/Drawer/DrawerScreen';
import { ScrollView } from 'react-native-gesture-handler';
import commenStyles from './SRC/Base/CommenStyle';
import ParkSelectPage from './SRC/Home/ParkSelectPage';
import ParkWeatherPage from './SRC/Home/ParkWeatherPage';
import BaseWebView from './SRC/Base/BaseWebView';
import ParkVideoDetailPage from './SRC/Home/ParkVideoDetailPage';
import CompanySelectPage from './SRC/Setting/CompanySelectPage';
import NormalWorkPage from './SRC/Setting/NormalWork/NormalWorkPage';
import NormalWorkSelectPage from './SRC/Setting/NormalWork/NormalWorkSelectPage';
import NoramlDetailPage from './SRC/Setting/NormalWork/NormalDetailPage';
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
  ParkSelect:ParkSelectPage,
  ParkWeather:ParkWeatherPage,
  WebView:BaseWebView,
  ParkVideoDetail:ParkVideoDetailPage
},{
  initialRouteName:'Main',
})
//设置
const SettingNav = createStackNavigator({
  Main:SettingScreen,
  CompanySelect:CompanySelectPage,
  Normalwork:NormalWorkPage,
  NormalSelect:NormalWorkSelectPage,
  NormalDetail:NoramlDetailPage,
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
  initialRouteName:'TabSetting',
  defaultNavigationOptions:({navigation}) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      
      let iconName;
      if (routeName === 'TabHome') {
        iconName = '园区';
      } else if (routeName === 'TabSetting') {
        iconName = '工作';
      }

     
      return (<View><Text style={{color:focused? '#00a056':'#333'}}>{iconName}</Text></View>);
    },
  }),
  tabBarOptions:{
    showLabel:false,
    activeTintColor:'#00a056',
    inactiveTintColor:'#333',
  }
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
    var {height,width} = Dimensions.get('window')
  return(<ScrollView style={{flex:1}}>
    <SafeAreaView style={{height:height,alignItems:'center',justifyContent:'flex-start'}}>
    <View style={{flex:4}}>
    <TouchableOpacity
       onPress = {()=> props.navigation.navigate('HomePage')}
       style={{marginTop:20}}>
       <Text style={{color:'blue',fontSize:16}}>跳转到主导航</Text>
       </TouchableOpacity>
    </View>
    <View style={{flex:1,justifyContent:"center"}}>
    <TouchableOpacity
       onPress = {async()=> {
        this._logout(props);
       } }>
       <Text style={{color:'blue',fontSize:16}}>退出</Text>
       </TouchableOpacity>
    </View> 
    </SafeAreaView>
   </ScrollView>)
  },
})

_logout = async(props) => {
  let model = new UserModel();
  await model.cleanLoginData();
  props.navigation.navigate('Loading')
}


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