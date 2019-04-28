import React,{Component} from 'react';
import {SafeAreaView,View,ScrollView,Slider,TouchableOpacity,Text,Image,DeviceEventEmitter,Animated} from 'react-native';
import REQUEST_URL from '../../Base/BaseWeb';
import fehchData from '../../Base/FetchData';
import UserModel from '../../Base/UserModel';
import ProjecttitleView from './View/ProjecttitleView';
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
               console.log(`1111111111${JSON.stringify(respond)}`)
                this.setState({
                    projectModel:respond,
                })

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
        let model = this.state.projectModel;
        let creatId = model.nf_createUserId.id;
        if ((creatId == this.state.userid)&&(model.nf_proStatus == '1')){
            DeviceEventEmitter.emit('showEdit',true)
        }else{
            DeviceEventEmitter.emit('showEdit',false) 
        }
        return(
            <SafeAreaView>
                <ScrollView style={{width:'100%',backgroundColor:'#eee'}}>
                    <ProjecttitleView model ={this.props.projectModel}/>
                </ScrollView>
                
            </SafeAreaView>
        )
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