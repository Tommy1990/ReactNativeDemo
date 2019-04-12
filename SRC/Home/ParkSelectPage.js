import React,{Component} from 'react';
import {SafeAreaView,View,TouchableOpacity,FlatList,Text} from 'react-native';
import commenStyles from '../Base/CommenStyle';
import UserModel from '../Base/UserModel';

export default class ParkSelectPage extends Component{
    static navigationOptions = ({navigation}) =>{
        return{
            headerTitle:'选择园区',
            headerRight:(<TouchableOpacity onPress={()=>{
                navigation.goBack();
            }}><Text style={{color:'#333',fontSize:15,marginRight:15}}>关闭</Text></TouchableOpacity>),
            headerLeft:null,
        }
    }
    constructor(props){
        super(props);
        this.state = {
            companyList:[],
            selectPark:''
        }
    }
    _loadData = async(component)=>{
        let parkID = this.props.navigation.getParam('id','');
        let model = new UserModel();
        let list = await model.getCompanyList();
        this.setState({
            companyList:list,
            selectPark:parkID,
        })
    }
    _onPress = (model)=>{
        this.props.navigation.navigate('Main',{title:model.nf_farmName,id:model.id});
    }
   componentDidMount(){
       this._loadData();
   }
    render(){
        return(<SafeAreaView style={commenStyles.containerNormal}>
        <FlatList 
        data={this.state.companyList}
        renderItem = {({item})=> {return (<CompanyParkItem model={item} actionPress = {this._onPress} keyID = {this.props.navigation.getParam('id','')}/>)} }
         ref={component=>this._listView = component}{...this.props}
         keyExtractor = {(item,index) => item.id}
         style = {{width:'100%'}}
        />
        </SafeAreaView>)
    }
}

class CompanyParkItem extends Component{
   
    render(){
        var items = [];
        if (this.props.model !== null){
            let list = this.props.model.park;
            let num = Math.ceil(list.length/3);
            for (i=0;i<num;i++){
                let children = list.slice(i*3,(i+1)*3);
                let item = <CompanyParkCol list={children} actionPress = {this.props.actionPress} keyID ={this.props.keyID}  key={`${i}`}/>
                items.push(item);
            }
        }
        return(
            <View style={{margin:10}}>
            <Text style={{marginLeft:20,fontWeight:'bold',fontSize:16,marginBottom:13}}>{this.props.model.companyName}</Text>
            {items}
            </View>
        )
    }
}

class CompanyParkCol extends Component{
    _onPress = (model)=>{
        this.props.actionPress(model);
    }
    render(){
        var items = [];
        let list = this.props.list;
        
        for (i = 0 ; i < list.length; i++){
            let model = this.props.list[i]
            console.log(`1234567890parkName=${model.nf_farmName}`)
            let item = (<TouchableOpacity key={model.id} 
                onPress={()=>this._onPress(model)}
                style={{height:30,backgroundColor: model.id == this.props.keyID ? '#00a056' : '#fff',
                borderRadius:15,borderWidth:1,borderColor:'#00a056',
                width:80,marginLeft:20,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#333',fontSize:14}}>{model.nf_farmName}</Text></TouchableOpacity>)
            items.push(item);
        }
        return(
            <View style={{flexDirection:'row',width:"100%",height:44,justifyContent:'flex-start',alignItems:'center'}}>{items}</View>
        )
    }
}

