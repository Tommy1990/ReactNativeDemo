import React,{Component} from 'react';
import {SafeAreaView,TouchableOpacity,Text,StyleSheet} from 'react-native';

export default class SettingScreen extends Component{
    render(){
        return (<SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.button}>
        <Text style={styles.text}> setting Touch</Text>
        </TouchableOpacity>
        </SafeAreaView>)
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#eee',
        alignItems:'center',
        justifyContent:'center',
    },
    button:{
        justifyContent:'center',
        padding:10,
    },
    text:{
        color:'#333',
        fontSize:20,
        backgroundColor:'#ddd'
    },

})
