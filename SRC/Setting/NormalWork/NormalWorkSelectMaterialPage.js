import React,{Component} from 'react';
import {View,Text,TouchableOpacity,Animated,ScrollView,TextInput,Image,FlatList,DeviceEventEmitter} from 'react-native';
import BaseDimension from '../../Base/BaseDimension';
import REQUEST_URL from '../../Base/BaseWeb';
import fehchData from '../../Base/FetchData';
export default class NormalWorkSelectMaterialPage extends Component{
    static navigationOptions = ({navigation}) =>{
        return({
            headerTitle:<Text style={{color:'#333',fontSize:18}}>物料范围</Text>,
            headerBackImage:<Image source={require('../../../img/close.png')} style={{width:12.5,height:12.5,marginLeft:21}} resizeMode='contain'/>,
            headerRight:(<TouchableOpacity style={{marginRight:21}} 
            hitSlop={{top:20,bottom:20,right:20,left:20}}
            onPress={()=>{
               DeviceEventEmitter.emit('materialsubmit');
            }}> 
                <Image source={require('../../../img/select.png')} style={{width:16.5,height:11.5}} resizeMode='contain'/>
            </TouchableOpacity>)
        })
    }
    constructor(props){
        super(props)
        this.state = {
            list:[],
            companyId:'',
            tempList:[]
        }
    }
    componentDidMount(){
        let companyId = this.props.navigation.getParam('companyId','')
        let list = this.props.navigation.getParam('materialList',[])
        this.setState({
            companyId:companyId,
            list:list
        })
        this.listener = DeviceEventEmitter.addListener("materialsubmit",()=>{
            let idStr = ''
            let titleStr = ''
            let list = this.state.list;
            for(i=0;i<list.length;i++){
                idStr += list[i].id + ','
                titleStr += list[i].nf_materielName + ','
                if(i== list.length-1){
                    idStr = idStr.slice(0,idStr.length-1)
                    titleStr = titleStr.slice(0,titleStr.length-1)
                }
            }
            this.props.navigation.navigate('NormalCreate',
            {materialList:list,materialIds:idStr,materialTitle:titleStr})
        })
    }
    componentWillMount(){
        if(this.listener){
            this.listener.remove()
        }
    }
    _textChanged = (value)=>{
        if(value.length == 0){
            DeviceEventEmitter.emit('hiddenView')
            return
        }else{
            DeviceEventEmitter.emit('showView')
        }
        let url = new REQUEST_URL()
        let para = {nf_companyId:this.state.companyId,materielName:value}
        fehchData(url.WORK_NORMAL_MATERIALS,para,(respond,err)=>{
            if(err !== null){
                alert(err.message)
            }else{
                let list = this.state.list
                for(i=0;i<respond.length;i++){
                    respond[i].selected = false
                    for(j=0;j<list.length;j++){
                        if(list[j].id == respond[i].id){
                            respond[i].selected = true;
                            break;
                        }
                    }
                }
                this.setState({
                    tempList:respond
                })
            }
        })
    }
    _selectMaterial = (model)=>{
        DeviceEventEmitter.emit('hiddenView')
        this.setState({
            tempList:[]
        })
        this._input.clear();
        let list = this.state.list;
        if (list.length == 0){
            list.push(model)
        }else{
            for(i=0;i<list.length;i++){
                if(list[i].id == model.id){
                    break
                }
                if(i == list.length -1){
                    list.push(model);
                }
            }
        }
        this.setState({
            list:list
        })
    }
    _deletematerial = (model)=>{
        let list = this.state.list
        for(i=0;i<list.length;i++){
            if(list[i].id == model.id){
                list.splice(i,1)
                break;
            }
        }
        this.setState({
            list:list
        })
    }
    render(){
        let screen = new BaseDimension()
        let screenWidth = screen.getScreenWidth();
        let screenHeight = screen.getScreenHeight();
        let naviHeight = screen.getNavHeight();
        let items = []
        for(i=0;i<this.state.tempList.length;i++){
            let model = this.state.tempList[i];
            let item = (<TouchableOpacity 
                key={i}
            onPress = {()=> this._selectMaterial(model)}>
                <Text style={{color: model.selected?'#00a056':'#333',marginBottom:8}}>
                {model.nf_materielName}-{model.nf_specificationsName}-{model.nf_manufactorName}</Text>
            </TouchableOpacity>)
            items.push(item)
        }
        return(<View style={{flex:1,justifyContent:'flex-start',alignItems:'center',position:'relative'}}>
                    <TextInput ref={component => this._input = component}{...this.props}
                autoFocus={false}
                onFocus = {()=> DeviceEventEmitter.emit('showView')}
                placeholder="请输入物料名称"
                onChangeText = {(value)=> this._textChanged(value)}
                style={{width:screenWidth-42,height:35,borderColor:'#333', paddingLeft:12,marginTop:20,
                borderWidth:1,borderRadius:10}}></TextInput> 
           <View style={{width:screenWidth-42,height:30,alignItems:'center',justifyContent:'space-between',flexDirection:'row',marginTop:20}}>
               <Text style={{width:97,textAlign:'center'}}>名称</Text>
               <Text style={{width:39,textAlign:'center'}}>规格</Text>
               <Text style={{width:98+31+14,textAlign:'center'}}>厂商</Text>
           </View>
           <View style={{width:'100%',height:screenHeight-naviHeight-55-30-20,paddingLeft:21,paddingRight:21}}>
                <FlatList
                style={{flex:1}}
                data={this.state.list}
                renderItem={({item})=>(
                    <View style={{width:screenWidth-42,height:30,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
                    <Text style={{width:100,textAlign:'center'}}>{item.nf_materielName}</Text>
                    <Text style={{width:40,textAlign:'center'}}>{item.nf_specificationsName}</Text>
                    <Text style={{width:100,textAlign:'center'}}>{item.nf_manufactorName}</Text>
                    <TouchableOpacity style={{width:14,height:14}} 
                    onPress = {()=> this._deletematerial(item)}
                    hitSlop={{left:10,right:10,top:5,bottom:5}}>
                    <Image source={require('../../../img/delte_btn.png')} style={{width:14,height:14}} resizeMode='contain'/>
                    </TouchableOpacity>
                    </View>
                )}
                keyExtractor ={({item,index})=> index}
                />
           </View>
           
           <MaterialSelectView style={{position:'absolute',top:60,left:21}}>
                  {items}  
             </MaterialSelectView>
        </View>)
    }
}
class MaterialSelectView extends Component{
    constructor(props){
        super(props);
        this.state = {
            animatedHeight: new Animated.Value(0)
        }
    }
    componentDidMount(){
        this.listener = DeviceEventEmitter.addListener('showView',()=>{
            this._showView()
        })
        this.listener = DeviceEventEmitter.addListener('hiddenView',()=>{
            this._hiddenView()
        })
    }
    componentWillUnmount(){
        this.listener.remove()
    }
    _showView = ()=>{
        Animated.timing(this.state.animatedHeight,{
            toValue:157,
            duration:100
        }).start();
        
    }
    _hiddenView = ()=>{
        Animated.timing(this.state.animatedHeight,{
            toValue:0, duration:100
        }).start();
    }
    render(){
        let screen = new BaseDimension()
        let width = screen.getScreenWidth()
        return(<Animated.ScrollView 
            scrollEnabled = {false}
            style={{...this.props.style,height:this.state.animatedHeight,width:width-42,backgroundColor:'#fff'
        }}>
        <View style={{borderColor:'#333',borderWidth:1,borderRadius:10,width:'100%',height:157,
        backgroundColor:'#fff',justifyContent:'flex-start',alignItems:'flex-start',paddingTop:16.5,paddingLeft:14,paddingRight:19.5,paddingBottom:17.5}}>
        <ScrollView style={{flex:1}} showsHorizontalScrollIndicator = {false} showsHorizontalScrollIndicator={false}>
        {this.props.children}
        </ScrollView>
        </View>
        </Animated.ScrollView>)
    }
}