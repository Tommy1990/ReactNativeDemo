import React,{Component} from 'react';
import {StyleSheet,Dimensions} from 'react-native';
let  {width,height} = Dimensions.get('window');
const commenStyles = StyleSheet.create({
    containerNormal:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'flex-start', 
    },
    parkBottomContainer:{
        width:width,
        height:'100%',
        backgroundColor:'red',
    }

})
export default commenStyles;
