import React,{Component} from 'react';
import {ScrollView,View,Text,Dimensions} from 'react-native';
export default class ProjectDetailView extends Component{
    
    render(){
        let {width} = Dimensions.get('window')
        return(
            <ScrollView style={{width:width,height:this.props.height,backgroundColor:'#00a056'}}
            bounces={true}>
            
            </ScrollView>
        )
    }
}
class PlantView extends Component{

    render(){
        return(
            <View style={{margin:13.5,backgroundColor:'#fff'}}>
            <Text style={{marginLeft:17.5,marginTop:10,borderBottomColor:'#eee',borderBottomWidth:0.5,paddingBottom:10}}>工作类型: </Text>
            <View style={{flexDirection:'row',marginLeft:17.5,marginTop:13,marginRight:17.5,alignItems:'flex-start',
                paddingBottom:10,borderBottomColor:'#eee',borderBottomWidth:0.5}}>
            <Text>工作地块:</Text>
            <Text>济南园区\n 123456</Text>
            </View>
            <View style={{flexDirection:'row',marginLeft:17.5,marginTop:13,marginRight:17.5,alignItems:'flex-start',
                paddingBottom:10,borderBottomColor:'#eee',borderBottomWidth:0.5}}>
            <Text>物料类型</Text>
            <Text>济南园区\n 123456</Text>
            </View>
            </View>
        )
    }
}