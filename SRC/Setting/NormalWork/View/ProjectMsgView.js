import React,{Component} from 'react';
import {View,Dimensions,Text,FlatList,TouchableOpacity,Image} from 'react-native'
import DateModel from '../../../Base/DateModel';
export default class ProjectMsgView extends Component{
    render(){
        const {width} = Dimensions.get('window')
        if (this.props.list === null){
            return <View style={{width:width,height:this.props.height}}>
            </View>
        }
        return(
             <FlatList
                style={{width:width,height:this.props.height}}
                data={this.props.list}
                renderItem = {({item})=> <ItemView model={item}/>}
                onScrollEndDrag = {(event)=> this._scrolling(event)}
                keyExtractor={(item, index) => index}
            > 
            </FlatList>
           
        )
    }
    _scrolling = (event)=>{
        let gapY = event.nativeEvent.contentOffset.y;
        this.props.scrollFunc(gapY);
    }
}
class ItemView extends Component{
    render(){
        let model = this.props.model
        let {width} = Dimensions.get('window');
        let voiceWidth = width - 71 - 84
        let strWidth = width -71 - 44
        if (model === null){
            return <View/>
        }
        let item = <View/>
        if (model.nf_content.length === 0){
            let actualWidth = (model.nf_second / 60) * voiceWidth  + 30
            actualWidth = actualWidth < 60 ? 60 : actualWidth
            item = (<View style={{width:actualWidth,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                 <TouchableOpacity style={{width:(actualWidth-30),height:28,
                   backgroundColor:'#00a056',justifyContent:'center',alignItems:'flex-start',borderRadius:8}}>
                    <Image source={require('../../../../img/voice_btn.png')} style={{width:9,height:11,marginRight:8}}/>
                 </TouchableOpacity>
                 <Text style={{marginLeft:11}}>{model.nf_second}s</Text>
            </View>)
        }else{
            item = (<View style={{width:strWidth,borderRadius:8,backgroundColor:'#00a056',marginTop:13}}>
                    <Text style={{padding:12,color:'#fff'}}>{model.nf_content}</Text>
            </View>)
        }
        let timeStr = (new DateModel()).getYMDHms(model.nf_addtime);
        return(
            <View style={{margin:13.5,backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                <View style={{margin:15,justifyContent:'flex-start',alignItems:'center'}}>
                    <Image source={{uri:model.nf_headPhoto}} 
                    style={{width:29,height:29,borderRadius:14.5,borderWidth:1,borderColor:'#eee'}} 
                    resizeMode='contain'></Image>
                    <Text style={{marginTop:8}}>{model.nf_name}</Text>
                </View>
                {item}
            </View>
            <View style={{alignItems:'flex-end',paddingBottom:12,marginTop:10}}>
                <Text>{timeStr}</Text>
            </View>
            </View>
        )
    }
}