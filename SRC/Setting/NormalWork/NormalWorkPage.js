import React,{Component} from 'react';
import {SafeAreaView,View,ScrollView,FlatList,TouchableOpacity,Text,Image} from 'react-native';

export default class NormalWorkPage extends Component{
    static navigationOptions = ({navigation}) => {
       
        return {
            headerTitle:<Text style={{color:'#00a056'}}>123456</Text>,
            headerBackImage:<Image source={require('../../../img/back.png')} style={{width:10,height:17,marginLeft:21.5}}/>,
        }
    }
    render(){
        return(<SafeAreaView>

        </SafeAreaView>)
    }
}