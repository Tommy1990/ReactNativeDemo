import React,{Component} from 'react';
import {SafeAreaView,View,FlatList,StyleSheet,TouchableOpacity,Text} from 'react-native';
import UserModel from '../Base/UserModel';
import REQUEST_URL from '../Base/BaseWeb';
import fehchData from '../Base/FetchData';
export default class CompanySelectPage extends Component{
    static navigationOptions = ({navigation}) =>{

        return{
            title:'设置默认公司'
        }
    }
    constructor(props){
        super(props);
        this.state = {
            companyList:null,
            selectCompany:null,
        }
    }
    componentDidMount(){
        
        this._getCompanyList();
    }
    _getCompanyList = async() =>{
       
        let model = new UserModel();
        let list = await model.getCompanyList();
        let company = this.props.navigation.getParam('company','');
        this.setState({
            companyList:list,
            selectCompany:company,
        });
        
        
    }
    _selectCompany = (item) => {
        let url = new REQUEST_URL();
        let para = {companyId:item.id}
        let model = new UserModel();
        
        fehchData(url.MINE_RESET_COMPANY,para,(respond,error)=>{
            alert(JSON.stringify(respond))
            // if (error != null){
            //     alert(error.message);
            // }else{
                
            //     model.cleanLoginData();
            //     this.props.navigation.navigate('Loading')
            // }
        })
    }
    render(){
        var list = [];
        if (this.state.companyList !== null){
            list = this.state.companyList
        }
        return (
            <SafeAreaView>
                <FlatList
                data={list}
                renderItem = {({item}) =>
                <View style={{justifyContent:'center',alignItems:'center',width:'100%',height:44,
                borderRadius:20,shadowColor:'#000',shadowOpacity:0.09,shadowOffset:{width:1,height:1,margin:10}}}>
                    <TouchableOpacity onPress={()=> this._selectCompany(item) }>
                        <Text style={{color: item.isDefault == '1' ? "#00a056" : '#333' }}>{item.companyName}</Text>
                    </TouchableOpacity>
                </View> 
                }
                keyExtractor = {(item,index) => item.id}
                />
            </SafeAreaView>
        )
    }
}