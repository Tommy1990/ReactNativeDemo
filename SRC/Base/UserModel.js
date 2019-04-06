import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
export default class UserModel{
    
    setLoginData(param){
       this.setToken(param.token);
       this.setUserID(param.userInfo.userId);
       this.setUserName(param.userInfo.userName);
    }

    getToken = async()=>{
        try {
            let sign = await AsyncStorage.getItem('TOKEN');
            
            return sign;
        }catch(error){
            return '';
        }
    }

    setToken = async(value)=>{
        try {
            await AsyncStorage.setItem('TOKEN',value);
        }catch(error){
            console.log(error)
        }
    }
    getUserID = async()=>{
        try {
            let sign = await AsyncStorage.getItem('USERID');
            return sign;
        }catch(error){
            return '';
        }
    }
    setUserID = async(value)=>{
        try {
            await AsyncStorage.setItem('USERID',value);
        }catch(error){
            console.log(error)
        }
    }

    getUserName = async()=>{
        try {
            let sign = await AsyncStorage.getItem('USERNAME');
            return sign;
        }catch(error){
            return '';
        }
    }
    setUserName = async(value)=>{
        try {
            await AsyncStorage.setItem('USERNAME',value);
        }catch(error){
            console.log(error)
        }
    }
}