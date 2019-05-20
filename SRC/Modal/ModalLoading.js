import React,{Component} from 'react';
import {View,ActivityIndicator,DeviceEventEmitter,Text} from 'react-native';
export default class ModalLoading extends Component{
    static navigationOptions = ({navigation})=> {
        return{
            body:{
                backgroundColor:'red'
            }
        }
    }
    componentDidMount(){
        this.listener = DeviceEventEmitter.addListener('hiddenLoading',(e)=>{    
            this.props.navigation.goBack()
        })
    }
    componentWillUnmount(){
        this.listener.remove()
    }
    render(){
        return(<View  
        style={{alignItems:'center',justifyContent:"center",flex:1,backgroundColor:'#fff1'}}>
            <ActivityIndicator color='#555'/>
            <Text>正在上传...</Text>
        </View>)
    }
}