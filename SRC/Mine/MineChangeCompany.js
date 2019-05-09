import React,{Component} from 'react';
import {View,Image,TouchableOpacity,Text,Dimensions,Platform,FlatList} from 'react-native';
import UserModel from '../Base/UserModel';
import REQUEST_URL from '../Base/BaseWeb';
import fehchData from '../Base/FetchData';


export default class MineChangePage extends Component{
    static navigationOptions = {
       header:null
    }
    constructor(props){
        super(props);
        this.state = {
            list:[]
        }
    }
    componentDidMount(){
        this._setData()
    }
    _setData = async()=>{
        let model = new UserModel()
        let companyList = await model.getCompanyList();
        this.setState({
            list:companyList,
        })
    }
    _backPress = ()=>{
        this.props.navigation.goBack();
    }
    _btnPress = (model)=>{
        this._postChangeCompany(model);
    }
    _postChangeCompany = async(item)=>{
        let url = new REQUEST_URL();
        let para = {companyId:item.id}
        fehchData(url.MINE_RESET_COMPANY,para,(respond,error)=>{
            if(error !== null){
                alert(error.message)
            }else{
                this._logout()
            }
        })
    }
    _logout = async()=>{
        let model = new UserModel()
                await model.cleanLoginData();
                this.props.navigation.navigate('Loading')
    }
    render(){
        let {width,height} = Dimensions.get('window');
        let statueHeight = Platform.OS === 'ios' && height > 811 ? 88 : 64 ;
        return(
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={{width:'100%',height:statueHeight,borderBottomWidth:1,borderBottomColor:'#eee',
                    position:'relative',alignItems:'flex-end',justifyContent:'space-between',flexDirection:'row'}}>
                    <TouchableOpacity 
                    onPress= {()=> this._backPress()}
                    hitSlop={{left:20,right:20,top:20,bottom:10}}
                    style={{alignItems:'center',justifyContent:'center',marginLeft:21,marginBottom:16.5}}>
                         <Image source={require('../../img/back.png')} style={{width:10,height:17}} resizeMode='contain'></Image>
                     </TouchableOpacity>
                 <View style={{marginBottom:16.5,width:width-62,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>切换公司</Text>
                 </View>
                 </View>
            
            <FlatList
            style={{width:'100%',height:height - statueHeight}}
            data={this.state.list}
            renderItem = {({item})=>(
                <View style={{width:'100%',
                justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity 
                    onPress = {()=> this._btnPress(item)}
                style={{width:'90%',marginBottom:13,marginTop:13,height:45,justifyContent:'center',alignItems:'center',
                borderRadius:10,borderWidth:1,borderColor:'#eee',
                backgroundColor:item.userInCompanyStatus === '1' && item.isDefault == '1' ? '#00a056' : '#fff',
                }}>
                <Text style={{color:'#333',fontSize:16,fontWeight:'bold'}}>{item.simpleName}</Text>
                </TouchableOpacity>
                </View>
            )} 
            keyExtractor = {({item,index})=>index}
            />
        </View>
        )
    }
}