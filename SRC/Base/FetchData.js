import React from 'react';
import PropTypes from 'prop-types';
 export default async function fehchData(url,params,fn){
     transData(params,(str)=>{
        var request = new XMLHttpRequest();
        request.onreadystatechange = (e)=>{
        if (request.readyState !==4){
            return;
        }
        if (request.status === 200){
            let res = JSON.parse(request.response);
            if (res.status.code === 200){
                fn(res.data,null);
            }else{
                let error = Error(res.status.remind);
                fn(null,error);
            }
           
        }else{
            let error = Error('请求失败');
            fn(null, error);
        }
        }

        request.open('POST',url,true);
        request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        request.send(str);
     })
     
    // try {
    //     let response = await fetch(url,{
    //         method:'POST',
    //         headers:{
    //             'Content-Type': 'application/x-www-form-urlencoded', 
    //         },
    //         body:res,
    //     });
       
    //     fn(response,null);
    // }catch (error) {
    //     fn(null,error);
    // }
    

 }

function transData(params,fnn) {
     var paramStr = '';
     for (item in params){
        paramStr += `${item}=${params[item]}&`
     }
     let res = paramStr.slice(0,paramStr.lastIndexOf('&'));
     fnn(res);
 }
