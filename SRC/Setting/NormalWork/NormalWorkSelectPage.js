import React,{Component} from 'react';
import {SafeAreaView,View,SectionView,ScrollView,TouchableOpacity,Text,StatueView,Image} from 'react-native';
export default class NormalWorkSelectPage extends Component{
    static navigationOptions = ({navigation}) =>{

        return({
            headerTitle:<Text style={{color:'#333',fontSize:18}}>筛选</Text>,
            headerBackImage:<Image source={{uri:'123'}}/>,
            headerRight:(<TouchableOpacity style={{margineRight:21,paddingRight:20}} 
            hitSlop={{top:20,bottom:20,right:20,left:20}}
            onPress={()=>{
                navigation.goBack();
            }}> 
                <Image source={require('../../../img/close.png')} style={{width:13,height:13,paddingRight:20}}/>
            </TouchableOpacity>)
        })
    }
    render(){
        return(
            <SafeAreaView>
        
            </SafeAreaView>
        )
    }
}