import React,{Component} from 'react';
import {SafeAreaView,View,ScrollView,FlatList,TouchableOpacity,Text} from 'react-native';

export default class NormalWorkPage extends Component{
    static navigtionOptions = ({navigation}) => {

        return {
            header:<View style={{flexDirection:'row',justifyContent:'flex-start',width:'100%',height:64}}><Text>12345</Text></View>
        }
    }
    render(){
        return(<SafeAreaView>

        </SafeAreaView>)
    }
}