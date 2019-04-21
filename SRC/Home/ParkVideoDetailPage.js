import React,{Component} from 'react';
import {SafeAreaView,View,Button,Text,TouchableOpacity,Image} from 'react-native'
import Video from 'react-native-video';
import commenStyles from '../Base/CommenStyle';
import REQUEST_URL from '../Base/BaseWeb';
import fehchData from '../Base/FetchData';
export default class ParkVideoDetailPage extends Component{
    static navigationOptions = ({navigation})=>{
       let model = navigation.getParam('model','');
        return {
            title: model.nf_name,
            
        }
    }
    constructor(props){
        super(props);
        this.state = {
            videoModel:null,
            token:null,

        }
    }
    componentDidMount(){
        this._fetchVideoDetail();
        this._fetchAccessToken();
    }
    
    _fetchVideoDetail = ()=>{
        let url = new REQUEST_URL();
        let model = this.props.navigation.getParam('model','');
        fehchData(url.PARK_VIDEO_DETAIL_INFO,{id:model.id},(respond,error)=>{
            if (error !== null){
                alert(error.message);
            }else{
                this.setState({
                    videoModel:respond,
                })
                console.log(`1234567890==== ${JSON.stringify(respond)}`);
            }
        })
    }
    _fetchAccessToken = ()=>{
        let url = new REQUEST_URL();
        fehchData(url.PARK_VIDEO_EZ_TOKEN,{},(respond,error)=>{
            if (error !== null){
                alert(error.message);
            }else{
                this.setState({
                    token:respond,
                })
            }
        })
    }
    _videStartMove = (direction) =>{
        let url = new REQUEST_URL();
        if ((this.props.videoModel.nf_device_serial != null) && (this.props.token != null)){
            return
        }
        let para = {accessToken:this.props.token,
            deviceSerial:this.props.videoModel.nf_device_serial ,
            channelNo:1,
            direction:direction,
            speed:1
        }
        fehchData(url.PARK_VIDEO_EZ_CONTROL_START,para,(respond,error)=>{
            if (error !== null){
                alert(error.message);
                this._videoStopAll();
            }
        })
    }
    _videoStopMove = (direction) =>{
        let url = new REQUEST_URL();
        if ((this.props.videoModel.nf_device_serial != null) && (this.props.token != null)){
            return
        }
        let para = {accessToken:this.props.token,
            deviceSerial:this.props.videoModel.nf_device_serial ,
            channelNo:1,
            direction:direction
        }
        fehchData(url.PARK_VIDEO_EZ_CONTROL_STOP,para,(respond,error)=>{
            if (error !== null){
                alert(error.message);
            }
        })
    }
    _videoStopAll = async() => {
        for ( i = 0; i < 12; i++){
            await this._videoStopMove(i);
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