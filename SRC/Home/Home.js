import React,{Component} from 'react';
import {SafeAreaView,Text,TouchableOpacity,StyleSheet} from 'react-native';
import createStackNavigator from 'react-navigation';


export default class HomeScreen extends Component{
    static navigationOptions = ({navigation}) => {
        let visuable = true;
        if (navigation.state.index > 0){
            visuable = false;
        }
        return{
            title:'Home',
            tabBarVisible: visuable,
        }
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
