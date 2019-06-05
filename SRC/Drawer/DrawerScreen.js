import  React,{Component} from 'react';
import {View,TouchableOpacity,Text,ScrollView,Dimensions,ImageBackground,Image,DeviceEventEmitter} from 'react-native';
import commenStyles from '../Base/CommenStyle'
import UserModel from '../Base/UserModel';

export default class DrawerScreen extends Component{
   _logOut = async()=>{
    let model = new UserModel();
    await model.cleanLoginData();
    this.props.tempNav.navigate('Loading')
   }
   constructor(props){
       super(props);
       this.state={
           userModel:null,
           company:null,
       }
   }
   componentDidMount(){
    this._setData();
    // 退出监听
    this.linster = DeviceEventEmitter.addListener('LOGOUT',(e)=>{
        this._logOut();
    })
    this.linster = DeviceEventEmitter.addListener('showLoading',(e)=>{
        this.props.tempNav.navigate('LoadingModal')
    })
   }
   componentWillUnmount(){
    this.linster.remove();
   }
   _setData = async()=>{
       let model = new UserModel();
       let usermodel = await model.getUserModel();
       let defaultCompany = await model.getDefaultCompany();
       this.setState({
           userModel:usermodel,
           company:defaultCompany,
       });
   }
   _pressBtn = (index)=>{
        let navStr = ''
        switch (index){
            case 1:
            navStr='MineInfo';
            break;
            case 2:
            navStr ='MimeStruct';
            break;
            case 3:
            navStr = 'MineMsg';
            break;
            case 4:
            navStr = 'MineSeting';
            break;
            case 5:
            navStr = 'MineChange';
            break;
            default:
            break
        }
        this.props.tempNav.navigate(navStr)
   }
    render(){
        let {height} = Dimensions.get('window');
        let nameStr = '农法自然'
        let simpleCompanyStr = '农法自然'
        let accountStr = ''
        let titleStr = ''
        if (this.state.userModel !== null){
            nameStr = this.state.userModel.userInfo.userName
            simpleCompanyStr = this.state.company.simpleName
            accountStr = this.state.userModel.userInfo.mobile
            titleStr = this.state.company.branch[0].position
            if (this.state.userModel.userInfo.headPhoto.length > 6){
                let img = {uri:this.state.userModel.userInfo.headPhoto}
                item = <Image source={img} style={{width:70,height:70}} resizeMode='contain'></Image>
            }
        }
        let item = <Text style={{color:'#fff',fontSize:24,fontWeight:'bold'}}>{nameStr.slice(nameStr.length-2,nameStr.length)}</Text>
        return(
         <View style={{flex:1,position:'relative',height:height}}>
        <ScrollView style={{flex:1}}>
            <TouchableOpacity style={{flex:1,height:180,}} onPress={()=> this._pressBtn(1)}>
            <ImageBackground style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-end'}} 
           source={require('../../img/mine_top.png')} 
           resizeMode="contain">
           <View style={{width:70,height:70,borderRadius:35,borderWidth:2,borderColor:'#fff',
            justifyContent:'center',alignItems:'center',marginLeft:20,marginBottom:15,backgroundColor:'#00a056'}}>
            {item}
           </View>
           <View style={{alignItems:'flex-start',justifyContent:'center',marginLeft:8,marginBottom:15,height:70}}>
           <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>{nameStr}</Text>
            <Text style = {{color:'#fff',fontSize:14,marginTop:8}}>公司: {simpleCompanyStr}</Text>
           </View>
           </ImageBackground> 
            </TouchableOpacity>
           <View style={{height:94,alignItems:'flex-start',justifyContent:'center',marginLeft:20}}>
            <Text style={{color:'#4a6961'}}>账号: {accountStr}</Text>
            <Text style={{color:'#4a6961',marginTop:20}}>职位: {titleStr}</Text>
           </View>
           <TouchableOpacity 
           onPress={()=> this._pressBtn(2)}
           style={{flex:1,height:45,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
           <Image source={require('../../img/mine_struct.png')} 
           style={{marginLeft:20,width:19.5,height:19.5}} resizeMode='contain'></Image>
           <Text style={{color:'#4a6961',marginLeft:10}}>公司及人员架构</Text>
           </TouchableOpacity>
           <TouchableOpacity
           onPress={()=> this._pressBtn(3)}
           style={{flex:1,height:45,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
           <Image source={require('../../img/mine_msg.png')} 
           style={{marginLeft:20,width:19.5,height:19.5}} resizeMode='contain'></Image>
           <Text style={{color:'#4a6961',marginLeft:10}}>消息提醒</Text>
           </TouchableOpacity>
           <TouchableOpacity 
           onPress={()=> this._pressBtn(4)}
           style={{flex:1,height:45,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
           <Image source={require('../../img/mine_setting.png')} 
           style={{marginLeft:20,width:19.5,height:19.5}} resizeMode='contain'></Image>
           <Text style={{color:'#4a6961',marginLeft:10}}>设置</Text>
           </TouchableOpacity>
           <TouchableOpacity 
           onPress={()=> this._pressBtn(5)}
           style={{flex:1,height:45,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
           <Image source={require('../../img/mine_change.png')} 
           style={{marginLeft:20,width:19.5,height:19.5}} resizeMode='contain'></Image>
           <Text style={{color:'#4a6961',marginLeft:10}}>切换公司</Text>
           </TouchableOpacity>
        </ScrollView>
         <TouchableOpacity 
         onPress={()=> this._logOut()}
         style={{position:'absolute',bottom:20,
         width:'100%',height:30,backgroundColor:'#00eeee',alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>log out</Text>
         </TouchableOpacity>
         </View>
        )
    }
}