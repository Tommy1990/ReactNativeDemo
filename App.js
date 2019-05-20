import React,{Component} from 'react';
import {DrawerItems} from 'react-navigation';
import {createBottomTabNavigator,createStackNavigator,createAppContainer,
  createSwitchNavigator,createDrawerNavigator,AppRegistry} from 'react-navigation';
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
import commenStyles from './SRC/Base/CommenStyle';
import ParkSelectPage from './SRC/Home/ParkSelectPage';
import ParkWeatherPage from './SRC/Home/ParkWeatherPage';
import BaseWebView from './SRC/Base/BaseWebView';
import ParkVideoDetailPage from './SRC/Home/ParkVideoDetailPage';
import CompanySelectPage from './SRC/Setting/CompanySelectPage';
import NormalWorkPage from './SRC/Setting/NormalWork/NormalWorkPage';
import NormalWorkSelectPage from './SRC/Setting/NormalWork/NormalWorkSelectPage';
import NoramlDetailPage from './SRC/Setting/NormalWork/NormalDetailPage';
import MineStructPage from './SRC/Mine/MineStructPage';
import MineInfoPage from './SRC/Mine/MineInfoPage';
import MineMsgPage from './SRC/Mine/MIneMsgPage';
import MineChangePage from './SRC/Mine/MineChangeCompany';
import MineSettingPage from './SRC/Mine/MineSettingPage';
import NormalWorkCreatePage from './SRC/Setting/NormalWork/NormalWorkCreatePage';
import NormalWorkTypeSelectPage from './SRC/Setting/NormalWork/NormalWorkTypeSelectPage';
import NormalWorkSelectParkPage from './SRC/Setting/NormalWork/NormalWorkSelectParkPage';
import NormalWorkSelectMaterialPage from './SRC/Setting/NormalWork/NormalWorkSelectMaterialPage';
import NormalWorkPersonpage from './SRC/Setting/NormalWork/NormalWorkPersonPage';
import NormalWorkDailyCreatePage from './SRC/Setting/NormalWork/NormalWorkDailyCreatePage';
import NormalWorkDailySelectFarmPage from './SRC/Setting/NormalWork/NormalWorkDailySelectFarmPage';
import NormalWorkDailySelectMaterialPage from './SRC/Setting/NormalWork/NormalWorkDailySelectMaterialPage';
import ModalLoading from './SRC/Modal/ModalLoading';
import fetchData from './SRC/Base/FetchData';
import BaseDimension from './SRC/Base/BaseDimension';
import REQUEST_URL from './SRC/Base/BaseWeb';
import fetchEZData from './SRC/Base/FetchEZData';
import UploadFile from './SRC/Base/UpLoadFile';
import CompanyListView from './SRC/Setting/NormalWork/View/ComapnyListView'
import ProjectDailyView from './SRC/Setting/NormalWork/View/ProjectDailyView'
import ProjectDetailView from './SRC/Setting/NormalWork/View/ProjectDetailView'
import ProjectMsgView from './SRC/Setting/NormalWork/View/ProjectMsgView'
import ProjectStatueView from './SRC/Setting/NormalWork/View/ProjectStatueView'
import ProjecttitleView from './SRC/Setting/NormalWork/View/ProjecttitleView'
import FarmView from './SRC/Home/View/FarmView'
import VideoListView from './SRC/Home/View/VideoListView'
import WeatherStationView from './SRC/Home/View/WeatherStationView'
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-crop-picker';
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
  NormalCreate:NormalWorkCreatePage,
  NormalWorkType:NormalWorkTypeSelectPage,
  NormalFarmSelect:NormalWorkSelectParkPage,
  NormalMaterialSelect:NormalWorkSelectMaterialPage,
  NormalPersonSelect:NormalWorkPersonpage,
  NormalDailyCreate:NormalWorkDailyCreatePage,
  NormalDailyParkSelect:NormalWorkDailySelectFarmPage,
  NormalDailyMaterialSelect:NormalWorkDailySelectMaterialPage,
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
  MimeStruct:MineStructPage,
  MineInfo:MineInfoPage,
  MineMsg:MineMsgPage,
  MineChange:MineChangePage,
  MineSetting:MineSettingPage,
  // Drawer:DrawerScreen,
},{
  drawerWidth:300,
  contentComponent: props =>{
    var {height,width} = Dimensions.get('window')
  return(
    <DrawerScreen tempNav = {props.navigation}/>
   )
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

const Modalstack = createStackNavigator({
  SwitchNav:SwitchNav,
  LooadingModal:ModalLoading,
},{
  mode:'modal',
  headerMode:'none',
  initialRouteKey:'SwitchNav'
})

const AppContainer = createAppContainer(Modalstack);
export default class App extends Component{
  render(){
    
    return (
      <AppContainer></AppContainer>
    )
  }
}