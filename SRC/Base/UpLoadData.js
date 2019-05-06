
import RNFetchBlob from 'react-native-fetch-blob';
import React from 'react';
import {Platform} from 'react-native';
export default function UploadData(list,type,key,fnn){
    let url = 'http://oss.nfzr365.com/api/oss/upload'
    let OS = Platform.OS;
    let path = OS === 'ios' ? list[0].replace('file:///','') : list[0];
    let body = [{
        name:'dir',data:'app'
    },{
        name:'type',data:'0'
    },{
        name:'pic0',
        filename:key || 'file',
        data:RNFetchBlob.wrap(path)
    }];
   RNFetchBlob
   .fetch('POST',url,{
       'Content-Type':'multipart/form-data'
   },body)
   .uploadProgress((written,total)=>{
    console.log(`111111111111111 loading ${written}`)
   })
   .progress((received,total)=>{

   })
   .then((respond)=>{
       console.log(`111111111111111 success`)
        fnn(JSON.parse(respond),null);
   })
   .catch((err)=>{
       console.log(`111111111111111 fail ${err.message}`)
        fnn(null.err);
   })
    
}