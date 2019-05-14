import React,{Component} from 'react';
import {SafeAreaView,View,ScrollView,FlatList,TouchableOpacity,Text,Image,DeviceEventEmitter,Animated,Dimensions} from 'react-native';
import UserModel from '../../Base/UserModel';
import Modal from 'react-native-modal';
import REQUEST_URL from '../../Base/BaseWeb';
import fehchData from '../../Base/FetchData';
import { NavigationEvents } from 'react-navigation';
import CompanyListView from './View/ComapnyListView'

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
            parksStr:'',
            nf_type:'',
            time:'',
            titleCondition:'all',
            page:1,
            prolist:[],
            totalPage:1,
            currentPage:1,
            proRelationStr:'',
            titleModellist:[{number:'99+',selected:true,id:'all',title:'全部',color:'#24a0ea'},
            {number:'99+',selected:false,id:'1,4',title:'进行中',color:'#01b211'},
            {number:'99+',selected:false,id:'0,3',title:'待审核',color:'#f5a623'},
            {number:'99+',selected:false,id:'1002',title:'已逾期',color:'#e43535'}]
        }
    }
    _pageFouce = async()=>{
        let changed = this.props.navigation.getParam('changed',false)
        if (!changed){return}
        let proStatusStr = this.props.navigation.getParam('proStatusStr','')
        let proRelationStr = this.props.navigation.getParam('proRelationStr','')
        let parksStr = this.props.navigation.getParam('parksStr','')
        let timeStr = this.props.navigation.getParam('timeStr','')
       
        await this.setState({
            proStatus:proStatusStr,
            proRelationStr:proRelationStr,
            parksStr:parksStr,
            time:timeStr,
            titleCondition:'all'
        });
        this._btnChange(this.state.titleModellist[0])
        this._fetchListData();
    }
    componentDidMount(){
         
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
    _headerRefreshing = async()=>{
        this.setState({
            currentPage:1,
        })
        this._listView.refreshing = true;
        await this._fetchListData();
    }
   _fetchListData = async()=>{
    let arr = this.state.proRelationStr.split(','); 
    let createId = ''
    let participateId = ''
    let copyId = ''
    let approvalId = ''      
    for (i=0;i< arr.length;i++){
         let str = arr[i];
         switch (str) {
             case '0':
                createId = this.state.userid
                 break;
             case '1':
                participateId = this.state.userid
                 break;
             case '2':
                copyId = this.state.userid
                 break;
             case '3':
                approvalId =this.state.userid
                 break;
             default:
                 break;
         }
    }
    // alert(this.state.currentPage)
        let param = {
            nf_companyId:this.state.selectCompany.id,
            nf_proStatus:this.state.proStatus,
            createId:createId,
            participateId:participateId,
            copyId:copyId,
            approvalId:approvalId,
            limit:'20',
            pickId:this.state.parksStr,
            nf_type:this.state.nf_type,
            time:this.state.time,
            titleCondition:this.state.titleCondition,
            page:this.state.currentPage,
        }
        // alert(JSON.stringify(param))
        let url = new REQUEST_URL();
        fehchData(url.WORK_NORMAL_PROJECT_LIST,param,(respond,error) => {
            if(error !== null){
                alert(error.message);
            }else{
                let list = this.state.titleModellist;
                let titlemodel = respond.projectNum;
                list[0].number = titlemodel.one.number;
                list[1].number = titlemodel.two.number;
                list[2].number = titlemodel.three.number;
                list[3].number = titlemodel.four.number;
                let templist = this.state.prolist;
                if (this.state.currentPage === 1){
                    templist = respond.data
                }else{
                    templist = [...templist,...respond.data];
                }
                this.setState({
                    titleModellist:list,
                    prolist:templist,
                    currentPage:respond.current_page,
                    totalPage:respond.pageCount,
                })
                
                this._listView.refreshing = false;
            }
        });
   }
    render(){
       const {width,height} = Dimensions.get('window');
       let gap = (width - 50*4 -36.5 - 36.5)/3;
       let listheight = height - 90.5 - 100
        let list = this.state.titleModellist
        let items = []
        for(i = 0;i<list.length;i++){
            let model = list[i]
            let item = (
                <View style={{marginLeft:36.5,width:50,alignItems:'center'}} key={(i+1)*10000}>
                <TouchableOpacity 
                onPressIn={()=> this._categoryPress(model)}
                 style={{borderRadius:19.5,backgroundColor:model.selected?model.color:'#fff',
                 borderColor:model.color,borderWidth:1,width:39,height:39,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:model.selected?'#fff':model.color,fontSize:18,fontWeight:'bold'}}>{model.number}</Text>
                </TouchableOpacity >
                <Text style={{color:'#333',marginTop:8}}>{model.title}</Text>
               </View>
            )
            items.push(item)
        }
        return(<View style={{position:'relative'}}>
        <NavigationEvents onDidFocus ={payload => this._pageFouce()}/>
       <View style={{flexDirection:'row',width:'100%',height:90.5,justifyContent:'flex-start',alignItems:'center',borderBottomColor:'#eee',borderBottomWidth:1}}>
       {items}
       </View>
        <FlatList 
         ref = {component => this._listView = component} {...this.props}
        style={{width:'100%',height:listheight}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={this.state.prolist}
        onEndReached={()=> this._listscrollToEnd()}
        onEndReachedThreshold = {0.5}
        refreshing= {false}
        onRefresh = {()=>{
            this._headerRefreshing();
        }}
        renderItem = {({item}) =>
           <ProlistCellView item ={item}  cellPress={this._jumpToProjectDetail}/>
            // <Text>{JSON.stringify(item)}</Text>
        }
        keyExtractor ={(item,index)=> index}
        />
        
        <CompanyListView style={{position:'absolute',top:0,left:0}} defaultCompany={this.state.selectCompany}></CompanyListView>
        <View style={{position:'absolute',bottom:0,left:0,width:'100%'}}>
        <TouchableOpacity 
        onPress={()=> this._creatProject()}
        style={{width:'100%',height:50,justifyContent:'center',alignItems:'center',backgroundColor:'#00a056'}}>
            <Text style={{color:'#fff',fontSize:18}}>+ 发布项目</Text>
        </TouchableOpacity>
        </View>
        </View>)
    }
    _listscrollToEnd = async()=>{
        let total = this.state.totalPage;
        let current = this.state.currentPage*1 + 1;
        if (current > total){
            // alert('已经到底了')
            return
        }else{
            await this.setState({
                currentPage:current
            })
            this._fetchListData();
        }
    }
    _jumpToProjectDetail = (project)=>{
       this.props.navigation.navigate('NormalDetail',{
           projectId:project.id
       })
    }
    _creatProject = ()=>{
        this.props.navigation.navigate('NormalCreate',{companyId:this.state.selectCompany.id});
    }
    _btnChange = async(model)=>{
        let list = this.state.titleModellist;
       for(i=0;i<list.length;i++){
           list[i].selected = list[i].id == model.id
       }
    }
    _categoryPress = async (model)=>{
       this._btnChange(model);
       let list = this.state.titleModellist;
        await this.setState({
            titleCondition:model.id,
            titleModellist:list,
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
            proRelationStr:this.state.proRelationStr,
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
            categoryStr = model.nf_workTypeName.slice(0,1);
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
            <TouchableOpacity
            onPress={()=> this.props.cellPress(this.props.item)}
             style={{justifyContent:'flex-start',padding:22,flex:1,borderBottomColor:'#eee',borderBottomWidth:1}}>
               <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <View>
                    <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                    <View style={{color:'#fff',backgroundColor:'#00a056',borderRadius:12,width:24,height:24,justifyContent:'center',alignItems:'center'}}>
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
            </TouchableOpacity>
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

