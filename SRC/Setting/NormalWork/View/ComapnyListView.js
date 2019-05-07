import React,{Component} from 'react';
import {SafeAreaView,View,ScrollView,FlatList,TouchableOpacity,Text,Image,DeviceEventEmitter,Animated,Dimensions} from 'react-native';
import UserModel from '../../../Base/UserModel';
import Modal from 'react-native-modal';
 export default class CompanyListView extends Component{
    constructor(props){
        super(props);
        this.state = {
            list:[],
            animatedheight: new Animated.Value(0),
        }
    }
    componentDidMount(){
        
        this.listener = DeviceEventEmitter.addListener('showCompanyList',(e)=>{
              this._showlist();
       })
   }
   componentWillUnmount(){
       this.listener.remove();
   }
   
   componentWillReceiveProps(nextProps){
     this._setData();
   }
    _setData = async()=>{
        let model = new UserModel();
        var list = await model.getCompanyList();
        let defaultcompany = this.props.defaultCompany;
        for (i=0;i < list.length;i++){
         let temp = list[i];
         temp.isdefault = temp.id == defaultcompany.id;
        }
        this.setState({
            list:list
        })
    }
    _showlist = () =>{
        Animated.timing(this.state.animatedheight,{
            toValue:600,
            duration:1000,
        }).start();
    }
    _hidelist = (model)=>{
        Animated.timing(this.state.animatedheight,{
            toValue:0,
            duration:1000,
        }).start();
        DeviceEventEmitter.emit('hideListView',model);
    }
    render(){
        let items = [];
       for (i=0; i< this.state.list.length;i++){
           let model = this.state.list[i];
            let item = (
            <View style={{width:'100%',alignItems:'center',justifyContent:'center',height:44,backgroundColor:'#fff'}} key={i}>
                <TouchableOpacity hitSlop={{top:10,bottom:10,left:20,right:20}} onPress={()=> this._hidelist(model)}>
                <Text style={{color: model.isdefault ? '#00a056' : '#333',fontSize:16}}>{model.simpleName}</Text>
                </TouchableOpacity>
            </View>
            
          )
            items.push(item)
       }
       
       return( 
        <Animated.ScrollView style={{...this.props.style,height:this.state.animatedheight,backgroundColor:'rgba(0,0,0,0.03)',width:'100%'}} ref={component => this._view = component}>
        {items}
        </Animated.ScrollView>
       )
    }
}