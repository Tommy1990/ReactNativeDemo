import React,{Component} from 'react';
import {View,Image,TouchableOpacity,FlatList,TextInput,DeviceEventEmitter,Text} from 'react-native';

export default class NormalWorkDailySelectMaterialPage extends Component{
    static navigationOptions = ({navigation})=>{
        return {
            headerTitle:(<Text style={{fontSize:18,color:'#333'}}>请选择工作园区及苗木</Text>),
            headerBackImage:<Image source={require('../../../img/close.png')} style={{width:12.5,height:12.5,marginLeft:21.5}}/>,
            headerBackTitle: null,
            headerRight:(<TouchableOpacity hitSlop={{top:10,right:10,bottom:10,left:10}}
                onPress = {()=>{
                    DeviceEventEmitter.emit('submit');
                }}
            style={{marginRight:21}}>
                <Image style={{width:16.5,height:11.5}} resizeMode='contain' source={require('../../../img/select.png')}/>
            </TouchableOpacity>)
        }
    }
    constructor(props){
        super(props);
        this.state = {
            list:[],
            nf_materielId:[],
        }
    }
    componentDidMount(){
        let list = this.props.navigation.getParam('materilList',[])
        let nf_materielId = this.props.navigation.getParam('nf_materielId',[])
        if (list.length > 0){
            for(i=0;i<list.length;i++){
                list[i].number = ''
            }
            for(i=0;i<nf_materielId.length;i++){
                for(j=0;j<list.length;j++){
                    if(list[j].id == nf_materielId[i].id){
                        list[j].number = nf_materielId[i].number;
                        break
                    }
                }
            }
           
            this.setState({
                list:list,
                nf_materielId:nf_materielId
            })
        }
        this.listener = DeviceEventEmitter.addListener('submit',()=>{
            let list = this.state.list
            let temp = []
            let str = ''
            for(i=0;i<list.length;i++){
                if(list[i].number*1 > 0){
                    let model = {id:list[i].id,number:list[i].number}
                    temp.push(model)
                    str += list[i].nf_manufactorName + '-' + list[i].nf_materielName + ' ' + list[i].number + ' ' + list[i].nf_meteringName + `\n`                }
            }
            str = str.slice(0,str.length-1)
            this.props.navigation.navigate('NormalDailyCreate',{
                nf_materielId:temp,
                materielStr:str
            })
        })
    }
    componentWillUnmount(){
        this.listener.remove()
    }
    _inputvaluechanged = (model,value)=>{
        let strList = value.split('.')
        for(i=0;i<strList.length;i++){
            if(i==0){
                value = strList[0] + '.'
            }else{
                value += strList[i];
            }

        }
        let list = this.state.list
        for(i=0;i<list.length;i++){
            if(list[i].id == model.id){
                list[i].number = value*1
            }
        }
    }
    render(){
        let list = this.state.list
        return(<View style={{flex:1}}>
            <FlatList
            data = {list}
            renderItem={({item})=>(
                <View style={{width:'100%',height:71,paddingLeft:32,paddingRight:32,marginTop:12}}>
                    <View style={{borderBottomColor:'#e1e1e1',borderBottomWidth:1,flexDirection:'row',
                        justifyContent:'space-between',alignItems:'center',paddingBottom:12}}>
                        <View style={{maxWidth:170}}>
                            <Text>{item.nf_specificationsName}-{item.nf_materielName}</Text>
                            <Text style={{marginTop:12}}>{item.nf_manufactorName}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <TextInput
                        onChangeText = {(value)=>{
                            this._inputvaluechanged(item,value)
                        }}
                        defaultValue = {`${item.number}`}
                        keyboardType = 'numeric'
                        placeholder='请输入使用量'
                        style={{width:90,textAlign:'center'}}/>
                        <Text>{item.nf_meteringName}</Text>
                        </View>
                    </View>
                </View>
            )}
            keyExtractor = {({index})=>index}
            style={{flex:1,marginTop:11}}/>
        </View>)
    }
}