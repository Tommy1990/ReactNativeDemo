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
             <View style={{width:'100%',justifyContent:'space-evenly',alignItems:'center',marginTop:17,flexDirection:'row'}}>
                <TouchableOpacity hitSlop={{top:20,left:20,bottom:20,right:20}}
                style = {{marginLeft:20}}
                >
                <Text>保存位置</Text>
                </TouchableOpacity>
                <TouchableOpacity hitSlop={{top:20,left:20,bottom:20,right:20}}
                style = {{marginLeft:20}}
                >
                <Text>复位</Text>
                </TouchableOpacity>
            </View>
            <View style={{width:'100%',justifyContent:'center',alignItems:'center',marginTop:17}}>
                <TouchableOpacity hitSlop={{top:20,left:20,bottom:20,right:20}}
                onPressIn={()=> this._videStartMove(0)}>
                onPressOut = {() => this._videStartMove(0)}>
                <Text>上</Text>
                </TouchableOpacity>
            </View>
            <View style={{width:'100%',flexDirection:'row',justifyContent:'center',alignItems:"center",marginTop:17}}>
                <TouchableOpacity 
                 onPressIn={()=> this._videStartMove(8)}>
                onPressOut = {() => this._videStartMove(8)}
                hitSlop={{top:20,left:20,bottom:20,right:20}} style={{marginRight:20}}>
                    <Text>➕</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                 onPressIn={()=> this._videStartMove(2)}>
                onPressOut = {() => this._videStartMove(2)}
                hitSlop={{top:20,left:20,bottom:20,right:20}} style={{marginRight:20}}>
                    <Text>左</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                 onPressIn={()=> this._videStartMove(3)}>
                onPressOut = {() => this._videStartMove(3)}
                hitSlop={{top:20,left:20,bottom:20,right:20}} style={{marginLeft:20}}>
                    <Text>右</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                 onPressIn={()=> this._videStartMove(9)}>
                onPressOut = {() => this._videStartMove(9)}
                hitSlop={{top:20,left:20,bottom:20,right:20}} style={{marginLeft:20}}>
                    <Text>➖</Text>
                </TouchableOpacity>
            </View>
            <View style={{width:'100%',justifyContent:'center',alignItems:'center',marginTop:17}}>
                <TouchableOpacity
                 onPressIn={()=> this._videStartMove(1)}>
                onPressOut = {() => this._videStartMove(1)}
                 hitSlop={{top:20,left:20,bottom:20,right:20}}>
                <Text>下</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>)
    }
}