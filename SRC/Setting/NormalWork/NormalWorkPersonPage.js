import React,{Component} from 'react';
import {View,Image,TouchableOpacity,DeviceEventEmitter} from 'react-native';
export default class NormalWorkPersonpage extends Component{

    static navigationOptions = ({navigation}) =>{
        return({
            headerTitle:<Text style={{color:'#333',fontSize:18}}>物料范围</Text>,
            headerBackImage:<Image source={require('../../../img/close.png')} style={{width:12.5,height:12.5,marginLeft:21}} resizeMode='contain'/>,
            headerRight:(<TouchableOpacity style={{marginRight:21}} 
            hitSlop={{top:20,bottom:20,right:20,left:20}}
            onPress={()=>{
               DeviceEventEmitter.emit('personSubmit');
            }}> 
                <Image source={require('../../../img/select.png')} style={{width:16.5,height:11.5}} resizeMode='contain'/>
            </TouchableOpacity>)
        })
    }
    componentDidMount(){

        this.listener = DeviceEventEmitter.addListener('personSubmit',()=>{
            this.props.navigation.navigate('NormalCreate',{})
        })
    }
    render(){
        return(<View>

        </View>)
    }
}