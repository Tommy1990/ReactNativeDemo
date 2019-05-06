import  React,{Component} from 'react';
import {SafeAreaView,View,TouchableOpacity,Text,ScrollView,Dimensions,ImageBackground} from 'react-native';

import commenStyles from '../Base/CommenStyle'
import UserModel from '../Base/UserModel';
export default class DrawerScreen extends Component{
   _logOut = async()=>{
    let model = new UserModel();
    await model.cleanLoginData();
    this.props.tempNav.navigate('Loading')
   }
   
    render(){
        let {height} = Dimensions.get('window');
        return(
         <View style={{flex:1,position:'relative',height:height}}>
        <ScrollView style={{flex:1}}>
            <TouchableOpacity style={{flex:1,height:180,}}>
            <ImageBackground style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-end'}} 
           source={require('../../img/mine_top.png')} 
           resizeMode="contain">
           
           </ImageBackground> 
            </TouchableOpacity>
           
        </ScrollView>
         <TouchableOpacity 
         onPress={()=> this._logOut()}
         style={{position:'absolute',bottom:20,
         width:'100%',height:30,backgroundColor:'#00eeee',alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>log out</Text>
         </TouchableOpacity>
         </View>
        )
    }
}