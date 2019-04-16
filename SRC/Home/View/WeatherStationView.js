import React,{Component} from 'react';
import {SafeAreaView,View,Text,TouchableOpacity,Image,ScrollView,StyleSheet,Dimensions} from 'react-native';
import commenStyle from '../../Base/CommenStyle';
export default class WeatherStationView extends Component{
    setNativeProps(nativeProps){
        this._view.setNativeProps(nativeProps);
        
    }
    
    _setData = ()=>{
        var list = [];
        for (i=0;i<10;i++){
            let model = {};
            model.img = `park_icon${i}`;
            model.des = '--'
            switch(i){
                case 0:
                model.id = 4;
                model.name = '光照';
                break;
                case 1:
                model.id = 10;
                model.name = '雨量';
                break;
                case 2:
                model.id = 1;
                model.name = '气温';
                break;
                case 3:
                model.name = '湿度';
                model.id = 2;
                break;
                case 4:
                model.id = 7;
                model.name = '土壤温度'
                break;
                case 5:
                model.id = 8;
                model.name = '土壤水分';
                break;
                case 6:
                model.id = 3;
                model.name = '二氧化碳'
                break;
                case 7:
                model.id = 9;
                model.name = '大气压力';
                break;
                case 8:
                model.id = 5;
                model.name = '风速';
                break;
                case 9:
                model.id = 6;
                model.name = '风向';
                break;
            }
           list.push(model);
        };
       let temp = this._dealList(list);
       return temp;
    }
    _dealList = (list)=>{
        if (this.props.model != null){
            if ('weatherInfo' in this.props.model) {
                var length = new Number();
                length = this.props.model.weatherInfo.length;
                for (var i = 0; i<length; i++){
                    let item = this.props.model.weatherInfo[i]
                    for (var j = 0; j<list.length; j++){
                        let child = list[j];
                        if (item.type == child.id){ 
                            child.des= `${item.val}${item.unit}`;
                            child.isWarn = item.isWarm != 0 ;
                            child.webUrl = item.webUrl;
                            break;
                        }
                    }
                }
            }
        }
        return list;
        
    }
    _jumpToDetail = (model)=>{

    }
    render(){
        let list = this._setData();
        let {width,height} = Dimensions.get('window');
        let imgWidth = width - 42;
        var img = require('../../../img/image_placeholder.png');
       
        if (this.props.model != null){
            if ('farmPic' in this.props.model){
                img = {uri:this.props.model.farmPic};
            }else{
                img = require('../../../img/image_placeholder.png');
            }
        }else{
            img = require('../../../img/image_placeholder.png');
        }
        return(<View style={commenStyle.parkBottomContainer} ref={component => this._view = component}{...this.props}>
            <ScrollView >
            <Image style={{width:imgWidth,height:200,marginLeft:21,borderRadius:5}} source={img}/>
            <View style={{alignItems:'center',justifyContent:'flex-start',flexDirection:'row',marginTop:17,marginBottom:17}}>
            <View style={{height:11.5,width:1,borderRadius:0.5,backgroundColor:'#00a056',marginLeft:21}}></View>
            <Text style={{color:'#333',fontSize:14,marginLeft:10}}>今日天气</Text>
            </View>
            <WeatherReportView weatherModel = {this.props.weatherModel}/>
            <View style={{alignItems:'center',justifyContent:'flex-start',flexDirection:'row',marginTop:17,marginBottom:17}}>
            <View style={{height:11.5,width:1,borderRadius:0.5,backgroundColor:'#00a056',marginLeft:21}}></View>
            <Text style={{color:'#333',fontSize:14,marginLeft:10}}>气象站数据</Text>
            </View>
            <CollectionView list = {list} style={styles.colContainer} />
            </ScrollView>
        </View>)
    }
}
class CollectionView extends Component{
    render(){
        let num = this.props.list.length;
        let cols = Math.ceil(num / 3);
        let last = num % 3;
        var items = [];
        for (i = 0;i < cols ; i ++){
            let children = this.props.list.slice(i*3,(i+1)*3);
            let item = <ColView list = {children} key = {i} index={i}></ColView>
            items.push(item);

        }
        return(
            <View >{items}</View>
        )
    }
}
class ColView extends Component{
    _onPress = (model)=>{
        
    }
    render(){
        let num = this.props.list.length;
        var items = [];
        let {width,height} = Dimensions.get('window');
        let gap = 11.5;
        let cellWidth = (width - 42 - gap * 2)/3
        for (i=0; i < num; i++){
            let model = this.props.list[i];
            let col = this.props.index;
            
            let item = <TouchableOpacity style={{width:cellWidth,height:109.5,marginLeft:gap,borderRadius:10,backgroundColor:'#fff',justifyContent:'flex-start',alignItems:'center'}}
                        onPress={()=> this._onPress(model)} key={col*3 + i}>
            <Image style={{width:27.5,height:27,resizeMode:'contain',marginTop:25,marginBottom:10}} source={{uri:model.img}} />
            <Text style={{color:'#9595',fontSize:12}}>{model.name}</Text>
            <Text style={{color:'#333',fontSize:15}}>{model.des}</Text>
            </TouchableOpacity>
            items.push(item);
           
        }
        return(
        <View style = {{flexDirection:'row', alignItems:'center',justifyContent:'flex-start',width:'100%',height:120,marginLeft:10}}>
        {items}
        </View>)
    }
}
class WeatherReportView extends Component{
    
    
    _jumpToDetail = ()=>{

    }
    _setData = (model)=>{
        
        var newModel = {};
        if (model != null){
            if ('TwentyFour' in model){
                let tempModel1 = model.TwentyFour;
                if ('data' in tempModel1){
                    let tempModel2 = tempModel1.data;
                    if ('hourly' in tempModel2){
                        let list = tempModel2.hourly;
                        newModel.list = list;
                        var min = new Number(list[0].temp);
                        var max = min;
                        
                        for (i = 0; i< list.length; i++){
                            let temp  = new Number(list[i].temp);
                            if (temp > max){
                                max = temp
                            }else if (temp < min){
                                min = temp
                            }
                        }
                        newModel.max = max;
                        newModel.min = min;
                    }
                }
            }
            
            if ('OneDay' in model){
                let tempmodel3 = model.OneDay;
                if ( tempmodel3.data != null){
                    let tempModel4 = tempmodel3.data;
                    if ( tempModel4.condition != null){
                        let condition = tempModel4.condition;
                         newModel.condition = condition.condition;
                         newModel.icon = condition.icon;
                         newModel.sunRise = condition.sunRise;
                         newModel.sunSet = condition.sunSet;
                         newModel.temp = condition.temp;
                    }
                }
            }
        }
        return newModel;
    }
    render(){
        
        let model = this._setData(this.props.weatherModel);
        var items = [];
        var img = require('../../../img/weather_default.png');
        var temp = '--';
        var condition = '----';
        var sunRiseStr = '--:--'
        var sunSetStr = '--:--'
        var tempGapStr = '--°~--°'
        if (model != null){
             img = ('icon' in model) ? {uri:model.icon} : require('../../../img/weather_default.png');
             temp = model.temp != null ? model.temp : '--';
             condition = model.condition != null ? model.condition : '----';
             sunRiseStr = model.sunRise != null ? model.sunRise.slice(model.sunRise.length-8,model.sunRise.length-3) : '--';
            sunSetStr = model.sunSet != null ? model.sunSet.slice(model.sunSet.length-8,model.sunSet.length-3) :'--' ;
            tempGapStr =  model.max != null ? `${model.min}°~${model.max}°` : '--°~--°';
            if ( model.list != null){
                for (var i = 0;i<model.list.length;i++){
                    let temp = model.list[i];
                    let tempImg = temp.iconDay != null ? {uri:temp.iconDay} : require('../../../img/weather_default.png') ;
                    let index = temp.updatetime.length;
                    let timeStr = temp.updatetime.slice(index-8,index-3);
                    let item = <View style={{justifyContent:'flex-start',alignItems:'center',marginLeft:40}} key={`weather${i}`}>
                    <Text style={{color:'#333',fontSize:14,fontWeight:'bold'}}>{temp.temp}°</Text>
                    <Image source = {tempImg} style={{width:15,height:15}}/>
                    <Text style={{color:'#333',fontSize:12}}>{timeStr}</Text>
                    </View>
                    items.push(item);
                }
            }
        }
        return(<View style={{marginLeft:20,backgroundColor:'#efefef',marginRight:20,borderRadius:10}} ref={component=> this._view = component}{...this.props} >
            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <Image source={img} style={{width:38,height:38,marginLeft:35,marginTop:22}}/>
            <View style={{marginLeft:43}}><Text style={{color:'#333',fontSize:24}}>{temp}°</Text>
            <Text style={{color:'#333',fontSize:12}}>{condition}</Text></View>
            <View style={{marginLeft:35}}><View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
            <Image source={require('../../../img/park_sunraise.png')} style={{width:11.5,height:10}}/>
            <Text style={{color:'#333',fontSize:12}}>{sunRiseStr}</Text>
            <Image source={require('../../../img/park_sunsit.png')} style={{width:11.5,height:10,marginLeft:10}}/>
            <Text style={{color:'#333',fontSize:12}}>{sunSetStr}</Text>
            </View>
            <Text style={{color:'#333',fontSize:12}}>温差: {tempGapStr}</Text>
            </View>
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:40,height:30,marginLeft:10}}
             onPress={()=> this._jumpToDetail()}>
            <Text>more</Text>
            </TouchableOpacity>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop:30,marginBottom:20,marginRight:10}}>{items}</ScrollView>
        </View>)
    }
}



const styles = StyleSheet.create({
    normalCell:{
        borderRadius:20,
        height:40,
        marginLeft:20,
        justifyContent:'center',
    },
    cellTitle:{
        color:'#333',
        fontSize:16,
        padding:10,
    },
    colContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        marginTop:17,
        marginLeft:17,
        marginRight:17,
        
    }
});
