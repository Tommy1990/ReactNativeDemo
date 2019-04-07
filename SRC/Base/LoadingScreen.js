import React,{Component} from 'react';
import {SafeAreaView,View,ActivityIndicator,StatusBar,StyleSheet} from 'react-native';
import commenStyles from './CommenStyle';
import UserModel from './UserModel';
export default class LoadingScreen extends Component{
    constructor(props){
        super(props);
        this._bootstrapAsync();
    }
    _bootstrapAsync= async()=>{
        let userModel = new UserModel();
        const userToken = await userModel.getToken();
        this.props.navigation.navigate(userToken.length > 2 ? 'DrawerNav' : 'Load')
    }
    render(){
        return(<SafeAreaView style={commenStyles.containerNormal}>
        <StatusBar barStyle='default'/>
        <ActivityIndicator />
        </SafeAreaView>)
    }
}