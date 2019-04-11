import React,{Component} from 'react';
import {SafeAreaView,Text,TouchableOpacity,StyleSheet,Button,ScrollView,View,Dimensions} from 'react-native';
import createStackNavigator from 'react-navigation';
import WeatherSationView from './View/WeatherStationView'
import UserModel from '../Base/UserModel';
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
      }
  }
  _categorySlect = (index) =>{
      this.setState({
          selectIndex:index,
      })
  }
  _selectPark = (navigation) =>{  
        
  }
   componentDidMount(){
    const {navigation} = this.props;
     const ID = navigation.getParam('id','');
     var name = navigation.getParam('title','');
     if (ID.length == 0){
       foo = async()=>{
        let model = new UserModel();
        let companyModel= await model.getDefaultCompany();
        let park = companyModel.park[0];
        this.setState({
            parkID:park.id,
            parkName:park.nf_farmName,
        })
        this.props.navigation.setParams({title:park.nf_farmName,id:park.id});
       }
       foo();
     }else{
        this.setState({
            parkID:ID,
            parkName:name,
        })
     }
     this.props.navigation.setParams({title:name});
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
        <ScrollView style={{flex:1}} horizontal={true}>
        <WeatherSationView tempNavigation={this.props.navigation}></WeatherSationView>
        <View style={{width:width,flex:1,backgroundColor:'blue'}}></View>
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
