import React,{Component} from 'react';
import {SafeAreaView,Text,TouchableOpacity,StyleSheet,Button,ScrollView,View,Dimensions,Image} from 'react-native';
import createStackNavigator from 'react-navigation';
import UserModel from '../Base/UserModel';
import REQUEST_URL from '../Base/BaseWeb'
import fehchData from '../Base/FetchData';
import FarmView from './View/FarmView';
import WeatherStationView from './View/WeatherStationView';
export default class HomeScreen extends Component{
   static navigationOptions = ({navigation})=>{
       var parkName = navigation.getParam('title','');
       return{
           headerTitle:(<Text style={{color:'#00a056',fontSize:20,fontWeight:'bold'}}>{parkName}</Text>),
           headerLeft:(<Button onPress={()=> navigation.openDrawer()} title="openDrawer" color='#333' fontSize={15}/>),
           headerRight:(<Button onPress= {() =>{
             let parkID = navigation.getParam('id','');
             navigation.navigate('ParkSelect',{id:parkID});
           }} 
            title='园区' color='#333'/>) 
       }
   }
  constructor(props){
      super(props);
      this.state = {
          selectIndex:1,
          parkID:'',
          parkName:'',
          companyId:'',
      }
  }
  _categorySlect = (index) =>{
      this.setState({
          selectIndex:index,
      })
  }
  didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload =>{
          this._fetchWeatherStationData();
      }
  )
   componentDidMount(){
    this._getParkInfo();
   }
   //设置初始化内容
   _getParkInfo = async()=>{
    const {navigation} = this.props;
    const ID = navigation.getParam('id','');
    var name = navigation.getParam('title','');
    var company = navigation.getParam('companyID','');
    if (ID.length == 0){
        let model = new UserModel();
        let companyModel= await model.getDefaultCompany();
        let park = companyModel.park[0];
        this.setState({
            parkID:park.id,
            parkName:park.nf_farmName,
            companyId:companyModel.id
        })
        this.props.navigation.setParams({title:park.nf_farmName,id:park.id,companyID:companyModel.id});
        this._fetchWeatherStationData();
    }else{
        this.setState({
            parkID:ID,
            parkName:name,
            companyID:company,
            farmModel:null,
        })
        alert(company);
        this.props.navigation.setParams({title:name});
        this._fetchWeatherStationData();
    }
    
   } 

   //获取网络数据
   _fetchWeatherStationData = async() =>{
        let url = new REQUEST_URL();
        
        let params = {farmId:this.state.parkID,companyId:this.state.companyId};
        if ((this.state.parkID == '')||(this.companyID == '')){
            return
        }

        this.setState({
            farmModel:null,
        })
        fehchData(url.PARK_WEATHER_STATION_DATA,params,(responds,error)=>{

            if (error !== null){
                alert(error.message)
            }else{
                this.setState({
                    farmModel:responds,
                })
            }
        })

   }
    render(){
        
        let {width,height} = Dimensions.get('window');
        return(<SafeAreaView style={styles.container}>
        <View style={styles.categoryScrollContiner}>
        <ScrollView style={{flex:1,flexDirection:'row'}} horizontal={true} contentContainerStyle={{marginLeft:20}}>
          <Button title="监测数据" onPress={() => this._categorySlect(1)} 
          color = {this.state.selectIndex == 1 ? '#00a056' : '#333'}  
          fomntSize = {this.state.selectIndex == 1 ? 16 : 14} />  
          <Button title="监控数据" onPress={()=>this._categorySlect(2)} 
          color = {this.state.selectIndex == 2 ? '#00a056' : '#333'}  
          fomntSize = {this.state.selectIndex == 2 ? 16 : 14} />   
          <Button title="地块数据" onPress={()=>this._categorySlect(3)} 
          color = {this.state.selectIndex == 3 ? '#00a056' : '#333'}  
          fomntSize = {this.state.selectIndex == 3 ? 16 : 14} />  
        <Button title="水肥一体" onPress={()=>this._categorySlect(4)} 
          color = {this.state.selectIndex == 4 ? '#00a056' : '#333'}  
          fontSize = {this.state.selectIndex == 4 ? 16 : 14} /> 
        </ScrollView>
        </View>
        <View style={styles.bottomContainer}>
        <ScrollView style={{flex:1}} horizontal={true} pagingEnabled={true}>
        <WeatherStationView tempNavigation={this.props.navigation} model={this.state.farmModel !== null ? this.state.farmModel : null}></WeatherStationView>
        <FarmView tempNavigation={this.props.navigation} ></FarmView>
        </ScrollView>
        </View>
        </SafeAreaView>)
    }
    _onPress = ()=>{
        this.props.navigation.navigate('ChildFirst',{
            itemID:66,
            title:'childPage'
        });
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#eee',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    button:{
        justifyContent:'center',
        padding:10,
    },
    text:{
        color:'#333',
        fontSize:20,
    },
    categoryScrollContiner:{
        width:'100%',
        height:44,
        backgroundColor:'#fff',
    },
    bottomContainer:{
        flex:1,
        color:'#fff'
    }
})
