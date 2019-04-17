import React,{Component} from 'react';
import {WebView} from 'react-native';
export default class BaseWebView extends Component{
    static navigationOptions = (navigation)=>{
        return{
            header:null,
        }
    }
    render(){
        let url = this.props.navigation.getParam('url','');
        return (
            <WebView source={{uri:url}}></WebView>
        ) 
    }
}