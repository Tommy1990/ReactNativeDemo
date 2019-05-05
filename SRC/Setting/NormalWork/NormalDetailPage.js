import React,{Component} from 'react';
import {SafeAreaView,View,ScrollView,Slider,TouchableOpacity,Text,Image,DeviceEventEmitter,Animated,Dimensions,TextInput,
NativeModules} from 'react-native';
import REQUEST_URL from '../../Base/BaseWeb';
import fehchData from '../../Base/FetchData';
import UserModel from '../../Base/UserModel';
import ProjecttitleView from './View/ProjecttitleView';
import ProjectStatueView from './View/ProjectStatueView';
import ProjectDetailView from './View/ProjectDetailView';
import ProjectDailyView from './View/ProjectDailyView';
import ProjectMsgView from './View/ProjectMsgView';
const manager = NativeModules.Manager;
export default class NoramlDetailPage extends Component{
    static navigationOptions = ({navigation}) => {

        return {
            headerBackImage: <Image source={require('../../../img/back.png')} resizeMode='contain' style={{width:10,height:17,marginLeft:21}}/> ,
            headerTitle:<Text style={{color:'#333',fontSize:18}} >项目详情</Text>,
            headerRight:<HeaderRightView/>
        }
    }
    constructor(props){
        super(props);
        this.state = {
            projectId:'',
            projectModel:null,
            selectBtn:0,
            dailyCurrentPage:1,
            dailyTotal:1,
            dailyList:[],
            dailyNum:0,
            msgNum:0,
            msgTotal:1,
            msgCurrentPage:1,
            msgList:[],
        }
    }
    componentDidMount(){
        let projectId = this.props.navigation.getParam('projectId','')
        if (projectId.length > 0){
            this.setState({
                projectId:projectId
            })
        }
        this._fetchProjectdetail(projectId);
        this._fetchDailyData(projectId);
        this._fetchMSGData(projectId);
        this._setData();
    }
    _fetchProjectdetail = (projectId)=>{
       
        if (projectId === ''){
            alert('项目不存在')
            return
        }
        let url = new REQUEST_URL();
        let para = {projectId:projectId};
        fehchData(url.WORK_NORMAL_PROJECT_DETAIL,para,(respond,error)=>{
            if (error!== null){
                alert(error.message)
            }else{
               console.log(`${JSON.stringify(respond)}`)
                this.setState({
                    projectModel:respond,
                })

            }
        })
    }
    _fetchDailyData = (projectId)=>{
        let url = new REQUEST_URL()
        let para = {projectId:projectId,page:this.state.dailyNum,limit:10}
        fehchData(url.WORK_NORMAL_PROJECT_DAILY_DATA,para,(respond,error)=>{
            if(error !== null){
                alert(error.message)
            }else{
                if(respond.data !== null){
                    this.setState({
                        dailyList:respond.data
                    })
                }
                this.setState({
                    dailyCurrentPage:respond.current_page,
                    dailyTotal:respond.pageCount,
                    dailyNum:respond.count,
                })
            }
        })
    }
    _fetchMSGData = (projectId)=>{
        let url = new REQUEST_URL();
        let para = {projectId:projectId,page:this.state.msgCurrentPage,limit:10}
        fehchData(url.WORK_NORMAL_PROJECT_MSG_DATA,para,(respond,error)=>{
            if(error !== null){
                alert(error.message)
            }else{
                if(respond.data !== null){
                    this.setState({
                        msgList:respond.data
                    })
                }
                this.setState({
                    msgCurrentPage:respond.current_page,
                    msgTotal:respond.pageCount,
                    msgNum:respond.count,
                })
            }
        })
    }
    _postVoiceData = (voiceData,voiceSecond)=>{
        
    }
    _postMsg = (content,voiceStr,voiceSecond) =>{
        let url = new REQUEST_URL();
        let  para = {projectId:this.state.projectId,content:content,voice:voiceStr,second:voiceSecond}
        fehchData(url.WORK_NORMAL_PROJECT_MSG_POST,para,(respond,error)=>{
            if(error !== null){
                alert(error.message)
            }else{
                this.setState({
                    content:'',
                    voiceStr:'',
                    voiceSecond:0
                })
                DeviceEventEmitter.emit('submitMsgSuccess','')
            }
        })
        
    }
    _setData = async()=>{
        let model = new UserModel();
        let userid = await model.getUserID();
        this.setState({
            userid:userid,
        })
    }
    render(){
        if (this.state.projectModel === null){
            return <SafeAreaView/>
        }
        let {width,height} = Dimensions.get('window');
        let btnWidth = (width - 13.5*2)/3
        let scrollViewHeight = height - 44 - 24 - 63
        let model = this.state.projectModel;
        let creatId = model.nf_createUserId.id;
        if ((creatId == this.state.userid)&&(model.nf_proStatus == '1')){
            DeviceEventEmitter.emit('showEdit',true)
        }else{
            DeviceEventEmitter.emit('showEdit',false) 
        }
        return(
            <View>
                <ScrollView style={{width:'100%',backgroundColor:'#eee'}} ref={component=> this._scrollView=component}{...this.props}>
                    <ProjecttitleView model ={this.state.projectModel}/>
                    <ProjectStatueView model ={this.state.projectModel}/>
                    <View style={{flexDirection:'row',margin:13.5,height:44}}>
                    <TouchableOpacity 
                    hitSlop={{top:10,bottom:10,left:10,right:10}}
                    onPress={()=> this._btnClick(0)}
                    style={{width:btnWidth,justifyContent:'center',alignItems:'center',borderRightWidth:0.5,borderRightColor:'#333',height:14}}>
                    <Text style={{fontSize:15,color:this.state.selectBtn == 0 ? '#00a056' :'#333'}} >项目详情</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    hitSlop={{top:10,bottom:10,left:10,right:10}}
                    onPress={()=> this._btnClick(1)}
                    style={{width:btnWidth,flexDirection:'row',justifyContent:'center',alignItems:'center',borderRightWidth:0.5,borderRightColor:'#333',height:14}}>
                    <Text style={{fontSize:15,color:this.state.selectBtn == 1 ? '#00a056' :'#333'}} >日志</Text>
                    <Text style={{fontSize:12,color:this.state.selectBtn == 1 ? '#00a056' :'#333'}}>({this.state.dailyNum})</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    hitSlop={{top:10,bottom:10,left:10,right:10}}
                    onPress={()=> this._btnClick(2)}
                    style={{width:btnWidth,flexDirection:'row',justifyContent:'center',alignItems:'center',height:14}}>
                    <Text style={{fontSize:15,color:this.state.selectBtn == 2 ? '#00a056' :'#333'}} >留言板</Text>
                    <Text style={{fontSize:12,color:this.state.selectBtn == 2 ? '#00a056' :'#333'}}>({this.state.msgNum})</Text>
                    </TouchableOpacity>
                    </View>
                    <ScrollView 
                    style={{width:'100%'}} 
                    pagingEnabled={true}
                    onScroll={(event)=>{
                        this._onScroll(event);
                    }}
                    ref={(component)=> this._bottomScrollView = component}{...this.props}
                    horizontal={true}>
                        <ProjectDetailView 
                        scrollFunc = {this._verticalScroll}
                        height={scrollViewHeight} 
                        model ={this.state.projectModel}/>

                        <ProjectDailyView list={this.state.dailyList} 
                        scrollFunc = {this._verticalScroll}
                        height={scrollViewHeight}/>

                        <ProjectMsgView 
                        list={this.state.msgList}
                        scrollFunc = {this._verticalScroll}
                        height={scrollViewHeight}
                        />
                    </ScrollView>
                </ScrollView>
                <BottomMsgView style={{position:'absolute',bottom:0,leading:0,width:width,height:70}}
                submit={this._submitMsg} ></BottomMsgView>
                <View style = {{position:'absolute',right:11.5,bottom:226.5,
                         width:52,height:52,borderRadius:26,backgroundColor:'#00a056'}}>
                     <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center'}}
                     onPressIn= {()=> this._recoderPress()}
                     onPressOut={()=> this._recoderTouchupInside()}>
                    <Image source={require('../../../img/voice_btn.png')} style={{width:20,height:26}} resizeMode='contain'/>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
    _recoderPress = ()=>{
        
        manager.startRecode();
    }
    _recoderTouchupInside = ()=>{
        
        manager.endRecode((error,arr)=>{
            console.log(`0000000=== callback ${JSON.stringify(arr)}`)

        })
    }
    _btnClick = (type)=>{
        this.setState({
            selectBtn:type
        })
        let {width,height} = Dimensions.get('window');
        let gapX = type* width ;
        this._bottomScrollView.scrollTo({x:gapX,y:0,animated:true});
    }
    _onScroll = (event)=>{
        let {width,height} = Dimensions.get('window');
        let offsetX = event.nativeEvent.contentOffset.x;
        let index = Math.ceil(offsetX/width);
       
        DeviceEventEmitter.emit('showMsgView',index)
        this.setState({
            selectBtn:index,
        })
    }
   
    _verticalScroll = (offsetY)=>{
        let gapY = offsetY < 20  ?  0 : 100 + 220;
        this._scrollView.scrollTo({x:0,y:gapY,animated:true});
    }
    _submitMsg = (value) =>{
        this._postMsg(value,'',0);
    }
}

class HeaderRightView extends Component{
    constructor(props){
        super(props);
        this.state = {
            show:false
        }
    }
   componentDidMount(){
       this.listener = DeviceEventEmitter.addListener('showEdit',(e)=>{
           this.setState({
               show:e
           })
       })
   }
   componentWillUnmount(){
       this.listener.remove();
   }
   render(){
       let items = []
       if (this.state.show){
           let item = (<TouchableOpacity
            style ={{alignItems:'flex-end'}} 
            onPress = {()=> DeviceEventEmitter.emit('showEditionOption',null)}
            hitSlop={{top:20,right:20,left:20,bottom:20}}>
                <Text style={{color:'#333',fontSize:14}}>编辑</Text>
            </TouchableOpacity>)
            items.push(item)
       }else{
           items.pop();
       }
       return(
           <View style={{position:'relative',width:89,marginRight:21}}>
                {items}
                <HeaderRightAnimatedView style={{position:'absolute',left:0,top:24}}/>
           </View>
       )
   } 
}
class HeaderRightAnimatedView extends Component{
    
    constructor(props){
       super(props);
       this.state=({
        fadeAnimate: new Animated.Value(0)
       }) 
    }
    componentDidMount(){
        this.listener = DeviceEventEmitter.addListener('showEditionOption',(e)=>{
            this._animate();
        })
        this.listener = DeviceEventEmitter.addListener('dismissEditionOption',(e)=>{
            this._dismiss();
        })
    }
    componentWillUnmount(){
        this.listener.remove();
    }
    _animate = ()=>{
        Animated.timing(
            this.state.fadeAnimate,{
                toValue:76, 
                duration:1000,
            }
        ).start();
    }
    _dismiss = ()=>{
        Animated.timing(
            this.state.fadeAnimate,{
                toValue:0, 
                duration:1000,
            }
        ).start();
    }
    _resetClick = ()=>{
        this._dismiss()

    }
    _abusedClick = ()=>{
        this._dismiss()
    }
    render(){
        let {fadeAnimate} = this.state;
        let item = <View>
            <TouchableOpacity 
            onPress={()=> this._resetClick()}
            style={{width:'100%',height:38,borderBottomColor:'#aaa',borderBottomWidth:1,justifyContent:'center',alignItems:"center"}}>
                <Text>修改项目</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress = {()=> this._abusedClick()}
            style={{width:'100%',height:38,justifyContent:'center',alignItems:"center"}}>
                <Text>废弃项目</Text>
            </TouchableOpacity>
         </View>
        return (<Animated.ScrollView style={{...this.props.style,height:fadeAnimate,width:89,borderRadius:5,backgroundColor:'#eee'}}>
            {item}
            </Animated.ScrollView>)
    }
}
class BottomMsgView extends Component{
    constructor(props){
        super(props);
        this.state = {
            height: new Animated.Value(0),
            btnEnable:false,
            value:''
        }
    }
    componentDidMount(){
        this.listener = DeviceEventEmitter.addListener('showMsgView',(e)=>{
            if (e=== 2){
                this._showView()
            }else{
                this._hideView()
            }
        }) 
        this.listener = DeviceEventEmitter.addListener('submitMsgSuccess',()=>{
            this.setState({
                value:'',
                btnEnable:false
            })
            this._textInput.clear();
        })
    }
    componentWillUnmount(){
        this.listener.remove();
    }
    
    _showView = ()=>{
        Animated.timing(this.state.height,this.setState({
            height:70
        }),1000);
    }
    _hideView = ()=>{
        Animated.timing(this.state.height,this.setState({
            height:0
        }),1000);     
    }
    _valueChanged = (value)=>{
        if (value.length > 5){
            this.setState({
                btnEnable:true
            })
        }
        this.setState({
            value:value
        })
    }
    _submitClick = ()=>{
        this.props.submit(this.state.value);
    }
    render(){
        let {width } = Dimensions.get('window');
        let viewWidth = width - 17 - 83
        let disable = !this.state.btnEnable
        return(
            <Animated.ScrollView style={{...this.props.style,height:this.state.height}}>
                <View style={{width:'100%',height:70,justifyContent:'flex-start',alignItems:'center',flexDirection:'row',backgroundColor:'#fff'}}>
                    <TextInput style={{borderRadius:8,borderWidth:1,borderColor:'#eee',
                    height:32,marginLeft:17,width:viewWidth,paddingLeft:8}}
                        placeholder='请输入留言内容'
                        maxLength = {150}
                        onChangeText = {(text)=> this._valueChanged(text)}
                        ref={component => this._textInput = component}
                    />
                    <TouchableOpacity style={{marginLeft:12,borderRadius: 8,width:64,height:32,
                    backgroundColor: disable ? '#eee':'#00a056',alignItems:'center',justifyContent:'center'}}
                    onPress={()=> this._submitClick()}>
                            <Text>发送</Text>
                    </TouchableOpacity>
                </View>
            </Animated.ScrollView>
        )
    }
}