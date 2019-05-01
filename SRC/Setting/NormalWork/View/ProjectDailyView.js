import React,{Component} from 'react';
import {FlatList,View,Text,Image,Dimensions} from 'react-native';
import DateModel from '../../../Base/DateModel';

export default class ProjectDailyView extends Component{
    render(){
        const {width} = Dimensions.get('window')
        if (this.props.list === null){
            return <View style={{width:width,height:this.props.height}}>

            </View>
        }
        return(<FlatList style={{width:width,height:this.props.height}}
        data={this.props.list}
        renderItem = {({item})=> <DailyCell model={item}/>}
        onScrollEndDrag = {(event)=> this._scrolling(event)}
        keyExtractor={(item, index) => index}
        ></FlatList>)
    }
    _scrolling = (event)=>{
        let gapY = event.nativeEvent.contentOffset.y;
        
        this.props.scrollFunc(gapY);
    }
}
class DailyCell extends Component{
    render(){
        let time = new DateModel()
        let model = this.props.model;
        let nameStr = model.nf_name;
        let timeStr = time.getYMDHms(model.nf_createTime)
        let materialList = model.nf_materielId
        let materialStr = ''
        for(i=0;i<materialList.length;i++){
            materialStr += materialList[i].nf_materielName + '-' + materialList[i].nf_manufactorName + ' ' + materialList[i].number + ' ' + materialList[i].nf_meteringName + '\n'
        }
        materialStr = materialStr.slice(0,materialStr.length-1)
        let workerStr = model.nf_workHouse
        let farmStr = ''
        let farmlist = model.nf_plotId
        for (i=0;i<farmlist.length;i++){
            let plotStr = farmlist[i].nf_plotName + '(';
            for (j=0;j<farmlist[i].seedlingInfo.length;j++){
                plotStr += farmlist[i].seedlingInfo[j].nf_seedlingName + ','
            }
            farmStr += plotStr.slice(0,plotStr.length -1) + ')' + ','
        }
        farmStr = farmStr.slice(0,farmStr.length-1);
        let machineStr = model.nf_mechanicalHouse
        let workContent = model.nf_workContent
        return(<View style={{margin:13.5,borderRadius:5,backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginLeft:18,marginRight:18,marginTop:16}}>
                <Text>{nameStr}</Text>
                <Text>{timeStr}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',margin:18,borderBottomColor:'#eee',borderBottomWidth:1,paddingBottom:8}}>
            <Text>物料使用情况: </Text>
            <Text>{materialStr}</Text>
            </View>
            <View style={{borderBottomColor:'#eee',borderBottomWidth:1,margin:18}}>
            <Text>用工量: {workerStr} 小时</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',margin:18,borderBottomColor:'#eee',borderBottomWidth:1,paddingBottom:8}}>
            <Text>工作地块: </Text>
            <Text>{farmStr}</Text>
            </View>
            <View style={{borderBottomColor:'#eee',borderBottomWidth:1,margin:18,paddingBottom:8}}>
            <Text>机械台班: {machineStr} 小时</Text>
            </View>
            <View style={{borderBottomColor:'#eee',borderBottomWidth:1,margin:18,paddingBottom:8}}>
            <Text>工作照片: </Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',margin:18,borderBottomColor:'#eee',borderBottomWidth:1,paddingBottom:8}}>
            <Text>工作内容: </Text>
            <Text style={{width:250}}>{workContent}</Text>
            </View>
        </View>)
    }
}