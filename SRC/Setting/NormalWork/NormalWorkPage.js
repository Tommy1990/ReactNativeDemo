import React,{Component} from 'react';
import {SafeAreaView,View,ScrollView,FlatList,TouchableOpacity,Text,Image,DeviceEventEmitter,Animated} from 'react-native';
import UserModel from '../../Base/UserModel';
import Modal from 'react-native-modal';

export default class NormalWorkPage extends Component{
   
    static navigationOptions = ({navigation}) => { 
        return {
            headerTitle:<HeaderView/>,
            headerBackImage:<Image source={require('../../../img/back.png')} style={{width:10,height:17,marginLeft:21.5}}/>,
            headerRight:(<TouchableOpacity hitSlop = {{left:20,right:20,top:20,bottom:20}}
                style={{marginRight:21.75}}
            onPress = {()=>{
                alert(navigation.getParam('company',''))
            }}
            ><Text style={{color:'#333',fontSize:14}}>筛选</Text></TouchableOpacity>)
        }
    }
    constructor(props){
        super(props);
        this.state = {
            selectCompany:null,
            showCompanyListView:false,
        }
    }
    componentDidMount(){
         this.listener = DeviceEventEmitter.addListener('showCompanyList',(e)=>{
            if (e !== null){
               this.setState({
                   selectCompany:e,
                   showCompanyListView:true,
               })
            }
        })
    }
    componentWillUnmount(){
        this.listener.remove();
    }
    render(){
       
        return(<SafeAreaView style={{position:'relative'}}>
       <CompanyListView style={{position:'absolute',top:0,left:0}} defaultCompany={this.state.selectCompany}></CompanyListView>
       
        </SafeAreaView>)
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

class CompanyListView extends Component{
    constructor(props){
        super(props);
        this.state = {
            list:[],
            animatedheight: new Animated.Value(0),
        }
    }
    componentDidMount(){
        this._setData();
        this.listener = DeviceEventEmitter.addListener('showCompanyList',(e)=>{
           if (e !== null){
              this._showlist();
           }
       })
   }
   componentWillUnmount(){
       this.listener.remove();
   }
    _setData = async()=>{
        let model = new UserModel();
        var list = await model.getCompanyList();
        this.setState({
            list:list
        })
    }
    _showlist = () =>{
        Animated.timing(this.state.animatedheight,{
            toValue:300,
            duration:1000,
        }).start();
    }
    _hidelist = (model)=>{
        Animated.timing(this.state.animatedheight,{
            toValue:0,
            duration:1000,
        }).start();
    }
    render(){
        let items = [];
       for (i=0; i< this.state.list.length;i++){
           let model = this.state.list[i];
            let item = (
            <View style={{width:'100%',alignItems:'center',justifyContent:'center',height:44}}>
                <TouchableOpacity>
                <Text style={{color: model.isdefault ? '#00a056' : '#333',fontSize:16}}>{model.simpleName}</Text>
                </TouchableOpacity>
            </View>
            
          )
            items.push(item)
       }
       return( 
        <Animated.ScrollView style={{...this.props.style,height:this.state.animatedheight,backgroundColor:'#000',opacity:0.03,width:'100%'}} ref={component => this._view = component}>
        {items}
        </Animated.ScrollView>
       )
    }
}