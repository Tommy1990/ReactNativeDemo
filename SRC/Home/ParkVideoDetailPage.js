import React,{Component} from 'react';
import {SafeAreaView,View,Button,Text,TouchableOpacity,Image} from 'react-native'
import {video} from 'react-native-video';
export default class ParkVideoDetailPage extends Component{
    static navigationOptions = ({navigation})=>{
       let model = navigation.getParam('model','');
        
        return {
            title: model.nf_name,
            
        }
    }
    render(){
        return (<SafeAreaView>
            
        </SafeAreaView>)
    }
}