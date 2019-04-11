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

    componentDidMount(){
        let parkID = this.props.navigation.getParam('id','');
        foo = async()=>{
            let model = new UserModel();
            let list = await model.getCompanyList();
             this.props.setState({
                 commenStyles:list,
                 selectPark:parkID,
             })
         }
         foo();
    }
    render(){
        return(<SafeAreaView style={commenStyles.containerNormal}>
        <FlatList 
        data={this.state.props.companyList}
        />
        </SafeAreaView>)
    }
}

class CompanyParkItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            model:null,
        }
    }
    render(){
        var items = [];
        if (this.state.model !== null){
            let list = model.park;
            let num = Math.ceil(list.length/3);
            for (i=0;i<num;i++){
                
            }
        }


        return(
            <View style={{width:'100%',backgroundColor:'blue',margin:10}}>
            
            </View>
        )
    }
}

class CompanyParkCol extends Component{
    constructor(props){
        super(props);
        this.State = {
            list:[]
        }
    }

    render(){
        return(
            <View style={{flexDirection:'row',width:"100%",height:44,justifyContent:'center'}}></View>
        )
    }
}

