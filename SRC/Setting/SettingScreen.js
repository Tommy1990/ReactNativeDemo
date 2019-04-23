import React,{Component} from 'react';
import {SafeAreaView,TouchableOpacity,View,Text,StyleSheet,Image} from 'react-native';
import UserModel from '../Base/UserModel';
import Modal from 'react-native-modal';

export default class SettingScreen extends Component{
    static navigationOptions = ({navigation}) =>{


        return{
            header:<HeaderView tempNavigation={navigation}/> ,
        }
    }
    render(){
        return (<SafeAreaView style={styles.container}>
        
        </SafeAreaView>)
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

class HeaderView extends Component{
    _setCompany = async() =>{
        let model = new UserModel();
        let company = await model.getDefaultCompany();
        console.log(`1234567890===${JSON.stringify(company)}`);
        this.setState({
            company:company
        })
        
    }
    _jumpToSelectCompany = ()=>{

        if (this.props.company === null){
            return
        }
        this.props.tempNavigation.navigate('CompanySelect',{company:this.state.company});
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
    _openDrawer = ()=>{
        this.props.tempNavigation.openDrawer();
    }
    render(){
        var companyName = ''
        if (this.state.company !== null){
            companyName = this.state.company.simpleName
        }
        return <View style = {{flexDirection:'row',
        width:'100%',
        marginTop:20,
       
        height:44,
        justifyContent:'space-between',
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        alignItems:'center'}}>
        <TouchableOpacity hitSlop={{left:20,top:20,right:20,bottom:20}}
        onPress = {()=>this._openDrawer()}>
        <Image source={require('../../img/mine.png')} style={{width:19.5,height:24,marginLeft:24}}></Image>
        </TouchableOpacity>
        <Text style={{color:'#333',fontSize:18,fontWeight:'bold'}}>{companyName}</Text>
        <TouchableOpacity hitSlop={{left:20,top:20,right:20,bottom:20}} style={{marginRight:20}}
        onPress={()=> this._jumpToSelectCompany()}>
        <Text>切换公司</Text>
        </TouchableOpacity>
         </View>
    }
}
