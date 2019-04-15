import React from 'react';
import PropTypes from 'prop-types';
import UserModel from './UserModel';
import DeviceInfo from 'react-native-device-info';
import { NativeEventEmitter} from 'react-native';
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
                let error = new Error();
                error.message = res.status.remind;
                console.log(`1234567890error=${JSON.stringify(error)}`)
                fn(null,error);
            }
           
        }else{
            let error = new Error();
            error.message = '网络错误'
            console.log(`1234567890error=${JSON.stringify(error)}`)
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

async function transData(params,fnn) {
    var dic = {};
    for (item in params){
        dic[item] = params[item];
    }
    let model = new UserModel();
    let token = await model.getToken();
    let userID = await model.getUserID();
    let devType = DeviceInfo.getSystemName();
    let appVersion = DeviceInfo.getBuildNumber();
    // let deviceType = DeviceInfo.getDeviceType();
    let deviceName = DeviceInfo.getSystemVersion();
    let system =  deviceName;
    let time = Date.parse(new Date());
    
    if((token != null) &&(token.length > 6)){
        dic.userid = userID;
        dic.sign = token;
        dic.appVersion = appVersion;
        dic.devType = devType;
        dic.system = system;
        dic.time = time;
    }
    var paramStr = ''
    for (item in dic){
        paramStr += `${item}=${dic[item]}&`
    }
    let res = paramStr.slice(0,paramStr.lastIndexOf('&'));
    fnn(res);
 }

