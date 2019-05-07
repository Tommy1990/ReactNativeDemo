import React,{Component} from 'react';
import {SafeAreaView} from 'react-native';

export default class MineChangePage extends Component{
    static navigationOptions = {
       header:null
    }
    reder(){
        return(
            <SafeAreaView style={{backgroundColor:'red'}}>

            </SafeAreaView>
        )
    }
}