import React,{Component} from 'react';
import {ScrollView,View,Text,Dimensions} from 'react-native';
import DateModel from '../../../Base/DateModel';
export default class ProjectDetailView extends Component{
    
    render(){
        let {width} = Dimensions.get('window')
        return(
            <ScrollView 
            
            onScrollEndDrag = {(event)=> this._scrolling(event)}
            style={{width:width,height:this.props.height}}
            bounces={true}>
            <PlantView model={this.props.model}/>
            <UserInfoView model={this.props.model}/>
            <TimeInfoView model={this.props.model}/>
            </ScrollView>
        )
    }

    _scrolling = (event)=>{
        let gapY = event.nativeEvent.contentOffset.y;
        
        this.props.scrollFunc(gapY);
    }
}
class PlantView extends Component{

    render(){
        let model = this.props.model
        if (model === null){
            return <View></View>
        }
        let workTypeStr = model.nf_workTypeId.nf_workTypeName
        let parkStr = model.nf_parkId.nf_farmName + '\n'
        let farmList = model.nf_parkId.massifList
        for (i = 0;i< farmList.length;i++){
            parkStr += farmList[i].nf_plotName + ','
        }
        parkStr = parkStr.slice(0,parkStr.length-1);
        let materialStr = ''
        let materialList = model.nf_materielId
        for(i=0;i<materialList.length;i++){
            materialStr += materialList[i].nf_manufactorName + '-'+ materialList[i].nf_materielName + '\n'
        }
        materialStr = materialStr.slice(0,materialStr.length - 1);
        return(
            <View style={{margin:13.5,backgroundColor:'#fff',borderRadius:5}}>
            <Text style={{marginLeft:17.5,marginTop:10,borderBottomColor:'#eee',borderBottomWidth:0.5,paddingBottom:10}}>工作类型: {workTypeStr}</Text>
            <View style={{flexDirection:'row',marginLeft:17.5,marginTop:13,marginRight:17.5,alignItems:'flex-start',
                paddingBottom:10,borderBottomColor:'#eee',borderBottomWidth:0.5}}>
            <Text>工作地块: </Text>
            <Text>{parkStr}</Text>
            </View>
            <View style={{flexDirection:'row',marginLeft:17.5,marginTop:13,marginRight:17.5,alignItems:'flex-start',
                paddingBottom:10,borderBottomColor:'#eee',borderBottomWidth:0.5}}>
            <Text>物料类型: </Text>
            <Text>{materialStr}</Text>
            </View>
            </View>
        )
    }
}
class UserInfoView extends Component{
    render(){
        let model = this.props.model
        if (model === null){
            return <View></View>
        } 
        let creatStr = model.nf_createUserId.nf_name;
        let partcipteStr = ''
        let partciptList = model.nf_joinUserId
        for (i=0;i<partciptList.length;i++){
            partcipteStr += partciptList[i].nf_name + ','
        }
        partcipteStr = partcipteStr.slice(0,partcipteStr.length-1);
        let ccStr = ''
        let ccList = model.nf_sendUserId
        for(i=0;i<ccList.length;i++){
            ccStr += ccList[i].nf_name + ','
        }
        ccStr = ccStr.slice(0,ccStr.length-1)
        let auditStr = model.nf_auditUserId[0].nf_name
        return(<View style={{margin:13.5,backgroundColor:'#fff',borderRadius:5}}>
            <Text 
            style={{marginLeft:18,marginTop:13.5,paddingBottom:9.5,marginRight:18,borderBottomColor:'#eee',borderBottomWidth:1}}>
            创建人: {creatStr}
            </Text>
            <Text 
            numberOfLines = {99}
            ellipsizeMode='tail'
            style={{marginLeft:18,marginTop:13.5,paddingBottom:9.5,marginRight:18,borderBottomColor:'#eee',borderBottomWidth:1}}>
            参与人: {partcipteStr}
            </Text>
            <Text 
            style={{marginLeft:18,marginTop:13.5,paddingBottom:9.5,marginRight:18,borderBottomColor:'#eee',borderBottomWidth:1}}>
            审批人: {ccStr}
            </Text>
            <Text 
            numberOfLines = {99}
            ellipsizeMode='tail'
            style={{marginLeft:18,marginTop:13.5,marginBottom:16.5,marginRight:18}}>
            抄送人: {auditStr}
            </Text>

        </View>)
    }
}

class TimeInfoView extends Component{
    render(){
        let model = this.props.model
        if (model === null){
            return <View/>
        }
        let time = new DateModel()
        let startTime = time.getYMDHms(model.nf_beginTime)
        let endTime = time.getYMDHms(model.nf_endTime)
        let creatTime = time.getYMDHms(model.nf_createTime)
        return(
            <View style={{margin:13.5,backgroundColor:'#fff',borderRadius:5}}>
                <View style={{marginLeft:18,marginRight:18,marginTop:13,borderBottomColor:'#eee',borderBottomWidth:1}}>
                <Text style={{paddingBottom:8}}>开始时间: {startTime}</Text>
                </View>
                <View style={{marginLeft:18,marginRight:18,marginTop:13,borderBottomColor:'#eee',borderBottomWidth:1}}>
                <Text style={{paddingBottom:8}}>结束时间: {endTime}</Text>
                </View>
                <View style={{marginLeft:18,marginRight:18,marginTop:13,borderBottomColor:'#eee',borderBottomWidth:1}}>
                <Text style={{paddingBottom:8}}>创建时间: {creatTime}</Text>
                </View>
            </View>
        )
    }
}