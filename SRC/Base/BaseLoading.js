import React,{Component} from "react";
import {ActivityIndicator, StyleSheet, Text, View,Dimensions} from 'react-native';
let {width,height} = Dimensions.get('window');

export default class BaseLoading extends Component{
    constructor(props){
        super(props)
        this.minShowingTime = 200;
        this.state = {
            isLoading:false,
        }
    }
    showLoading = ()=>{
        this.setState({
            isLoading:true
        })
    }
    dismissLoading = ()=>{
        this.setState({
            isLoading:false
        })
    }
    render(){
        if(!this.state.isLoading){
            return null
        }
        return(
            <View style={{
                flex:1,width:width,height:height,justifyContent:'center',alignContent:'center',position:'absolute'
            }}>
                <View 
                style={{width:100,height:80,backgroundColor:'#10101099',borderRadius:10,alignItems:'center',justifyContent:'center',
                position:'absolute',top:(height-80)/2,left:(width-100)/2}}>
                    <ActivityIndicator/>
                    <Text style={{color:'#fff'}}>正在加载...</Text>
                </View>
            </View>
        )
    }
}