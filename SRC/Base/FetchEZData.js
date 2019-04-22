import React from 'react';
export default async function fetchEZData(para,url,fn){
     let res = await transData(para);
     
    try {
        let response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:res,
        });
        let data = await response.json();
        fn(data,null);
    }catch (error) {
        fn(null,error);
    }
}
function transData(params) {
    var paramStr = ''
    for (item in params){
        paramStr += `${item}=${params[item]}&`
    }
    return res = paramStr.slice(0,paramStr.lastIndexOf('&'));
 }