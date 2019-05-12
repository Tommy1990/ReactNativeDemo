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
                navigation.goBack();
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
            list:[]
        })
    }
    _textChanged = (value)=>{
        let url = new REQUEST_URL()
        let para = {nf_companyId:this.state.companyId,materielName:value}
        fehchData(url.WORK_NORMAL_MATERIALS,para,(respond,err)=>{
            if(err !== null){
                alert(err.message)
            }else{
                
                for(i=0;i<respond.length;i++){
                    for(j=0;j<this.state.list;j++){
                        respond[i].selected = false
                        if(this.state.list[j].id == respond[i].id){
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
    render(){
        let screen = new BaseDimension()
        let screenWidth = screen.getScreenWidth();
        let items = []
        for(i=0;i<this.state.tempList.length;i++){
            let model = this.state.tempList[i];
            let item = (<TouchableOpacity 
            onPress = {()=> this._selectMaterial(model)}>
                <Text style={{color: model.selected?'#00a056':'#333'}}>{model.nf_materielName}-{model.nf_specificationsName}-{model.nf_manufactorName}</Text>
            </TouchableOpacity>)
            items.push(item)
        }
        return(<View style={{flex:1,justifyContent:'flex-start',alignItems:'center',position:'relative'}}>
                    <TextInput 
                autoFocus={false}
                onFocus = {()=> DeviceEventEmitter.emit('showView')}
                placeholder="请输入物料名称"
                onChangeText = {(value)=> this._textChanged()}
                style={{width:screenWidth-42,height:35,borderColor:'#333', paddingLeft:12,marginTop:20,
                borderWidth:1,borderRadius:10}}></TextInput> 
           <View style={{width:screenWidth-42,height:30,alignItems:'center',justifyContent:'space-between',flexDirection:'row',marginTop:20}}>
               <Text style={{width:97,textAlign:'center'}}>名称</Text>
               <Text style={{width:39,textAlign:'center'}}>规格</Text>
               <Text style={{width:98+31+14,textAlign:'center'}}>厂商</Text>
           </View>
           <FlatList
            data={this.state.list}
            renderItem={({item})=>(
                <View style={{width:screenWidth-42,height:30,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
                <Text style={{width:100,textAlign:'center'}}>名称</Text>
                <Text style={{width:40,textAlign:'center'}}>规格</Text>
                <Text style={{width:100,textAlign:'center'}}>厂商</Text>
                <TouchableOpacity style={{width:14,height:14}} 
                hitSlop={{left:10,right:10,top:5,bottom:5}}>
                <Image source={require('../../../img/delte_btn.png')} style={{width:14,height:14}} resizeMode='contain'/>
                </TouchableOpacity>
                </View>
            )}
            keyExtractor ={({item,index})=> index}
           />
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
        return(<Animated.ScrollView style={{...this.props.style,height:this.state.animatedHeight,width:width-42,backgroundColor:'#fff'
        }}>
        <View style={{borderColor:'#333',borderWidth:1,borderRadius:10,width:'100%',height:157,
        backgroundColor:'#fff',justifyContent:'flex-start',alignItems:'center'}}>
        {this.props.children}
        </View>
        </Animated.ScrollView>)
    }
}