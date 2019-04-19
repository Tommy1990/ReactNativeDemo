import React,{Component} from 'react';
import {SafeAreaView,View,Button,Text,TouchableOpacity,Image} from 'react-native'
import Video from 'react-native-video';
import commenStyles from '../Base/CommenStyle';
export default class ParkVideoDetailPage extends Component{
    static navigationOptions = ({navigation})=>{
       let model = navigation.getParam('model','');
        
        return {
            title: model.nf_name,
            
        }
    }
    render(){
        let model = this.props.navigation.getParam('model',null);
        var videoSource = {uri:''};
        if (model != null){
             let url = model.nf_liveAddress.replace('rtmp://rtmp','http://hls') + '.m3u8';
            
            videoSource = {uri:url};
            
        }
        return (<SafeAreaView style={commenStyles.containerNormal}>
            <Video source={videoSource} style={{width:'100%',height:300}}></Video>
        </SafeAreaView>)
    }
}