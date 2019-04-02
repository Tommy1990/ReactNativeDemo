import React from 'react';

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

 function transData(params) {
     var paramStr = '';
     for (item in params){
        paramStr +=  `${item}=${params[item]}&`
     }
     return paramStr;
 }