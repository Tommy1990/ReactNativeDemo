import React,{Component} from 'react';
import {View,TouchableOpacity,Text,Image,FlatList} from 'react-native';
import BaseDimension from '../../Base/BaseDimension';
import REQUEST_URL from '../../Base/BaseWeb';
import fehchData from '../../Base/FetchData';
export default class NormalWorkTypeSelectPage extends Component{
    static navigationOptions ={
        header:null
    }
    constructor(props){
        super(props);
        this.state= {
            list:[]
        }
    }
    componentDidMount(){
        let list = this.props.navigation.getParam('list',[])
        if (list.length > 0){
            this.setState({
                list:list
            })
            return
        }
        this._fetchData()
    }
    _close = ()=>{
        this.props.navigation.goBack();
    }
    _fetchData = ()=>{
        let url = new REQUEST_URL()
        let companyId = this.props.navigation.getParam('companyId','');
        let para = {nf_companyId:companyId}
        fehchData(url.WORK_NORMAL_WORK_TYPE_LIST,para,(respond,err)=>{
            if(err !== null){
                alert(err.message)
            }else{
                let list=[]
                for (i=0;i<respond.length;i++){
                    if(respond[i].childList.length >0){
                        list.push(respond[i])
                    }
                }
                this.setState({
                    list:list
                })
            }
        })
    }
    _itemOnPress = (model)=>{
        let list = this.state.list
       for(i=0;i<list.length;i++){
           let temp = list[i]
           for (j=0;j<temp.childList.length;j++){
               temp.childList[j].selected = temp.childList[j].id == model.id
           }
       } 
       this.props.navigation.navigate('NormalCreate',{list:list,idStr:model.id,title:model.nf_workTypeName})
    }
    render(){
        let screen = new BaseDimension()
        let staueHeight = screen.getStatueHeight();
        let navHeight = screen.getNavHeight();
        let height = screen.getScreenHeight();
        return(
            <View style={{flex:1,backgroundColor:'#fff'}}>
            <View style={{width:'100%',height:navHeight-staueHeight,flexDirection:'row',marginTop:staueHeight,justifyContent:'space-between',alignItems:'center',borderBottomColor:'#eee',borderBottomWidth:1}}>
            <TouchableOpacity 
            onPress={()=> this._close()}
            style={{width:16,height:16,justifyContent:'center',alignItems:'flex-start',marginLeft:21}} 
            hitSlop={{top:10,right:10,left:10,right:10}}>
            <Image source={require('../../../img/close.png')} style={{width:12.5,hei:12.5}} resizeMode='contain'/>
            </TouchableOpacity>
            <Text style={{fontSize:16,fontWeight:'bold'}}>工作类型</Text>
            <TouchableOpacity 
            onPress= {()=> this._close()}
            style={{width:16,height:16,justifyContent:'center',alignItems:'flex-end',marginRight:21}} 
            hitSlop={{top:10,right:10,left:10,right:10}}>
            <Image source={require('../../../img/select.png')} style={{width:16.5,hei:11.5}} resizeMode='contain'/>
            </TouchableOpacity>
            </View>
            <FlatList
            style={{width:'100%',height:height-navHeight,backgroundColor:'#fff'}}
            data={this.state.list}
            renderItem = {({item})=>(
                <View style={{width:'100%',padding:21}}>
                <Text style={{color:'#333',fontSize:15}}>{item.nf_classificationName}</Text>
                <RenderItem list={item.childList} itemOnPress={this._itemOnPress}/>
                </View>
            )}
            keyExtractor = {({item,index})=>index}
            />

            </View>
        )
    }
}
class RenderItem extends Component{
    render(){
        let items = []
        for (i=0;i<this.props.list.length;i++){
            let model = this.props.list[i];
            let item =(<TouchableOpacity style={{justifyContent:"center",alignItems:"center",borderRadius:12,borderWidth:0.5,borderColor:model.selected?'#00a056':'#eee',
            backgroundColor:model.selected?'#00a056':'#fff',marginRight:13.5}}
            key={model.id}
            onPress={()=>{
                this.props.itemOnPress(model)
            }}>
            <Text style={{padding:14,paddingTop:5.5,paddingBottom:5.5,color:model.selected?'#fff':'#5b5b5b'}}>{model.nf_workTypeName}</Text>
            </TouchableOpacity>)
            items.push(item)
        }
        return(
            <View style={{flexWrap:'wrap',flexDirection:"row",display:'flex',width:'100%',marginTop:10}}>
            {items}
            </View>
        )
    }
}