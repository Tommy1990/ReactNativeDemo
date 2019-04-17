import React,{Component} from 'react';
import {Demission,SafeAreaView,View,ScrollView,TouchableOpacity,Text,ImageBackground,StatusBar} from 'react-native';

export default class ParkWeatherPage extends Component{
    static navigationOptions = (navigation)=>{
        return {
            header:null,
        }
    }
    render(){
        let date = new Date();
        let num = date.getHours();
        let img = ((num > 6)||(num < 18))? require('../../img/Park_weather_day.png') : require('../../img/Park_weather_night.png');
        return(
            <ImageBackground style={{width:'100%',height:'100%'}} source={img}>
            <StatusBar barStyle ={((num > 6)||(num < 18))? 'default' : 'light-content'}></StatusBar>
                <SafeAreaView>

                </SafeAreaView>
            </ImageBackground>
            
        )
    }
}