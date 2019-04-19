import React,{Component} from 'react';
import {Demission,SafeAreaView,View,ScrollView,TouchableOpacity,Text,ImageBackground,StatusBar,Button,Image} from 'react-native';
import fehchData from '../Base/FetchData';
import REQUEST_URL from '../Base/BaseWeb';

export default class ParkWeatherPage extends Component{
    static navigationOptions = ({navigation})=>{
        return {
            header:null,
        }
    }
    constructor(props){
        super(props);
        this.state = {
            dailyModel:null,
            weeklyModel:null,
        }
    }
    componentDidMount = ()=>{
        let parkId = this.props.navigation.getParam('parkId','');
        let parkName = this.props.navigation.getParam('parkName','----');
        this.setState({
            parkName:parkName,
        })
        let url = new REQUEST_URL();
        this._fetchDailyWeather(parkId,url.PARK_WEATHER_REPORT_DATA);
        this._fetchWeeklyWeather(parkId,url.PARK_WEATHER_15_REPORT_DATA);
        
    }
    _fetchDailyWeather = (parkId,url)=>{
        let params = {farmId:parkId};
        fehchData(url,params,(respondes,error)=>{
            if (error !== null){
                alert(error.message);
            }else{
                this.setState({
                    dailyModel:respondes,
                })
            }
        })
    }
    _fetchWeeklyWeather = (parkId,url)=>{
        let params = {farmId:parkId};
        fehchData(url,params,(respondes,error)=>{
            if (error !== null){
                alert(error.message);
            }else{
                this.setState({
                    weeklyModel:respondes,
                })
            }
        })
    }
    render(){
        let items = this._setDailyItems(this.state.dailyModel);
        let weekItems = this._setWeekItems(this.state.weeklyModel);
        let date = new Date();
        let num = date.getHours();
        let week = this._getWeekday(date);
        var tempStr = "--";
        var weatherStr = '-- --°~--° -- -级';
        var localStr = week + "  " +this.state.parkName;
        if (this.state.dailyModel !== null){
            let tempGap = this._getTempGap(this.state.dailyModel.TwentyFour.data.hourly);
            let model = this.state.dailyModel.OneDay.data.condition;
            tempStr = `${model.temp}`;
            weatherStr = model.condition + ' ' + tempGap + model.windDir + ' ' + Math.floor(model.windSpeed) + '级';
        }
        
       
        let img = ((num > 6)||(num < 18))? require('../../img/Park_weather_day.png') : require('../../img/Park_weather_night.png');
        return(
            <ImageBackground style={{width:'100%',height:'100%'}} source={img}>
            <StatusBar barStyle ={((num > 6)||(num < 18))? 'default' : 'light-content'}></StatusBar>
                <SafeAreaView>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:"center",width:'100%',height:44}}>
                <Button title='back' color='#fff' onPress={()=> this.props.navigation.goBack()} style={{marginLeft:21}}></Button>
                <Text style={{fontSize:16,color:'#fff',marginLeft:90}}>未来15日天气</Text>
                </View>
                <View style={{width:'100%',alignItems:'center',marginTop:30}}><Text style={{fontSize:45,color:'#fff'}}>{tempStr}°</Text></View>
                <View style={{width:'100%',alignItems:'center',marginTop:15}}><Text style={{color:'#fff'}}>{weatherStr}</Text></View>
                <View style={{width:'100%',alignItems:'center',marginTop:15}}><Text style={{color:'#fff'}}>{localStr}</Text></View> 
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
    _getWeekday = (date) =>{
        let day = date.getDay();
        var weekday = new Array(7);
        weekday = ['周日','周一','周二','周三','周四','周五','周六'];
        return weekday[day];
    }
    _getTempGap = (list)=>{
        var max = new Number(list[0].temp);
        var min = max;
        for (i=1; i< list.length;i++){
            let tempModel = list[i];
            let num = new Number(tempModel.temp);
            if (num < min){
                min = num;
            }else if (num > max){
                max = num
            }
        }

        return `  ${min}°~${max}°  `
    }
    _setDailyItems = (model)=>{
        var items = [];
        if (model === null){
            return items
        }
        let list = model.TwentyFour.data.hourly;
        let length = list.length;
        for (i=0;i<length;i++){
            let temp = list[i];
            let timeStr = `${temp.hour}`;
            let img = temp.iconDay != null ? {uri:temp.iconDay}: require('../../img/weather_default.png');
            let tempStr = temp.temp != null ? temp.temp : '--';
            let item = <View style={{justifyContent:'flex-start',alignItems:'center',marginLeft:20}} key={`daily${i}`}>
            <Text style={{color:'#fff',marginTop:10}}>{timeStr}</Text>
            <Image source={img} style={{width:18.5,height:19,marginTop:10}}></Image>
            <Text style={{color:'#fff',marginTop:10}}>{tempStr}°</Text>
            </View>
            items.push(item);
        }

        return items;
    }
    _setWeekItems = (model)=>{
        var items = [];
         if (model === null){
            return items
        }
        let list = model.data.forecast;
        let length = list.length;

        for(i=0;i<length;i++){
            let temp = list[i];
            let date = new Date(temp.predictDate);
            let weekStr = this._getWeekday(date);
            let dateLength = temp.predictDate.length;
            let dateStr = temp.predictDate.slice(length-5,length);
            let img = {uri:temp.conditionIdDay};
            let item = <View style={{justifyContent:'flex-start',alignItems:'center',marginLeft:10,borderRightColor:'#fff',borderRightWidth:0.5}} key={`week${i}`}>
            <Text style={{color:'#fff'}}>{weekStr}</Text>
            <Text style={{color:'#fff',fontSize:12,marginTop:10}}>{dateStr}</Text>
            <Text style={{color:'#fff',marginTop:10}}>{temp.conditionDay}</Text>
            <Image source={img} style={{width:18.5,height:19,marginTop:28}}></Image>
            <Text style={{color:'#fff',marginTop:28}}>{temp.tempNight}°~{temp.tempDay}°</Text>
            <Text style={{color:'#fff',marginTop:10}}>{temp.windDirDay}</Text>
            <Text style={{color:'#fff',marginTop:10}}>{Math.floor(temp.windSpeedDay)}级</Text>
            </View> 
            items.push(item);
        }
        return items;
    }
}