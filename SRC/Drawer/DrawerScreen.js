import  React,{Component} from 'react';
import {SafeAreaView,View,TouchableOpacity,Text,ScrollView} from 'react-native';

import commenStyles from '../Base/CommenStyle'
export default class DrawerScreen extends Component{
   setNativeProps = (nativeProps) =>{
    this._pushToHome.setNativeProps(nativeProps);
   }
   _jumpToHome = () =>{
    
       this.props.navigation.navigate('TabSetting');
   }
    render(){
        return(
        <ScrollView>
         <SafeAreaView style={commenStyles.containerNormal}>
            <TouchableOpacity
            onpress = {this._jumpToHome}
            ref = {component=> this._pushToHome = component} {...this.props}>
            <Text style={{color:'blue',fontSize:16}}>跳转到主导航</Text>
            </TouchableOpacity>
         </SafeAreaView>
        </ScrollView>
        )
    }
}