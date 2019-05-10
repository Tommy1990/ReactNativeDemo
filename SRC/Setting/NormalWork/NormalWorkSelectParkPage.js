import React,{Component} from 'react';
import {View,Image,TouchableOpacity,ScrollView,Text} from 'react-native';
import REQUEST_URL from '../../Base/BaseWeb';
import fehchData from '../../Base/FetchData';
export default class NormalWorkSelectParkPage extends Component{
    static navigationOptions = ({navigation}) =>{
        return({
            headerTitle:<Text style={{color:'#333',fontSize:18}}>工作园区及地块</Text>,
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
        super(props);
        this.state={
            list:[]
        }
    }
    componentDidMount(){
        let list = this.props.navigation.getParam('parksList',[]);
        let companyId = this.props.navigation.getParam('companyId','');
        if (list.length > 0){
            this.setState({
                list:list
            })
            return
        }
        this._fechData(companyId)
    }
    _fechData = (companyId)=>{
        let url = new REQUEST_URL();
        let para = {companyId:companyId}
        fehchData(url.WORK_NORMAL_FARMS_LIST,para,(respond,err)=>{
            if(err !== null){
                alert(err.message)
            }else{
                respond[0].selected = true
                this.setState({
                    list:respond
                })
            }
        })
    }


    render(){
        let items = []
        for (i=0;i<this.state.list.length;i++){
            let model = this.state.list[i]
            let item = (<TouchableOpacity style={{marginLeft:21,height:'100%',paddingTop:12,paddingBottom:6.5}}>
                <Text style={{color:model.selected?"#00a056":'#333'}}>{model.nf_farmName}</Text>
            </TouchableOpacity>)
            items.push(item)
        }
        return(
            <View style={{flex:1}}>
            <ScrollView style={{width:'100%',height:33.5}} horizontal={true}>
            {items}
            </ScrollView>
            </View>
        )
    }
}