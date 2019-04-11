import React,{Component} from 'react';
import {SafeAreaView,View,TouchableOpacity,FlatList} from 'react-native';
import commenStyles from '../Base/CommenStyle';
export default class ParkSelectPage extends Component{
    static navigationOptions = (navigation) =>{
        return{
            header:null,
        }
    }
    render(){
        return(<SafeAreaView style={commenStyles.containerNormal}>
        
        </SafeAreaView>)
    }
}