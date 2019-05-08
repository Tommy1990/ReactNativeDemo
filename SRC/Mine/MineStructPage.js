import React,{Component} from 'react';
import {SafeAreaView,View,FlatList,TouchableOpacity,Text,Image,Platform,Dimensions,DeviceEventEmitter,NativeModules} from 'react-native';
import CompanyListView from '../Setting/NormalWork/View/ComapnyListView';
import UserModel from '../Base/UserModel';
import REQUEST_URL from '../Base/BaseWeb';
import fehchData from '../Base/FetchData';
const manager = NativeModules.Manager;
export default class MineStructPage extends Component{
   constructor(props){
       super(props);
       this.state={
        selectCompany:null,
        branchList:[],
        personList:[],
       }
   }
   componentDidMount(){
    this._setData();
    this.listener = DeviceEventEmitter.addListener('hideListView',(e)=>{
        if (e!== null){
            this.setState({
                selectCompany:e,
            })
            this._fetchData(e);
        }
    })
   }
   componentWillUnmount(){
       this.listener.remove();
   }
   _setData = async() =>{
        let model = new UserModel();
        let defaultCompany = await model.getDefaultCompany();
        this.setState({
            selectCompany:defaultCompany
        });
        this._fetchData(defaultCompany);
   }
   _fetchData = (company)=>{
       let url = new REQUEST_URL();
       let para = {companyId:company.id}
       fehchData(url.MINE_STRUCT_DATA,para,(respond,err)=>{
           if (err !== null){
               alert(err.message)
           }else{
                for (i=0;i<respond.branch.length;i++){
                    respond.branch[i].isSelected = i === 0;
                }
              this.setState({
                  branchList:respond.branch,
                  personList: respond.branch.length > 0 ? respond.branch[0].userInfo : [],
              })   
           }
       })
   }

   _onPress = ()=>{
     DeviceEventEmitter.emit('showCompanyList','')
   }
   _backPress = ()=>{
       this.props.navigation.goBack();
   }
    render(){
        let {width,height} = Dimensions.get('window');
        let statueHeight = 44 + 20
        if (Platform.OS === 'ios' && height>811){
            statueHeight = 44 + 44
        }
        let companyStr = ''
        if (this.state.selectCompany !== null){
            companyStr = this.state.selectCompany.simpleName;
        }
        return(
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={{width:'100%',height:statueHeight,borderBottomWidth:1,borderBottomColor:'#eee',
                position:'relative',alignItems:'flex-end',justifyContent:'flex-start',flexDirection:'row',position:'relative'}}>
                <TouchableOpacity 
                onPress= {()=> this._backPress()}
                hitSlop={{left:20,right:20,top:20,bottom:10}}
                style={{alignItems:'center',justifyContent:'center',marginLeft:21,marginBottom:16.5}}>
                <Image source={require('../../img/back.png')} style={{width:10,height:17}} resizeMode='contain'></Image>
                </TouchableOpacity>
                <TouchableOpacity
                onPress = {()=> this._onPress()}
                hitSlop={{top:10,bottom:10}}
                style={{width:width-62,marginBottom:16.5,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>{companyStr}[切换]</Text>
                </TouchableOpacity>
                <CompanyListView style={{position:'absolute',top:statueHeight,left:0}} defaultCompany={this.state.selectCompany}/>
                </View>
                <View style={{width:'100%',height:height-statueHeight,flexDirection:'row'}}>
                    <FlatList
                    data={this.state.branchList}
                    renderItem={({item,index})=> 
                         (<TouchableOpacity 
                            onPress={()=>this._leftItemPress(item) }
                            style={{flex:1,height:53,alignItems:'center',justifyContent:'center',
                            backgroundColor: item.isSelected ? '#00a056' :'#fff',
                            borderBottomColor:'#eee', borderBottomWidth:0.5}}>
                            <Text style={{color: item.isSelected? '#fff' : '#333'}}>{item.branchName}</Text>
                         </TouchableOpacity>)
                    }
                    keyExtractor= {({item,index})=> index*10000}
                    style={{width:'33%',height:'100%',borderRightWidth:1,borderRightColor:'#eee'}}/>
                    <FlatList
                    data={this.state.personList}
                    renderItem = {({item})=>(
                        <TouchableOpacity 
                        onPress={()=>this._rightItemPress(item)}
                        style={{flex:1,height:41,alignItems:'center',justifyContent:'space-between',
                        flexDirection:'row',borderBottomColor:'#eee',borderBottomWidth:0.5}}>
                            <Text style={{marginLeft:27,color:'#333'}}>{item.userName}-{item.mobile}</Text>
                            <Image style={{width:16,height:16,marginRight:30}} source={require('../../img/Mine_phone.png')}/>
                         </TouchableOpacity>
                    )}
                    keyExtractor= {({item,index})=>  Math.random()*1000 + index}
                    style={{width:'67%',height:'100%'}}/>
                </View>
            </View>
        )
    }
    _leftItemPress = (item)=>{
        let list = this.state.branchList;
        for (i=0;i<list.length;i++){
            if (list[i].branchId === item.branchId){
                list[i].isSelected = true
                this.setState({
                    personList:list[i].userInfo
                })
            }else{
                list[i].isSelected = false
            }
        }
        this.setState({
            branchList:list
        })
    }
    _rightItemPress = (item)=>{
        if (item.mobile.length >= 11){
            let mobile = JSON.stringify(item.mobile);
            manager.makePhoneCall(mobile);
        }
       
    }
}

