import React,{Component} from 'react';
import {View,TouchableOpacity,Text,Platform,Dimensions,Image,ScrollView} from 'react-native';
import {NavigationEvents} from 'react-navigation'
import REQUEST_URL from '../../Base/BaseWeb';
import fehchData from '../../Base/FetchData';
export default class NormalWorkCreatePage extends Component{
    static navigationOptions = ({navigation})=>{
        return {
            headerTitle:(<Text style={{color:'#333',fontSize:16,fontWeight:'bold'}}>创建项目</Text>),
            headerBackImage:<Image source={require('../../../img/back.png')} style={{width:10,height:17,marginLeft:21.5}}/>,
        }
    }
    constructor(props){
        super(props);
        this.state = {
            companyId:'',
            historyPersonModel:null,
            dataList:[{idStr:'',title:''},{idStr:'',title:''},{idStr:'',title:''},{idStr:'',title:''},{idStr:'',title:''},
            {idStr:'',title:''},{idStr:'',title:''},{idStr:'',title:''},{idStr:'',title:''},{idStr:'',title:''}]
        }
    }
    componentDidMount(){
        let companyId = this.props.navigation.getParam('companyId','');
        this.setState({
            companyId:companyId
        });
        this._fetchHistoryPersonList(companyId);
    }
  
   _fetchHistoryPersonList = (companyId)=>{
        let url = new REQUEST_URL();
        let para = {companyId:companyId}
        if(this.state.historyPersonModel !== null){
            return
        }
        fehchData(url.WORK_NORMAL_HISTORY_PERSON_LIST,para,(respond,err)=>{
            if(err !== null){
                alert(err.message)
            }else{
                this.setState({
                    historyPersonModel:respond
                })
                let ccStr = ''
                let ccId = ''
                for(i=0;i<respond.nf_sendUserId.length;i++){
                    ccStr += respond.nf_sendUserId[i].nf_name + ','
                    ccId += respond.nf_sendUserId[i].id + ','
                }
                ccStr = ccStr.slice(0,ccStr.length-1);
                ccId = ccId.slice(0,ccId.length-1);
                let auditStr = ''
                let auditId = ''
                for(i=0;i<respond.nf_auditUserId;i++){
                    auditStr += respond.nf_auditUserId[i].nf_name +','
                    auditId += respond.nf_auditUserId[i].id + ','
                }
                auditStr = auditStr.slice(0,auditStr.length-1)
                auditId = auditId.slice(0,auditId.length-1)
                let list = this.state.dataList;
                list[7] = {idStr:ccId,title:ccStr};
                list[8] = {idStr:auditStr,title:auditStr}
                this.setState({
                    dataList:list
                })
            }
        })
   }

   _pageFouce = ()=>{
       
   }
    _itemPress = (index)=>{
       
        let list = this.state.dataList;
        alert(JSON.stringify(list[index*1]))
    }
    render(){
        let list = this.state.dataList;
        
        return( 
            <View style={{position:'relative',felx:1}}>
            <NavigationEvents onDidFocus ={payload => this._pageFouce()}/>
               <ScrollView style={{width:'100%',height:'100%',backgroundColor:'#fff'}}>
                <BackView>
                    <TouchableOpacity
                    onPress = {()=> this._itemPress(0)}
                    style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text>项目名称</Text>
                    <Text style={{color:list[0].title.length > 0? '#333':'#eee'}}>{list[0].title.length > 0? list[0].title:'请输入项目名称'}</Text>
                    </TouchableOpacity>
                </BackView>
                <BackView>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',
                borderBottomWidth:1,borderBottomColor:'#eee',paddingBottom:8}}>
                    <Text>工作类型</Text>
                    <TouchableOpacity
                    onPress={()=> this._itemPress(1)}
                    style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                    <Text style={{color:list[1].title.length > 0? '#333':'#eee',marginRight:8}}>
                    {list[1].title.length > 0? list[1].title : '请选择'}
                    </Text>
                    <Image source={require('../../../img/arrow_right.png')} 
                    style={{width:6.5,height:12}} resizeMode='contain'/>
                    </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',
                borderBottomWidth:1,borderBottomColor:'#eee',paddingBottom:8,marginTop:8}}>
                    <Text>工作地块</Text>
                    <TouchableOpacity 
                    onPress={()=> this._itemPress(2)}
                    style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                    <Text style={{color:list[2].title.length > 0? '#333':'#eee',marginRight:8}}>
                    {list[2].title.length > 0? list[2].title : '请选择'}
                    </Text>
                    <Image source={require('../../../img/arrow_right.png')} 
                    style={{width:6.5,height:12}} resizeMode='contain'/>
                    </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
                    <Text>物料范围</Text>
                    <TouchableOpacity 
                    onPress={()=> this._itemPress(3)}
                    style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                    <Text style={{color:list[3].title.length > 0? '#333':'#eee',marginRight:8}}>
                    {list[3].title.length > 0? list[3].title : '请选择'}
                    </Text>
                    <Image source={require('../../../img/arrow_right.png')} 
                    style={{width:6.5,height:12}} resizeMode='contain'/>
                    </TouchableOpacity>
                    </View>
                </BackView>
                <BackView >
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',
                borderBottomWidth:1,borderBottomColor:'#eee',paddingBottom:8}}>
                    <Text>项目开始时间</Text>
                    <TouchableOpacity
                    onPress={()=> this._itemPress(4)} 
                    style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                    <Text style={{color:list[4].title.length > 0? '#333':'#eee',marginRight:8}}>
                    {list[4].title.length > 0? list[4].title : '请选择'}
                    </Text>
                    <Image source={require('../../../img/arrow_right.png')} 
                    style={{width:6.5,height:12}} resizeMode='contain'/>
                    </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
                    <Text>项目结束时间</Text>
                    <TouchableOpacity 
                    onPress={()=> this._itemPress(5)}
                    style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                    <Text style={{color:list[5].title.length > 0? '#333':'#eee',marginRight:8}}>
                    {list[5].title.length > 0? list[5].title : '请选择'}
                    </Text>
                    <Image source={require('../../../img/arrow_right.png')} 
                    style={{width:6.5,height:12}} resizeMode='contain'/>
                    </TouchableOpacity>
                    </View>
                </BackView>
                <BackView>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',
                borderBottomWidth:1,borderBottomColor:'#eee',paddingBottom:8}}>
                    <Text>参与人</Text>
                    <TouchableOpacity 
                    onPress={()=> this._itemPress(6)}
                    style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                    <Text style={{color:list[6].title.length > 0? '#333':'#eee',marginRight:8}}>
                    {list[6].title.length > 0? list[6].title : '请选择'}
                    </Text>
                    <Image source={require('../../../img/arrow_right.png')} 
                    style={{width:6.5,height:12}} resizeMode='contain'/>
                    </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',
                borderBottomWidth:1,borderBottomColor:'#eee',paddingBottom:8,marginTop:8}}>
                    <Text>抄送人</Text>
                    <TouchableOpacity 
                    onPress={()=> this._itemPress(7)}
                    style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                   <Text style={{color:list[7].title.length > 0? '#333':'#eee',marginRight:8}}>
                    {list[7].title.length > 0? list[7].title : '请选择'}
                    </Text>
                    <Image source={require('../../../img/arrow_right.png')} 
                    style={{width:6.5,height:12}} resizeMode='contain'/>
                    </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
                    <Text>审批人</Text>
                    <TouchableOpacity 
                    onPress={()=> this._itemPress(8)}
                    style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                    <Text style={{color:list[8].title.length > 0? '#333':'#eee',marginRight:8}}>
                    {list[8].title.length > 0? list[8].title : '请选择'}
                    </Text>
                    <Image source={require('../../../img/arrow_right.png')} 
                    style={{width:6.5,height:12}} resizeMode='contain'/>
                    </TouchableOpacity>
                    </View>
                </BackView>
                <BackView>
                    <TouchableOpacity
                    onPress = {()=> this._itemPress(9)}
                    style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text>项目描述</Text>
                    <Text style={{color:list[9].title.length > 0? '#333':'#eee',marginRight:8}}>
                    {list[9].title.length > 0? list[9].title : '请选择'}
                    </Text>
                    </TouchableOpacity>
                </BackView>
                </ScrollView> 
            </View>
        )
    }
}

class BackView extends Component{
    render(){
        return(<View style={{width:'100%',justifyContent:'center',alignItems:'center',marginTop:12}}>
            <View 
            style={{width:'90%',borderRadius:10,borderWidth:1,borderColor:'#eee',padding:16}}>{this.props.children}</View>
        </View>)
    }
}