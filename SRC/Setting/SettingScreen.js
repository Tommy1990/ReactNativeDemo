import React,{Component} from 'react';
import {SafeAreaView,TouchableOpacity,View,Text,StyleSheet,Image,Dimensions} from 'react-native';
import UserModel from '../Base/UserModel';
import Modal from 'react-native-modal';

export default class SettingScreen extends Component{
    static navigationOptions =  ({navigation}) =>{
        return{
            
            headerBackTitle: null,
            headerLeft:(<TouchableOpacity style={{marginLeft:21}}
            onPress={()=> navigation.openDrawer()}
             hitSlop={{top:20,left:20,right:20,bottom:20}}>
                <Image source={require('../../img/mine.png')} style={{width:20,height:24}} resizeMode='contain'/>
            </TouchableOpacity>),
            headerTitle:<HeaderView/>,
            headerRight:(<TouchableOpacity onPress={()=> navigation.navigate('CompanySelect')}
            style={{marginRight:21}}
            hitSlop={{top:20,right:20,bottom:20,left:20}}>
                <Text>切换公司</Text>
            </TouchableOpacity>)
        }
    }
    constructor(props){
        super(props);
        this.state = {
            modelList:[],
        }
    }
    componentDidMount(){
        this._setData();
    }
    _setData = ()=>{
        let list = ['农业项目','普通项目','排行榜','日报','周报','签到','仓库','审批']
        var modelList = [];
        for(i=0;i< list.length;i++){
            let img = `work_normal_${i}` ;
            let model = {title:list[i],pic:img,id:i}
            model.touchable = i < 5;
            modelList.push(model);
        }
        let model = {id:9}
        modelList.push(model)
        this.setState({
            modelList:modelList
        })

    }

    render(){
        var items = []
        var num = 0
        if (this.state.modelList.length != 0){
             num = Math.ceil(this.state.modelList.length/3);
        }
       
        for (i=0;i<num ; i++){
            let list = this.state.modelList.slice(i*3,(i+1)*3);
            let item = <ColView tempList={list} key={i} itemclick={this._jumpToSelectItem}></ColView>
            items.push(item)
        }
        return (<SafeAreaView style={[styles.container,{justifyContent:'flex-start',backgroundColor:'#fff'}]}>
        {items}
        </SafeAreaView>)
    }
    _jumpToSelectItem = (model)=>{
        
        if (model.id == 0){
            this.props.navigation.navigate('Normalwork');
        }
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#eee',
        alignItems:'center',
        justifyContent:'center',
    },
    button:{
        justifyContent:'center',
        padding:10,
    },
    text:{
        color:'#333',
        fontSize:20,
        backgroundColor:'#ddd'
    },

})
//行视图
class ColView extends Component{
    _jumpToSelectItem = (model) =>{
        this.props.itemclick(model);
    }
    render(){
        const {width,height} = Dimensions.get('window');
        cellWidth = (width - 1)/3;
        cellHeight = 144.5;
        var items = []
        var list = []
        if (this.props.tempList !== null){
            list = this.props.tempList;
        }
        for (i = 0;i<list.length;i++){
            let model = list[i];
            let img = {uri:model.pic}
            let str = model.title;
            var item = (<TouchableOpacity style={{width:cellWidth,height:cellHeight,borderRightColor:'#d5d5d5',borderRightWidth:1,backgroundColor:'#fff',
            justifyContent:'flex-start',alignItems:'center'}} 
            onPress = {()=>this._jumpToSelectItem(model)}
            key={i}
            disabled = {!model.touchable}>
            <View style={{width:52.5,height:51,marginTop:29.5,backgroundColor:'#eee'}}>
            <Image source={img} style={{width:52.5,height:51}}></Image></View>
                
                <Text style ={{color:'#333',fontSize:16,fontWeight:'bold',marginTop:16}}>{str}</Text>
            </TouchableOpacity>)
            if (model.id === 9){
                item = (<View style = {{width:cellWidth,height:cellHeight,justifyContent:'center',alignItems:'center'}} key={9}>
               <Text>敬请期待...</Text>
                </View>)
            }
            items.push(item)
        }
        return(
            <View style={{width:'100%',height:144.5,borderBottomColor:'#d5d5d5',borderBottomWidth:1,marginBottom:1,
            backgroundColor:'#fff',
            flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>{items}</View>
        )
    }
}

//顶部视图
class HeaderView extends Component{
    _setCompany = async() =>{
        let model = new UserModel();
        let company = await model.getDefaultCompany();
        console.log(`1234567890===${JSON.stringify(company)}`);
        this.setState({
            company:company
        })
        
    }
   
    constructor(props){
        super(props);
        this.state={
            company:null
        }
    }
    componentDidMount(){
        this._setCompany();
    }
    
    render(){
        var companyName = ''
        if (this.state.company !== null){
            companyName = this.state.company.simpleName
        }
        return (
            <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#333',fontSize:18,fontWeight:'bold'}}>{companyName}</Text>
            </View>
            
        ) 
    }
}
