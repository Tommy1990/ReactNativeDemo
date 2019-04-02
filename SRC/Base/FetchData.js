import React from 'react';
import {AsyncStorage} from 'react-native';
 export default async function fehchData(url,params,fn){
     let paramStr = transData(params);
    try {
        let response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded', 
            },
            body:paramStr,
        })
        let responseJson = await response.json();
        fn(responseJson,null);
    }catch (error) {
        fn(null,error);
    }
 }

 async function transData(params) {
     var paramStr = '';
     for (item in params){
        paramStr +=  `${item}=${params[item]}&`
     }
     let token = getToken('TOKEN');
     alert(token);
     paramStr += `sign=${token}`
     return paramStr;
 }
 async function getToken(para){
     try {
         const value = await AsyncStorage.getItem(para);
         if (value !== null){
             return value;
         }else{
             return '';
         }
     } catch(error){
         console.log(error);
         return ''
     }
 }