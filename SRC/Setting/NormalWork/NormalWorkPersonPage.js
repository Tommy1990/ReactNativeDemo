import React,{Component} from 'react';
import {View,Image,TouchableOpacity,DeviceEventEmitter,Text,FlatList} from 'react-native';
import REQUEST_URL from '../../Base/BaseWeb';
import fehchData from '../../Base/FetchData';
import BaseDimension from '../../Base/BaseDimension';
import UserModel from '../../Base/UserModel';
export default class NormalWorkPersonpage extends Component{

    static navigationOptions = ({navigation}) =>{
       
        return({
            headerTitle:<Text style={{color:'#333',fontSize:18}}>人员列表</Text>,
            headerBackImage:<Image source={require('../../../img/close.png')} style={{width:12.5,height:12.5,marginLeft:21}} resizeMode='contain'/>,
            headerRight:( <TouchableOpacity style={{marginRight:21}}  
            hitSlop={{top:20,bottom:20,right:20,left:20}}
            onPress={()=>{
               DeviceEventEmitter.emit('personSubmit');
            }}> 
                <Image source={require('../../../img/select.png')} style={{width:16.5,height:11.5}} resizeMode='contain'/>
            </TouchableOpacity>)
        })
    }
    constructor(props){
        super(props);
        this.state = {
            index:0,
            list:[],
            
        }
    }
    componentDidMount(){
        let index = this.props.navigation.getParam('index',0)
        let personList = this.props.navigation.getParam('personlist',[])
        let participteIds = this.props.navigation.getParam('participteIds','')
        let ccIds = this.props.navigation.getParam('ccIds','')
        let auditId = this.props.navigation.getParam('auditId','')
        let companyId = this.props.navigation.getParam('companyId','')
        this.listener = DeviceEventEmitter.addListener('personSubmit',()=>{
            this._submitSelect();
        })
        if (personList.length == 0){
            this._fetchdata(companyId,participteIds,ccIds,auditId,index)
        }
        this.setState({
            index:index,
            list:personList
        })
    }
    componentWillUnmount(){
        this.listener.remove();
    }
    _submitSelect = ()=>{
        let list = this.state.list;
        let participteIds = ''
        let participteStr = ''
        let ccIds = ''
        let ccStr = ''
        let auditId = ''
        let auditStr = ''
        let participtelist = []
        let ccList = []
        let auditList = []
        for(i=0;i<list.length;i++){
            for(j=0;j<list[i].childList.length;j++){
                let model = list[i].childList[j]
                switch(model.selectIndex){
                    case 6:
                        if(!(participtelist.some((item)=> {item.id == model.id}))){
                            participtelist.push(model)
                        }
                    break;
                    case 7:
                    if(!(ccList.some((item)=> {item.id == model.id}))){
                        ccList.push(model)
                    }
                    break;
                    case 8:
                    if(!(auditList.some((item)=> {item.id == model.id}))){
                        auditList.push(model)
                    }
                    break;
                }
            }
        }
        for(i=0;i<participtelist.length;i++){
            participteIds += participtelist[i].id + ','
            participteStr += participtelist[i].nf_name + ','
            if(i== participtelist.length-1){
                participteIds = participteIds.slice(0,participteIds.length-1)
                participteStr = participteStr.slice(0,participteStr.length-1)
            }
        }
        for(i=0;i<ccList.length;i++){
            ccIds += ccList[i].id + ','
            ccStr += ccList[i].nf_name + ','
            if(i== ccList.length-1){
                ccIds = ccIds.slice(0,ccIds.length-1)
                ccStr = ccStr.slice(0,ccStr.length-1)
            }
        }
        if(auditList.length !== 0){
            auditId = auditList[0].id
            auditStr = auditList[0].nf_name
        }
        this.props.navigation.navigate('NormalCreate',{personList:this.state.list,index:this.state.index,
        participteIds:participteIds,participteStr:participteStr,
        ccIds:ccIds,ccStr:ccStr,
        auditId:auditId,auditStr:auditStr})
    }
    _fetchdata = (comopanyId,participteIds,ccIds,auditId,index)=>{
        let url = new REQUEST_URL();
        let para = {nf_companyId:comopanyId}
        fehchData(url.WORK_COMPANY_PERSON_LIST,para,async(respond,err)=>{
            if(err !== null){
                alert(err.message)
            }else{
                let participtelist = participteIds.split(',')
                let ccList = ccIds.split(',')
                let list = []
                let model = new UserModel()
                let userid = await model.getUserID()
                for(i=0;i<respond.length;i++){
                    if (respond[i].childList.length > 0){
                        list.push(respond[i]);
                    }
                }
                for(i=0;i<list.length;i++){
                    for(j=0;j<list[i].childList.length;j++){
                        list[i].childList[j].selectIndex = 0;
                        
                        if (list[i].childList[j].id == userid ){
                            list[i].childList[j].selectIndex = 9
                            continue
                        }
                        for(k=0;k<participtelist.length;k++){
                            if(list[i].childList[j].id == participtelist[k]) {
                                list[i].childList[j].selectIndex = 6;
                                break;
                            }
                        }
                        if (list[i].childList[j].selectIndex !== null && list[i].childList[j].selectIndex == 6){
                            continue
                        }
                        for(k=0;k<ccList.length;k++){
                            if(list[i].childList[j].id == ccList[k]) {
                                list[i].childList[j].selectIndex = 7
                                break;
                            }
                        }
                        if (list[i].childList[j].selectIndex !== null && list[i].childList[j].selectIndex == 7){
                            continue
                        }
                        if (list[i].childList[j].id == auditId){
                            list[i].childList[j].selectIndex = 8
                        }
                    }
                }
                this.setState({
                    list:list
                })
            }
        })
    }
    _selectPerson=(person)=>{
        let list = this.state.list
        let categoryIndex = this.state.index
        person.selectIndex = person.selectIndex == categoryIndex ? 0 : categoryIndex
        if(this.state.index == 8 && person.selectIndex == 8){
            for(i=0;i<list.length;i++){
                for(j=0;j<list[i].childList.length;j++){
                    if (person.id == list[i].childList[j].id){
                        list[i].childList[j].selectIndex = person.selectIndex
                    }else{
                        if (list[i].childList[j].selectIndex == 8){
                            list[i].childList[j].selectIndex = 0
                        }
                    }
                    
                }
            }
        }else{
            for(i=0;i<list.length;i++){
                for(j=0;j<list[i].childList.length;j++){
                    if (person.id == list[i].childList[j].id){
                        list[i].childList[j].selectIndex = person.selectIndex
                        break;
                    }
                }
            }
        }
        
        this.setState({
            list:list
        })
    }
    render(){
        return(<View style={{flex:1}}>
            <FlatList
            style={{flex:1}}
            data={this.state.list}
            renderItem={({item,index})=>(<View style={{width:'100%',padding:21}}>
                <Text>{item.nf_branchName}</Text>
                <MyRenderItem list={item.childList} index={index} onPress={this._selectPerson} categoryindex={this.state.index}>

                </MyRenderItem>
            </View>)}
            keyExtractor={({item,index})=> index}/>
        </View>)
    }
}

class MyRenderItem extends Component{

    render(){
        let screen = new BaseDimension();
        let screenWidth = screen.getScreenWidth();
        let items = []
        let list = this.props.list;
        let category = this.props.categoryindex;
        if(list !== null){
            for(i=0;i<list.length;i++){
                let model = list[i]
                let enable = Math.abs(model.selectIndex - category) > 3 || model.selectIndex - category == 0 
                let backgroundColor = '#fff'
                let color = '#555'
                let appendStr = ''
                if (!enable){
                    backgroundColor = '#eee'
                }else if(model.selectIndex - category == 0){
                    backgroundColor = '#00a05633'
                    color = '#00a056'
                }
                switch(model.selectIndex){
                    case 6:
                    appendStr = model.selectIndex - category == 0 ? '' :'(参与人)'
                    break;
                    case 7:
                    appendStr = model.selectIndex - category == 0 ? '' :'(抄送人)'
                    break;
                    case 8:
                    appendStr = model.selectIndex - category == 0 ? '' :'(审批人)'
                    break;
                    case 9:
                    appendStr = '(创建人)'
                    break;
                }
                let item = (<TouchableOpacity style={{alignItems:'center',justifyContent:'center',marginRight:13.5,
                borderRadius:12,height:24,marginBottom:8,borderWidth:1,borderColor:color,backgroundColor:backgroundColor}}
                onPress={()=> this.props.onPress(model)}
                disabled = {!enable}
                key={this.props.index*1000 + i}>
                <Text style={{paddingLeft:12,paddingRight:12,color:color}}>{model.nf_name}{appendStr}</Text>
                </TouchableOpacity>)
                items.push(item)
            }

        }
        return(
            <View style={{width:screenWidth-42,flexWrap:'wrap',flexDirection:'row',marginTop:20}}>
                {items}
            </View>
        )
    }
}