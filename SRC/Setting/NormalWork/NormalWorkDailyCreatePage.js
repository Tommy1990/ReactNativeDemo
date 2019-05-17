import React,{Component} from 'react';
import {View,ScrollView,KeyboardAvoidingView,TouchableOpacity,Text,TextInput,Image,ActivityIndicator} from'react-native';
import REQUEST_URL from '../../Base/BaseWeb';
import fehchData from '../../Base/FetchData';
import BaseDimension from '../../Base/BaseDimension';
import {NavigationEvents} from 'react-navigation'
import ImagePicker from 'react-native-image-crop-picker'
import UploadFile from '../../Base/UpLoadFile'
import Modal from 'react-native-modal'
export default class NormalWorkDailyCreatePage extends Component{
    static navigationOptions = ({navigation})=>{
        return {
            headerTitle:(<Text style={{fontSize:18,color:'#333'}}>写日志</Text>),
            headerBackImage:<Image source={require('../../../img/back.png')} style={{width:10,height:17,marginLeft:21.5}}/>,
            headerBackTitle: null,
        }
    }
    constructor(props){
        super(props)
        this.state = {
            model:null,
            projectId:'',
            picList:[],
            picStrList:[],
            nf_workHouse:0,
            nf_workContent:'',
            nf_mechanicalHouse:0,
            nf_plotId:'',
            nf_materielId:[],
            nf_seedlingId:[],
            seedStr:'',
            materialStr:'',
            nf_img:'',
            showLoading:false
        }
    }
    componentDidMount(){
        let projectId = this.props.navigation.getParam('projectId','')
        this.setState({
            projectId:projectId
        });
        this._fetchDetails(projectId);
    }
    _setData = ()=>{
        let plotList = this.props.navigation.getParam('nf_plotId',[]);
        let seedings = this.props.navigation.getParam('seedings',[]);
        let parkStr  = this.props.navigation.getParam('parkStr','')
        if (plotList.length > 0){
            let model = this.state.model
            model.nf_plotId = plotList
            this.setState({
                model:model,
                nf_seedlingId:seedings,
                seedStr:parkStr
            })
        } 
        let nf_materielId = this.props.navigation.getParam('nf_materielId',[]);
        let materielStr = this.props.navigation.getParam('materielStr','')
        if(nf_materielId.length > 0){
            this.setState({
                nf_materielId:nf_materielId,
                materialStr:materielStr,
            })
        }
    }
    _fetchDetails = (projectId)=>{
        let base = new REQUEST_URL()
        let para = {id:projectId}
        fehchData(base.WORK_NORMAL_DAILY_DATAILS_FETCH,para,(respond,err)=>{
            if(err !== null){
                alert(err.message)
            }else{
                this.setState({
                    nf_plotId:respond.nf_parkId.id,
                    model:respond,
                })
            }
        })
    }
    _workHourInput = (value)=>{
        this.setState({
            nf_workHouse:value
        })
    }
    _machineHourInput = (value)=>{
        this.setState({
            nf_mechanicalHouse : value
        })
    }
    _parkSelectpress = ()=>{
        if (this.state.model == null){
            alert('地块为空,正在重新获取')
            this._fetchDetails(this.state.projectId)
            return
        }
        this.props.navigation.navigate('NormalDailyParkSelect',
        {parkModel:this.state.model.nf_parkId,seedings:this.state.nf_seedlingId,
            nf_plotId:this.state.model.nf_plotId})
    }
    _materialSelectPress = ()=>{
        if (this.state.model == null){
            alert('地块为空,正在重新获取')
            this._fetchDetails(this.state.projectId)
            return
        }
        this.props.navigation.navigate('NormalDailyMaterialSelect',
        {materilList:this.state.model.nf_materielId,nf_materielId:this.state.nf_materielId})
    }
    _contentInput = (text)=>{
        this.setState({
            nf_workContent:text
        })
    }
    _contentInputBegin = ()=>{
        this._scrollView.scrollToEnd()
    }
    _uploadPics = ()=>{
        let pics = this.state.picList
        if(pics.length == 0 || this.state.nf_img.length>5){
            this._submitdaily();
            return
        }
        this.setState({
            showLoading:true
        })
        UploadFile(pics,'image/jpeg','jpeg',async(respond,err)=>{
            if(err !== null){
               await this.setState({
                    showLoading:false
                })
                alert(err.message)
            }else{
               let list = []
               for (i=0;i<respond.data.length;i++){
                   list.push(respond.data[i].ossInfo.ossUrl)
               }
                await this.setState({
                    nf_img:JSON.stringify(list)
                })
                this._submitdaily();
            }
        })
    }
    _submitdaily = ()=>{
        let base = new REQUEST_URL()
        let para = {
            id:this.state.projectId,
            nf_workHouse:this.state.nf_workHouse,
            nf_workContent:this.state.nf_workContent,
            nf_mechanicalHouse:this.state.nf_mechanicalHouse,
            nf_img:this.state.nf_img,
            nf_plotId:this.state.nf_plotId,
            nf_materielId:this.state.nf_materielId,
            nf_seedlingId:this.state.nf_seedlingId,
        }
        fehchData(base.WORK_NORMAL_DAILY_CREATE,para, async(respond,err)=>{
            if(err !== null){
                await this.setState({
                    showLoading:false
                })
                alert(err.message)
            }else{
                await this.setState({
                    showLoading:false
                })
                this.props.navigation.goBack()
            }
        })
    }
    _addPicPress = ()=>{
        let num = 5 - this.state.picList.length
        ImagePicker.openPicker({
            multiple:false,
           cropperCancelText:'取消',
           cropperChooseText:'确定',
           maxFiles:num,
           multiple:true,
           compressImageQuality:0.5,
           showsSelectedCount:true,
           mediaType:'photo',
        }).then((list)=>{
            let pathList = this.state.picList
            for(i=0;i<list.length;i++){
                pathList.push(list[i].path)
            }
            this.setState({
                picList:pathList
            })
        })
    }
    _deletePicPress = (index) => {
        let pathList = this.state.picList    
        pathList.splice(index,1)   
        this.setState({
            picList:pathList
        })
    }
    _submitData = ()=>{
        let des = ''
        if (this.state.nf_workHouse.length == 0){
            des='请输入工时'
        }else if(this.state.nf_plotId.length == 0){
            des = '请选择作业地块'
        }else if (this.state.nf_workContent.length == 0){
            des = '请输入工作内容'
        }
        if(des.length > 0){
            alert(des)
        }else{
            this._uploadPics();
        }
    }
    render(){
        let screen = new BaseDimension()
        let screenWidth = screen.getScreenWidth();
        let picViewList = []
        let picList = this.state.picList;
        for(i=0;i<picList.length;i++){
            let index = i;
            let pic = (<View key={(i+1)*100}
                style={{position:'relative',width:76,height:76,marginRight:9,marginBottom:25,
                     alignItems:'flex-start',justifyContent:'flex-end'}}>
                <TouchableOpacity 
                onPress = {()=>{
                    this._deletePicPress(index)
                }}
                hitSlop={{top:10,left:10,bottom:10,right:10}}
                style={{position:'absolute',top:10,right:10}}>
                <Image source={require('../../../img/delete_red.png')} 
                resizeMode='contain'
                style={{width:13.5,height:13.5}}></Image>
                </TouchableOpacity>
                <Image source={{uri:picList[i]}} 
                resizeMode='contain'
                style={{width:60,height:60,borderRadius:5}}/>
            </View>)
            picViewList.push(pic)
        }
        if(picViewList.length < 5){
            let addBtn = (<View key='addbtn'
            style={{width:76,height:76,alignItems:'flex-start',justifyContent:'flex-end'}}>
            <TouchableOpacity
            onPress = {()=> this._addPicPress()}
             style={{width:60,height:60,borderColor:'#888',borderWidth:1,borderRadius:5,
            alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#888',fontSize:10}}>+添加图片</Text>
            </TouchableOpacity>
            </View> )
            picViewList.push(addBtn)
        }
        let parkStr = this.state.seedStr.length > 0 ? this.state.seedStr :'请选择'
        return(<View style={{flex:1,position:'relative'}}>
            <NavigationEvents onDidFocus={(payload)=> this._setData()}/>
            <KeyboardAvoidingView style={{flex:1}} behavior='height'>
               <ScrollView ref = {component => this._scrollView = component}
               style={{flex:1}}>
                   <View key='worktime'
                   style={{width:screenWidth-42,marginLeft:21,borderRadius:10,height:45,marginTop:12,
                   shadowColor:'#333',shadowOffset:{width:0,height:3},shadowRadius:3,shadowOpacity:0.3,elevation:2,
                    flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#fff'}}>
                    <Text style={{marginLeft:18}}>*用工量:</Text>
                    <View style={{flexDirection:'row',alignItems:'center',marginRight:18}}>
                    <TextInput
                    onChangeText = {(value)=> this._machineHourInput(value)}
                    placeholder='请输入工时'
                    keyboardType = 'numeric'
                    style={{width:90,height:20}}>
                    </TextInput>
                    <Text style={{marginLeft:8}}>小时</Text>
                    </View>
                    </View>
                    <View key='farm'
                    style={{width:screenWidth-42,marginLeft:21,borderRadius:10,marginTop:18,paddingBottom:18,
                    shadowColor:'#333',shadowOffset:{width:0,height:3},shadowRadius:3,shadowOpacity:0.3,elevation:2,
                    flexDirection:'row',justifyContent:'space-between',backgroundColor:'#fff'}}>
                    <Text style={{marginLeft:18,marginTop:12}}>*今日工作地块:</Text>
                    < TouchableOpacity 
                    onPress = {()=> this._parkSelectpress()}
                    style={{flexDirection:'row',alignItems:'center',marginRight:18,marginTop:12}}>
                    <Text style={{color:'#555',maxWidth:180}}  numberOfLines={99} ellipsizeMode='tail'
                    >{parkStr}</Text>
                    <Image source={require('../../../img/arrow_right.png')}  resizeMode='contain'
                    style={{width:6.5,height:12,marginLeft:12}}></Image>
                    </TouchableOpacity>
                    </View>
                    <View key="material"
                    style={{width:screenWidth-42,marginLeft:21,borderRadius:10,marginTop:12,paddingBottom:18,
                    shadowColor:'#333',shadowOffset:{width:0,height:3},shadowRadius:3,shadowOpacity:0.3,elevation:2,
                    flexDirection:'row',justifyContent:'space-between',backgroundColor:'#fff'}}>
                    <Text style={{marginLeft:18,marginTop:12}}>物料使用:</Text>
                    < TouchableOpacity 
                    onPress = {()=> this._materialSelectPress()}
                    style={{flexDirection:'row',alignItems:'center',marginRight:18,marginTop:12}}>
                    <Text style={{color:'#555',maxWidth:180}}>
                    {this.state.materialStr.length>0?this.state.materialStr:'请选择'}</Text>
                    <Image source={require('../../../img/arrow_right.png')}  resizeMode='contain'
                    style={{width:6.5,height:12,marginLeft:12}}></Image>
                    </TouchableOpacity>
                    </View>
                    <View key = 'machine'
                    style={{width:screenWidth-42,marginLeft:21,borderRadius:10,height:45,marginTop:12,
                   shadowColor:'#333',shadowOffset:{width:0,height:3},shadowRadius:3,shadowOpacity:0.3,elevation:2,
                    flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#fff'}}>
                    <Text style={{marginLeft:18}}>今日机械台班:</Text>
                    <View style={{flexDirection:'row',alignItems:'center',marginRight:18}}>
                    <TextInput
                    onChangeText = {(value)=> this._workHourInput(value)}
                    placeholder='请输入台班'
                    keyboardType='numeric'
                    style={{width:90,height:20}}>
                    </TextInput>
                    <Text style={{marginLeft:8}}>小时</Text>
                    </View>
                    </View>
                    <View key = 'pic'
                    style={{width:screenWidth-42,marginLeft:21,borderRadius:10,marginTop:12,
                   shadowColor:'#333',shadowOffset:{width:0,height:3},shadowRadius:3,shadowOpacity:0.3,elevation:2,
                    flexDirection:'row',backgroundColor:'#fff'}}>
                    <Text style={{marginLeft:18,marginTop:17}}>工作照片:</Text>
                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:10,marginRight:18,flexWrap:'wrap',
                        width:screenWidth - 107 - 10,marginTop:7,marginBottom:20}}>
                    {picViewList}
                    </View>
                    </View>
                    <View key = 'content'
                    style={{width:screenWidth-42,marginLeft:21,borderRadius:10,marginTop:12,marginBottom:200,
                   shadowColor:'#333',shadowOffset:{width:0,height:3},shadowRadius:3,shadowOpacity:0.3,elevation:2,
                    flexDirection:'row',justifyContent:'space-between',backgroundColor:'#fff'}}>
                    <Text style={{marginLeft:18,marginTop:17}}>*工作内容:</Text>
                    
                    <TextInput
                    onChangeText = {(value)=> this._contentInput(value)}
                    placeholder='请输入工作内容'
                    multiline = {true}
                    numberOfLines = {99}
                    maxLength = {150}
                    onFocus = {()=> this._contentInputBegin()}
                    style={{width:screenWidth-133-33,height:98,marginTop:17,marginRight:18,marginBottom:18,textAlignVertical:'top',
                    borderRadius:5,borderWidth:0.5,borderColor:'#888',padding:12}}>
                    </TextInput>
                    </View>
                </ScrollView> 
            </KeyboardAvoidingView>
            <TouchableOpacity 
            onPress = {()=> this._submitData()}
            style={{position:'absolute',left:0,bottom:10,width:'100%',height:50,
                backgroundColor:'#00a056',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#fff'}}>发布</Text>
            </TouchableOpacity>
            <Modal isVisible={this.state.showLoading} backdropColor='#fff' style={{justifyContent:'center',alignItems:'center'}}>
                 <ActivityIndicator color='#555'></ActivityIndicator>
            </Modal>
        </View>)
    }
}