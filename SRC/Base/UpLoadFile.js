
import React from 'react';
import {Platform} from 'react-native';
import UserModel from './UserModel';
import DeviceInfo from 'react-native-device-info';
export default async function UploadFile(list,type,key,fnn){
    let url = 'http://oss.nfzr365.com/api/oss/upload'
    let OS = Platform.OS;
    let body = new FormData();
    body.append('dir','app');
    body.append('type','0');
    for(i=0; i< list.length;i++){
        let path = OS === 'ios' ? list[i].replace('file:///','') : list[i];
        body.append(`${key}${i}`,{
            type:type,
            uri:path,
            name:`${key}${i}`,
        });
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST',url);
    if(xhr.upload){
        xhr.upload.onprogress = (event)=>{
            if(event.lengthComputable){
                let perent = event.loaded / event.total.toFixed(2);
            }
        }
    }
    xhr.onload = ()=>{
        if(xhr.status !== 200){
            let error = new Error('网络连接失败');
            fnn(null,error);
            return;
        }
        if(!xhr.responseText){
            let error = new Error('网络加载失败');
            fnn(null,error);
            return;
        }
        let respond;
        try{
            respond = JSON.parse(xhr.response);
            fnn(respond,null);
        }catch(err){
            fnn(null,err)
        }
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
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        if((token != null) &&(token.length > 6)){
            xhr.setRequestHeader('userid',userID);
            xhr.setRequestHeader('sign',token);
            xhr.setRequestHeader('appVersion',appVersion);
            xhr.setRequestHeader('devType',devType);
            xhr.setRequestHeader('system',system);
            xhr.setRequestHeader('time',time);
        }
    xhr.send(body);
    
}