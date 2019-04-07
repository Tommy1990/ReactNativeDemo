import React,{Component} from 'react';
import {SafeAreaView,Text,TouchableOpacity,StyleSheet,Button} from 'react-native';
import createStackNavigator from 'react-navigation';


export default class HomeScreen extends Component{
   static navigationOptions = {
       title:'Home',
       headerRight:(
           <Button title='Info' color='#333' onPress={this._openDrawer}></Button>
       )
   }
   _openDrawer = ()=>{
       this.props.navigation.toggleDrawer();
   }
    render(){
        return(<SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this._onPress}>
            <Text style={styles.text}> press me</Text>
        </TouchableOpacity>
        </SafeAreaView>)
    }
    _onPress = ()=>{
        this.props.navigation.navigate('ChildFirst',{
            itemID:66,
            title:'childPage'
        });
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
    },

})
