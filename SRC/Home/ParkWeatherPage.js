import React,{Component} from 'react';
import {Demission,SafeAreaView,View,ScrollView,TouchableOpacity,Text,ImageBackground,StatusBar,Button,Image} from 'react-native';

export default class ParkWeatherPage extends Component{
    static navigationOptions = (navigation)=>{
        return {
            header:null,
        }
    }
    _setDailyItems = (list)=>{
        var items = [];
        let length = list.length;
        for (i=0;i<24;i++){
            // let model = list[i];
            let img = require('../../img/weather_default.png');
            let item = <View style={{justifyContent:'flex-start',alignItems:'center',marginLeft:20}}>
            <Text style={{color:'#fff',marginTop:10}}>--:--</Text>
            <Image source={img} style={{width:18.5,height:19,marginTop:10}}></Image>
            <Text style={{color:'#fff',marginTop:10}}>--°</Text>
            </View>
            items.push(item);
        }

        return items;
    }
    _setWeekItems = (list)=>{
        var items = [];
        let length = list.length;
        for(i=0;i<15;i++){
            let img = require('../../img/weather_default.png');
            let item = <View style={{justifyContent:'flex-start',alignItems:'center',marginLeft:10,borderRightColor:'#fff',borderRightWidth:0.5}}>
            <Text style={{color:'#fff'}}>--</Text>
            <Text style={{color:'#fff',fontSize:12,marginTop:10}}>--/--</Text>
            <Text style={{color:'#fff',marginTop:10}}>--</Text>
            <Image source={img} style={{width:18.5,height:19,marginTop:28}}></Image>
            <Text style={{color:'#fff',marginTop:28}}>--°~--°</Text>
            <Text style={{color:'#fff',marginTop:10}}>---</Text>
            <Text style={{color:'#fff',marginTop:10}}></Text>
            </View> 
            items.push(item);
        }
        return items;
    }
    render(){
        let items = this._setDailyItems([]);
        let weekItems = this._setWeekItems([]);
        let date = new Date();
        let num = date.getHours();
        let day = date.getDay();
        var weekday = new Array(7);
        weekday = ['周日','周一','周二','周三','周四','周五','周六'];
        let week = weekday[day];
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
                <ScrollView 
                style={{width:'100%',height:105,borderColor:'#fff',borderBottomWidth:0.5,borderTopWidth:0.5,marginTop:80}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                >{items}
                </ScrollView>
                <Text style={{color:'#fff',fontSize:16,marginLeft:21,marginTop:10}}>15天天气预报</Text>
                <ScrollView 
                style={{width:'100%',marginTop:10}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                >{weekItems}
                </ScrollView>
                </SafeAreaView>
                
                
            </ImageBackground>
        )
    }
}