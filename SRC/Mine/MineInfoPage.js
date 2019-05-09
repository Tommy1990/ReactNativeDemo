import React,{Component} from 'react';
import {SafeAreaView,View,Image,ImageBackground,TouchableOpacity,StatusBar,Text,Dimensions,Platform} from 'react-native';
import UserModel from "../Base/UserModel";
import ImagePicker from 'react-native-image-crop-picker';
import REQUEST_URL from '../Base/BaseWeb';
import fehchData from '../Base/FetchData';
import UploadFile from '../Base/UpLoadFile';

const options = {
    permissionDenied:{
        title:'打开相机',
        text:'请允许使用相机',
        reTryTitle:'再次尝试',
        okTitle:'确定'
    },
    storageOptions:{
        skipBackup:true,
        path:'images'
    },
    noData:false,
    

}
export default class MineInfoPage extends Component{
    static navigationOptions = {
       header:null
    }
    constructor(props){
        super(props);
        this.state={
            company:null,
            user:null,
            uri:''
        }
    }
    componentDidMount(){
        this._setData();
        
    }
    
    _setData = async()=>{
        let model = new UserModel();
        let defaultComapny = await model.getDefaultCompany();
        let userModel = await model.getUserModel();
        this.setState({
            company:defaultComapny,
            user:userModel,
        })
    }

    _setIconBtnPress = ()=>{
       ImagePicker.openPicker({
           multiple:false
       }).then(image=>{
           this._postImg(image.path);
           console.log(`111111111111111111${JSON.stringify(image)}`)
       })
    }
    _postImg = (uri)=>{
        UploadFile([uri],'image/jpeg','jpeg',(respond,err)=>{
            if(err !== null){
                alert(err.message)
            }else{
                alert(JSON.stringify(respond))
                this._resetImg(respond.data[0].ossInfo.ossUrl)
            }
        })
    }
    _resetImg = async(headerStr)=>{
        let url = new REQUEST_URL();
        let para = {head_photo:headerStr}
        fehchData(url.MINE_INFO_RESET_ICON,para,(respond,err)=>{
            if (err !== null){
                alert(err.message)
            }else{
               this._dealData(headerStr);
            }
        })
    }
    _dealData = async(headerStr)=>{
        console.log(`444444${headerStr}`)
        let model = new UserModel();
        let userModel = await model.getUserModel(); 
        userModel.userInfo.headPhoto =  headerStr
        await model.setUserModel(userModel);
         this._setData()
    }
    _backBtnPress = ()=>{
        this.props.navigation.goBack();
    }
    render(){
        let OS = Platform.OS;
        let {width} = Dimensions.get('window');
        let titleWidth = width - 62
        let imgMarginLeft = (width - 126)/2
        let gap = 20 + 23.5
        let img = require('../../img/mine_header_placeholder.png')
        if (OS === 'ios' && width > 811){
            gap = 44 + 23.5;
        }
        let userStr = ''
        let companyName = ''
        let branchStr = ''
        let positionStr = ''
        let phoneStr = ''
        if (this.state.user !== null){
            if (this.state.user.userInfo.headPhoto.length > 6){
                img = {uri: this.state.user.userInfo.headPhoto}
            }
            phoneStr = this.state.user.userInfo.mobile;
            userStr = this.state.user.userInfo.userName;
            companyName = this.state.company.companyName;
            let list = this.state.company.branch;
            for (i=0;i<list.length;i++){
                branchStr += list[i].nf_branchName + ','
            }
            branchStr = branchStr.slice(0,branchStr.length-1);
            positionStr = this.state.company.position;
        }
        if (this.state.uri.length > 6){
            img = {uri:this.state.uri}
        }
        return(
            <View style={{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'flex-start'}}>
               <StatusBar barStyle='light-content'>
                </StatusBar> 
                <View style={{width:'100%',height:217.5,position:'relative'}}>
                <ImageBackground source={require('../../img/bg.png')}
                style={{flex:1,height:162.5}} resizeMode='contain'>
                    <View style={{width:'100%',height:20,flexDirection:'row',marginTop:gap}}>
                     <TouchableOpacity 
                     onPress ={()=> this._backBtnPress()}
                     style={{marginLeft:21}} hitSlop={{left:20,right:20,top:20,bottom:20}}>
                        <Image source={require('../../img/back_white.png')} style={{width:10,height:17}} resizeMode='contain'/>
                    </TouchableOpacity>
                    <View style={{width:titleWidth,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'#fff',fontSize:17}}>个人信息</Text>
                    </View>
                    </View>
                </ImageBackground>
                <View style={{position:'absolute',top:91.5,left:imgMarginLeft,width:126,height:126,overflow:'hidden',
                borderRadius:63,backgroundColor:'#fff'}}>
                    <TouchableOpacity 
                    onPress = {()=> this._setIconBtnPress()}
                    style={{flex:1,position:'relative',borderRadius:63}}>
                        <ImageBackground source={img} style={{flex:1,alignItems:'center',justifyContent:'flex-end',borderRadius:63}} resizeMode='contain'>
                        <View style={{backgroundColor:'#33333333',width:126,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'#fff',padding:5}}>编辑</Text>
                        </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                </View>
                <View style={{width:'100%',height:20,marginTop:10,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:18}}>{userStr}</Text>
                </View>
                <View style={{width:width-25,marginTop:30,marginBottom:30,
                borderRadius:10,borderWidth:1,borderColor:'#eee',justifyContent:'flex-start',alignItems:"center"}}>
                <View style={{width:'90%',borderBottomColor:'#eee',marginTop:6.5,
                borderBottomWidth:1,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{padding:10}}>姓名</Text>
                <Text style={{padding:10}}>{userStr}</Text>
                </View>
                <View style={{width:'90%',borderBottomColor:'#eee',marginTop:6.5,
                borderBottomWidth:1,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{padding:10}}>当前公司</Text>
                <Text style={{padding:10}}>{companyName}</Text>
                </View>
                <View style={{width:'90%',borderBottomColor:'#eee',marginTop:6.5,
                borderBottomWidth:1,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{padding:10}}>所属部门</Text>
                <Text style={{padding:10,width:200,textAlign:'right'}} numberOfLines={0} >{branchStr}</Text>
                </View>
                <View style={{width:'90%',borderBottomColor:'#eee',marginTop:6.5,
                borderBottomWidth:1,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{padding:10}}>职位</Text>
                <Text style={{padding:10}}>{positionStr}</Text>
                </View>
                <View style={{width:'90%',borderBottomColor:'#eee',marginTop:6.5,
                borderBottomWidth:1,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{padding:10}}>联系电话</Text>
                <Text style={{padding:10}}>{phoneStr}</Text>
                </View>
                </View>
                 
            </View>
        )
    }
}