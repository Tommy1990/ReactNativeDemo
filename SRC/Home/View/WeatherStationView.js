import React,{Component} from 'react';
import {View,TouchableOpacity,Text,ScrollView} from 'react-native';
import commenStyle from '../../Base/CommenStyle'
export default class WeatherStationView extends Component{
    
    _jumpToDetail= ()=>{
        this.props.navigation.navigate('ChildFirst')
    }
    render(){
        return(
            <View style={commenStyle.parkBottomContainer}>
            <ScrollView><TouchableOpacity onPress={()=>this._jumpToDetail}><Text>dianjia</Text></TouchableOpacity></ScrollView>
            
            </View>
        )
    }
}