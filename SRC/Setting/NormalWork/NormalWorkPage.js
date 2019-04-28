import React,{Component} from 'react';
import {SafeAreaView,View,ScrollView,FlatList,TouchableOpacity,Text,Image,DeviceEventEmitter,Animated,Dimensions} from 'react-native';
import UserModel from '../../Base/UserModel';
import Modal from 'react-native-modal';
import REQUEST_URL from '../../Base/BaseWeb';
import fehchData from '../../Base/FetchData';
import { NavigationEvents } from 'react-navigation';
export default class NormalWorkPage extends Component{
   
    static navigationOptions = ({navigation}) => { 
        
        return {
            headerTitle:<HeaderView/>,
            headerBackImage:<Image source={require('../../../img/back.png')} style={{width:10,height:17,marginLeft:21.5}}/>,
            headerRight:(<TouchableOpacity hitSlop = {{left:20,right:20,top:20,bottom:20}}
                style={{marginRight:21.75}}
            onPress = {()=>{
                DeviceEventEmitter.emit('jumpToConditionSelect',null);
            }}
            ><Text style={{color:'#333',fontSize:14}}>筛选</Text></TouchableOpacity>),
            headerBackTitle: null,
        }
    }
    constructor(props){
        super(props);
        this.state = {
            selectCompany:null,
            showCompanyListView:false,
            proStatus:'',
            userid:'',
            proRelation:'',
            creatId:'',
            paticiptatedId:'',
            copyId:'',
            approvalId:'',
            parksStr:'',
            nf_type:'',
            time:'',
            titleCondition:'all',
            page:1,
            titlemodel:null,
            prolist:[],
        }
    }
    _pageFouce = ()=>{
        let changed = this.props.navigation.getParam('changed',false)
        if (!changed){return}
        let proStatusStr = this.props.navigation.getParam('proStatusStr','')
        let proRelationStr = this.props.navigation.getParam('proRelationStr','')
        let parksStr = this.props.navigation.getParam('parksStr','')
        let timeStr = this.props.navigation.getParam('timeStr','')
        this.setState({
            proStatus:proStatusStr,
            proRelation:proRelationStr,
            parksStr:parksStr,
            time:timeStr,
            titleCondition:'all',
        })
    }
    componentDidMount(){
         this.listener = DeviceEventEmitter.addListener('showCompanyList',(e)=>{
            if (e !== null){
               this.setState({
                   showCompanyListView:true,
               })
            }
        })
        this.listener = DeviceEventEmitter.addListener('hideListView',(e)=>{
            if (e !== null){
               this.setState({
                selectCompany:e
               })
            }
        })
        this.listener = DeviceEventEmitter.addListener('jumpToConditionSelect',()=>{
            this._jumpToSelect();
        })
        this._setData();
    }
    componentWillUnmount(){
        this.listener.remove();
    }
    _setData = async()=>{

        let model = new UserModel();
        let company = await model.getDefaultCompany();
        let userid = await model.getUserID();
        await this.setState({
            selectCompany:company,
            userid:userid
        })
        this._fetchListData();
    }
   _fetchListData = async()=>{
       let arr = this.state.proRelation.split(',');
       for (i=0;i< arr.length;i++){
            let str = arr[i];
            switch (str) {
                case '0':
                    this.setState({
                        createId:this.state.userid
                    })
                    break;
                case '1':
                    this.setState({
                        participateId:this.state.userid
                    })
                    break;
                case '2':
                    this.setState({
                        copyId:this.state.userid
                    })
                    break;
                case '3':
                    this.setState({
                        approvalId:this.state.userid
                    })
                    break;
                default:
                    break;
            }
       }
        let param = {
            nf_companyId:this.state.selectCompany.id,
            nf_proStatus:this.state.proStatus,
            createId:this.state.creatId,
            participateId:this.state.paticiptatedId,
            copyId:this.state.copyId,
            approvalId:this.state.approvalId,
            limit:'20',
            pickId:this.state.parksStr,
            nf_type:this.state.nf_type,
            time:this.state.time,
            titleCondition:this.state.titleCondition,
            page:`${this.state.page}`,
        }
        let url = new REQUEST_URL();
        fehchData(url.WORK_NORMAL_PROJECT_LIST,param,(respond,error) => {
            if(error !== null){
                alert(error.message);
            }else{
                let list = []
                if (this.state.page === 1){
                    list = respond.data
                }else{
                    list += respond.data
                }
                this.setState({
                    titlemodel:respond.projectNum,
                    prolist:list
                })
                
            }
        });
   }
    render(){
       const {width,height} = Dimensions.get('window');
       let gap = (width - 50*4 -36.5 - 36.5)/3;
       let listheight = height - 90.5
        let allStr = '99+'
        let ongoingStr = '99+'
        let approvedStr = '99+'
        let delayStr = '99+' 
        if (this.state.titlemodel !== null){
            allStr = this.state.titlemodel.one.number;
            ongoingStr = this.state.titlemodel.two.number;
            approvedStr = this.state.titlemodel.three.number;
            delayStr = this.state.titlemodel.four.number;
        }
        return(<SafeAreaView style={{position:'relative'}}>
        <NavigationEvents onDidFocus ={payload => this._pageFouce()}/>
       <View style={{flexDirection:'row',width:'100%',height:90.5,justifyContent:'flex-start',alignItems:'center',borderBottomColor:'#eee',borderBottomWidth:1}}>
       <View style={{marginLeft:36.5,width:50,alignItems:'center'}}>
        <TouchableOpacity 
        onPressIn={()=> this._categoryPress('all')}
         style={{borderRadius:19.5,borderColor:'#24a0ea',borderWidth:1,width:39,height:39,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'#24a0ea',fontSize:18,fontWeight:'bold'}}>{allStr}</Text>
        </TouchableOpacity >
        <Text style={{color:'#333',marginTop:8}}>全部</Text>
       </View>
       <View style={{marginLeft:gap,width:50,alignItems:'center'}}>
        <TouchableOpacity 
        onPressIn={()=>this._categoryPress('1,4')}
        style={{borderRadius:19.5,borderColor:'#01b211',borderWidth:1,width:39,height:39,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'#01b211',fontSize:18,fontWeight:'bold'}}>{ongoingStr}</Text>
        </TouchableOpacity>
        <Text style={{color:'#333',marginTop:8}}>进行中</Text>
       </View>
       <View style={{marginLeft:gap,width:50,alignItems:'center'}}>
        <TouchableOpacity 
        onPressIn={()=>this._categoryPress('0,3')}
        style={{borderRadius:19.5,borderColor:'#f5a623',borderWidth:1,width:39,height:39,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'#f5a623',fontSize:18,fontWeight:'bold'}}>{approvedStr}</Text>
        </TouchableOpacity>
        <Text style={{color:'#333',marginTop:8}}>待审核</Text>
       </View>
       <View style={{marginLeft:gap,width:50,alignItems:'center'}}>
        <TouchableOpacity 
        onPressIn={()=>this._categoryPress('1002')}
        style={{borderRadius:19.5,borderColor:'#e43535',borderWidth:1,width:39,height:39,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'#e43535',fontSize:18,fontWeight:'bold'}}>{delayStr}</Text>
        </TouchableOpacity>
        <Text style={{color:'#333',marginTop:8}}>已逾期</Text>
       </View>
       </View>
        <FlatList 
        style={{width:'100%',height:listheight}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={this.state.prolist}
        renderItem = {({item}) =>
           <ProlistCellView item ={item} />
        }
        keyExtractor ={(item,index)=> index}
        />
        <CompanyListView style={{position:'absolute',top:0,left:0}} defaultCompany={this.state.selectCompany}></CompanyListView>
        </SafeAreaView>)
    }
    
    _categoryPress = async (condition)=>{
       
        await this.setState({
            titleCondition:condition,
            proStatus:'',
            proRelation:'',
            parksStr:'',
            time:'',
        });
        
        this._fetchListData();
    }
    _jumpToSelect = ()=>{
        this.props.navigation.navigate('NormalSelect',{company:this.state.selectCompany,
            proStatusStr:this.state.proStatus,
            proRelationStr:this.state.proRelation,
            parksStr:this.state.parksStr,
            timeStr:this.state.time,
        });
    }
}
 class ProlistCellView extends Component{
     render(){
        const {width,height} = Dimensions.get('window');
        let viewWidth = (width - 44 - 47);
        let categoryStr = "基";
        let titleStr = '---------';
        let statueStr = '---';
        let statueColor = '#333'
        let nameStr = '---';
        let numStr = '0%';
        let timeStr = '0000-00-00';
        if (this.props.item !== null){
            let model = this.props.item;
            categoryStr = model.nf_itemsTypeName.slice(0,1);
            titleStr = model.nf_proName;
            nameStr = model.nf_name;
            numStr = `${model.nf_proPlan}%`
            let num = new Number(model.nf_endTime);
            let date = new Date(num * 1000);
            timeStr = date.toISOString().slice(0,10);
            switch (model.nf_proStatus) {
                case '0':
                    statueColor='#f5a623'
                    statueStr='待审核'
                    break;
                case '1','4':
                statueColor='#01b211'
                statueStr='项目进行中'
                break;
                case '2':
                statueColor='#e43535'
                statueStr='审核未通过'
                break;
                case '1002':
                statueColor='#f5a623'
                statueStr='已逾期'
                break;
                case '1001':
                statueColor='#f5a623'
                statueStr='废弃待审核'
                break;
                case '6':
                statueColor='#49a286'
                statueStr='待复查'
                break;
                case '3':
                 statueColor = '#49a286'
                 statueStr = "待复查"
                case '5':
                statueColor = '#24a0ea'
                statueStr = "已完成"
                case '1003':
                statueColor = '#e43535'
                statueStr = "逾期完成"
                 case '7':
                 statueColor = '#c4c4c4'
                statueStr = "已废弃"
                default:
                    break;
            }
        }
        return(
            <View style={{justifyContent:'flex-start',padding:22,flex:1,borderBottomColor:'#eee',borderBottomWidth:1}}>
               <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <View>
                    <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                    <View style={{color:'#fff',backgroundColor:'#4da9ec',borderRadius:12,width:24,height:24,justifyContent:'center',alignItems:'center'}}>
                         <Text style={{color:'#fff',fontSize:14}}>{categoryStr}</Text>
                    </View>
                    <Text style={{color:'#000',fontSize:16,fontWeight:'normal',marginLeft:10}}>{titleStr}</Text>
                    </View>
                    <Text style={{color:'#333',fontSize:14,marginTop:10}}>创建人:  {nameStr}</Text>
                </View>
                <View style={{width:48,height:48,justifyContent:'center',alignItems:'center',borderColor:statueColor,borderWidth:1,borderRadius:24}}>
                    <Text style={{color:statueColor,fontSize:12,fontWeight:'bold'}}>{statueStr}</Text>
                </View>
                </View> 
                <View style={{flexDirection:'row',width:'100%',height:20,justifyContent:'flex-start',alignItems:'center',marginTop:5}}> 
                   <View style={{position:'relative',backgroundColor:'#eee',height:3,borderRadius:1.5,width:viewWidth}}>
                        <View style={{position:'absolute',top:0,left:0,backgroundColor:statueColor,height:3,borderRadius:1.5,width:numStr}}></View>
                   </View>
                   <Text style={{color:statueColor,fontSize:16,marginLeft:10}}>{numStr}</Text>   
                </View>
                <Text style={{color:'#333',fontSize:12}}>结束时间: {timeStr} </Text>
            </View>
        )
     }
 }
 class HeaderView extends Component{
    constructor(props){
        super(props);
        this.state = {
            company:null
        }
    }
    componentDidMount(){
        this._setData();
        this.listener = DeviceEventEmitter.addListener('hideListView',(e)=>{
            if (e !== null){
               this.setState({
                   company:e
               })
            }
        })
    }
    componentWillUnmount(){
        this.listener.remove();
    }
    _setData = async()=>{
        let model = new UserModel();
        let company = await model.getDefaultCompany();
        this.setState({
            company:company
        })
    }
    render(){
        var title = '---'
        if (this.state.company !== null){
            title = this.state.company.simpleName
        }
        return(
            <TouchableOpacity hitSlop={{left:20,right:20,top:20,bottom:20}} onPress={()=>{
                DeviceEventEmitter.emit('showCompanyList',this.state.company);
            }}>
            <Text style={{color:'#333',fontSize:18,fontWeight:'bold'}}>{title}</Text>
            </TouchableOpacity>
        )
    }
 }

class CompanyListView extends Component{
    constructor(props){
        super(props);
        this.state = {
            list:[],
            animatedheight: new Animated.Value(0),
        }
    }
    componentDidMount(){
        
        this.listener = DeviceEventEmitter.addListener('showCompanyList',(e)=>{
           if (e !== null){
              this._showlist();
           }
       })
   }
   componentWillUnmount(){
       this.listener.remove();
   }
   
   componentWillReceiveProps(nextProps){
     this._setData();
   }
    _setData = async()=>{
        let model = new UserModel();
        var list = await model.getCompanyList();
        let defaultcompany = this.props.defaultCompany;
        for (i=0;i < list.length;i++){
         let temp = list[i];
         temp.isdefault = temp.id == defaultcompany.id;
        }
        this.setState({
            list:list
        })
    }
    _showlist = () =>{
        Animated.timing(this.state.animatedheight,{
            toValue:600,
            duration:1000,
        }).start();
    }
    _hidelist = (model)=>{
        Animated.timing(this.state.animatedheight,{
            toValue:0,
            duration:1000,
        }).start();
        DeviceEventEmitter.emit('hideListView',model);
    }
    render(){
        let items = [];
       for (i=0; i< this.state.list.length;i++){
           let model = this.state.list[i];
            let item = (
            <View style={{width:'100%',alignItems:'center',justifyContent:'center',height:44,backgroundColor:'#fff'}} key={i}>
                <TouchableOpacity hitSlop={{top:10,bottom:10,left:20,right:20}} onPress={()=> this._hidelist(model)}>
                <Text style={{color: model.isdefault ? '#00a056' : '#333',fontSize:16}}>{model.simpleName}</Text>
                </TouchableOpacity>
            </View>
            
          )
            items.push(item)
       }
       
       return( 
        <Animated.ScrollView style={{...this.props.style,height:this.state.animatedheight,backgroundColor:'rgba(0,0,0,0.03)',width:'100%'}} ref={component => this._view = component}>
        {items}
        </Animated.ScrollView>
       )
    }
}