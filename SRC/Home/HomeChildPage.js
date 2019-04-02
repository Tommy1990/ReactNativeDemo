import React,{Component} from 'react';
import {SafeAreaView,Text,TouchableOpacity,StyleSheet,Button} from 'react-native';
export default class HomeChildPage extends Component{
    static navigationOptions = ({navigation}) => {
       return {title:navigation.getParam('title','default'),
                headerRight:(<Button  onPress={()=> alert('right btn click')} title='info' color='#333'/>)} 
    }
    
    render(){
        const {navigation} = this.props;
        return(<SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.button} onPress ={this._onPress}>
            <Text style={styles.text}> {JSON.stringify(navigation.getParam('itemID','00'))}</Text>
        </TouchableOpacity>
        </SafeAreaView>)
    }
    _onPress = ()=>{
        alert('childPage')
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
