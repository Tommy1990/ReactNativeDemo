import React,{Component} from 'react';
import {View,TouchableOpacity,Text,Dimensions,Image,ScrollView,Modal,TextInput,KeyboardAvoidingView} from 'react-native';
import {NavigationEvents} from 'react-navigation'
import REQUEST_URL from '../../Base/BaseWeb';
import fehchData from '../../Base/FetchData';
import DatePicker from 'react-native-datepicker';
import DateModel from '../../Base/DateModel';
import UserModel from '../../Base/UserModel';
export default class NormalWorkCreatePage extends Component{
    static navigationOptions = ({navigation})=>{
        return {
            headerTitle:(<Text style={{color:'#333',fontSize:16,fontWeight:'bold'}}>创建项目</Text>),
            headerBackImage:<Image source={require('../../../img/back.png')} style={{width:10,height:17,marginLeft:21.5}}/>,
            headerBackTitle:null
        }
    }
    constructor(props){
        super(props);
        this.state = {
            companyId:'',
            historyPersonModel:null,
            dataList:[{idStr:'',title:''},{idStr:'',title:''},{idStr:'',title:''},{idStr:'',title:''},{idStr:'',title:''},
            {idStr:'',title:''},{idStr:'',title:''},{idStr:'',title:''},{idStr:'',title:''},{idStr:'',title:''}],
            showModal1:false,
            showModal2:false,
            date:(new Date()),
            typeList:[],
            parksList:[],
            selectPark:null,
            materialList:[],
            personlist:[]
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
        let list = this.state.dataList 
        let nav = this.props.navigation;
        let index = nav.getParam('index',0)
        if (index ==1){
            let workTypeTitle = nav.getParam('title','');
            let workTypeId = nav.getParam('idStr','');
            let typesList = nav.getParam('list',[]);
            list[1].title = workTypeTitle
            list[1].idStr = workTypeId
            this.setState({
                typeList:typesList,
            })
        }
        if(index == 2){
            let farmIds = nav.getParam('farmIds','');
            let parksList = nav.getParam('parksList',[])
            let selectPark = nav.getParam('selectPark',null)
            let parkStr = nav.getParam('parkStr','')
            list[2].title = parkStr
            list[2].idStr = farmIds

            this.setState({
                selectPark:selectPark,
                parksList:parksList,
            })
        }
      
        if(index == 3){
            let materialIds = nav.getParam('materialIds','')
            let materialTitle = nav.getParam('materialTitle','')
            let materialList = nav.getParam('materialList',[])
            list[3].title = materialTitle
            list[3].idStr = materialIds 
            this.setState({
                materialList:materialList,
            })
        }
      
        if(index > 5){
            let personlist = nav.getParam('personList',[]);
            let participteIds = nav.getParam('participteIds','');
            let participteStr = nav.getParam('participteStr','');
            let ccIds = nav.getParam('ccIds','');
            let ccStr = nav.getParam('ccStr','');
            let auditId = nav.getParam('auditId','');
            let auditStr = nav.getParam('auditStr','')
            list[6].idStr = participteIds
            list[6].title = participteStr
            list[7].idStr = ccIds
            list[7].title = ccStr
            list[8].idStr = auditId
            list[8].title = auditStr
            this.setState({
                personlist:personlist,
            })
        }
      
      this.setState({
          list:list
      })
      
   }
    _itemPress = (index)=>{
       
        let list = this.state.dataList;
        this.setState({
            showModal1:index == 0 ,
            showModal2: index == 9
        })
        switch (index) {
            case 1:
            this.props.navigation.navigate('NormalWorkType',{idStr:list[1].idStr,index:1,
                companyId:this.state.companyId,list:this.state.typeList,title:list[1].title})
            break;
            case 2:
            this.props.navigation.navigate('NormalFarmSelect',{companyId:this.state.companyId,index:2,
                parksList:this.state.parksList,parkStr:'',farmIds:list[2].idStr,selectPark:this.state.selectPark})
            break
            case 3:
            this.props.navigation.navigate('NormalMaterialSelect',{companyId:this.state.companyId,index:3,
                materialList:this.state.materialList})
            break;
            case 6:
            case 7:
            case 8:
            this.props.navigation.navigate('NormalPersonSelect',{personlist:this.state.personlist,
                participteIds:list[6].idStr,ccIds:list[7].idStr,auditId:list[8].idStr,index:index,
                companyId:this.state.companyId});
            break;
            default:
            break;
        }

    }
    _hidenModal = ()=>{
        this.setState({
            showModal1:false,
            showModal2:false
        })
    }
    _titleCallBack = (value)=>{
        let list = this.state.dataList;
        list[0].title = value
        this.setState({
            dataList:list
        })
    }
    _desCallBack = (value)=>{
        let list = this.state.dataList;
        list[9].title = value
        this.setState({
            dataList:list
        })
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
                    <Text style={{color:list[2].title.length > 0? '#333':'#eee',marginRight:8,maxWidth:200,textAlign:'right'}} numberOfLines={99}>
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
                    <Text style={{color:list[3].title.length > 0? '#333':'#eee',marginRight:8,maxWidth:200,textAlign:'right'}}
                    numberOfLines={99}>
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
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                        <DatePicker
                        style={{width: 100}}
                        date={this.state.dataList[4].title}
                        placeholder = '请选择时间'
                        showIcon={false}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"   
                        maxDate={this.state.dataList[5].title}
                        confirmBtnText="确定"
                        cancelBtnText="取消"
                        customStyles={{dateInput:{
                            height:20,borderWidth:0
                        }}}
                        onDateChange = {(date)=> {
                            let list = this.state.dataList
                            list[4].title = date
                            this.setState({
                                dataList:list
                            })
                        }}
                    />
                    <Image source={require('../../../img/arrow_right.png')} 
                    style={{width:6.5,height:12}} resizeMode='contain'/>
                    </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
                    <Text>项目结束时间</Text>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                        <DatePicker
                        style={{width: 100}}
                        date={this.state.dataList[5].title}
                        placeholder = '请选择时间'
                        showIcon={false}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate={this.state.dataList[4].title}
                        confirmBtnText="确定"
                        cancelBtnText="取消"
                        customStyles={{dateInput:{
                            height:20,borderWidth:0
                        }}}
                        onDateChange = {(date)=> {
                            let list = this.state.dataList
                            list[5].title = date
                            this.setState({
                                dataList:list
                            })
                        }}
                    />
                    <Image source={require('../../../img/arrow_right.png')} 
                    style={{width:6.5,height:12}} resizeMode='contain'/>
                    </View>
                    </View>
                </BackView>
                <BackView>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',
                borderBottomWidth:1,borderBottomColor:'#eee',paddingBottom:8}}>
                    <Text>参与人</Text>
                    <TouchableOpacity 
                    onPress={()=> this._itemPress(6)}
                    style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                    <Text style={{color:list[6].title.length > 0? '#333':'#eee',marginRight:8,maxWidth:200}}>
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
                   <Text style={{color:list[7].title.length > 0? '#333':'#eee',marginRight:8,maxWidth:200}}>
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
                    <Text style={{color:list[8].title.length > 0? '#333':'#eee',marginRight:8,maxWidth:200}}>
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
                <DatePicker
                    style={{width: 200}}
                    date={new Date()}
                    showIcon={false}
                    hideText={true}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2019-05-01"
                    maxDate="2019-06-01"
                    confirmBtnText="确定"
                    cancelBtnText="取消"
                    customStyles={{
                    }}
                    onDateChange={(date) => { alert(JSON.stringify(date))}}
                />
                </ScrollView>
                <TouchableOpacity 
                onPress = {()=> this._submit()}
                style={{width:'100%',height:50,backgroundColor:'#00a056',shadowColor:'#00a05633',shadowOpacity:0.2,shadowOffset:{x:1,y:1},
                position:'absolute',bottom:10,left:0,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#fff'}}>确认</Text>
                </TouchableOpacity>
                <ModalView show={this.state.showModal1} 
                close={this._hidenModal} 
                limit = {50}
                title='项目名称'
                callBack = {this._titleCallBack}
                value={this.state.dataList[0].title}/> 
                <ModalView show={this.state.showModal2} 
                close={this._hidenModal} 
                limit = {150}
                title='项目描述'
                callBack = {this._desCallBack}
                value={this.state.dataList[9].title}/> 
            </View>
        )
    }
    _submit = async()=>{
        let model = new UserModel()
        let userid = await model.getUserID()
        let list = this.state.dataList;
        let errorMsg = ''
        
        if (list[0].title.length == 0){
            errorMsg = '项目名称不能为空'
        } else if(list[1].idStr.length == 0){
            errorMsg = '项目类型不能为空'
        } else if (list[2].idStr.length == 0){
            errorMsg = '工作地块不能为空'
        } else if (list[4].title.length == 0){
            errorMsg = '项目开始时间不能为空'
        }else if (list[5].title.length == 0){
            errorMsg = '项目结束时间不能为空'
        }else if (list[8].idStr.length == 0){
            errorMsg = '审批人不能为空'
        }else if (list[9].title.length == 0){
            errorMsg = '项目描述不能为空'
        }

        if(errorMsg.length !== 0){
            alert(errorMsg)
            return
        }
        
        let date = new DateModel()
        let startTime = date.getTimeSmaple(list[4].title)
        let endTime = date.getTimeSmaple(list[5].title) + 24*3600 -1
        let para = {
            nf_companyId:this.state.companyId,
            nf_proName:list[0].title,
            nf_workTypeId:list[1].idStr,
            nf_parkId:this.state.selectPark.id,
            nf_plotId:list[2].idStr,
            nf_materielId:list[3].idStr,
            nf_beginTime:startTime,
            nf_endTime:endTime,
            nf_joinUserId:list[6].idStr + userid,
            nf_sendUserId:list[7].idStr,
            nf_auditUserId:list[8].idStr,
            nf_note:list[9].title
        }
        let url = new REQUEST_URL()
        fehchData(url.WORK_NORMAL_CREATE_PROJECT,para,(respond,err)=>{
            if(err !== null){
                alert(err.message)
            }else{
                this.props.navigation.goBack();
            }
        })
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
class ModalView extends Component{
    constructor(props){
        super(props);
        this.state={
            text:'',behavior:'padding'
        }
    }
    _inputTextChanged = (value)=>{
        this.setState({
            text:value
        })
       
    }
    render(){
        let {width} = Dimensions.get('window');
        return(<Modal
            animationType='slide'
            visible={this.props.show}
            transparent={true} >
            <KeyboardAvoidingView behavior={this.state.behavior} style={{flex:1,backgroundColor:'#33333333',alignItems:'center',justifyContent:'center'}}>
            <View style={{width:width-45,height:284,borderRadius:10,backgroundColor:'#fff',position:'relative',
            alignItems:'center'}}>
            <TouchableOpacity 
            onPress = {()=> this.props.close()}
            style={{position:'absolute',top:17.5,right:17.5,width:20,height:20}} 
            hitSlop={{left:15,right:15,top:15,bottom:15}}>
            <Image style={{width:10.5,height:10.5}} source={require('../../../img/close.png')} resizeMode='contain'/>
            </TouchableOpacity>
            <Text style={{color:'#333',marginTop:17}}>{this.props.title}</Text>
            <TextInput
            multiline = {true}
            autoFocus = {true}
            defaultValue={this.props.value}
            maxLength = {this.props.limit}
            multiline = {true}
            value = {this.state.text}
            onChangeText = {(value)=> this._inputTextChanged(value)}
            placeholder = '请输入内容'
            style={{width:'80%',height:160,marginTop:18,borderWidth:0.5,borderColor:'#eee'}}
            />
            <View style={{width:'80%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:19.5}}>
            <TouchableOpacity 
            style={{width:100,height:35,justifyContent:'center',alignItems:'center',borderRadius:10,
            backgroundColor:'#eee',marginLeft:13.5}}
            onPress={()=> this.props.close()}>
            <Text>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={{width:100,height:35,justifyContent:'center',alignItems:'center',borderRadius:10,
            backgroundColor:'#00a056',marginRight:13.5}}
            onPress={()=> {
                this.props.callBack(this.state.text);
                this.props.close()
            }}>
            <Text style={{color:'#fff'}}>确定</Text>
            </TouchableOpacity>
            </View>
            </View>
            </KeyboardAvoidingView>
        </Modal>
        )
    }
}