import React,{Component} from 'react';
import {Demission,SafeAreaView,View,ScrollView,TouchableOpacity,Text,ImageBackground,StatusBar,Button} from 'react-native';

export default class ParkWeatherPage extends Component{
    static navigationOptions = (navigation)=>{
        return {
            header:null,
        }
    }
    render(){
        let date = new Date();
        let num = date.getHours();
        let day = date.getDay();
        var weekday = new Array(7);
        weekday = ['周日','周一','周二','周三','周四','周五','周六'];
        let week = weekday[day];
        alert(week);
        let img = ((num > 6)||(num < 18))? require('../../img/Park_weather_day.png') : require('../../img/Park_weather_night.png');
        return(
            <ImageBackground style={{width:'100%',height:'100%'}} source={img}>
            <StatusBar barStyle ={((num > 6)||(num < 18))? 'default' : 'light-content'}></StatusBar>
                <SafeAreaView>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:"center",width:'100%',height:44}}>
                <Button title='back' color='#fff' onPress={()=> this.props.navigation.goBack()} style={{marginLeft:21}}></Button>
                <Text style={{fontSize:16,color:'#fff',marginLeft:90}}>未来15日天气</Text>
                </View>
                <View style={{width:'100%',alignItems:'center',marginTop:30}}><Text style={{fontSize:45,color:'#fff'}}>--°</Text></View>
                <View style={{width:'100%',alignItems:'center',marginTop:15}}><Text style={{color:'#fff'}}> --- </Text></View>
                <View style={{width:'100%',alignItems:'center',marginTop:15}}><Text style={{color:'#fff'}}>{week}</Text></View> 
                </SafeAreaView>
            </ImageBackground>
        )
    }
}