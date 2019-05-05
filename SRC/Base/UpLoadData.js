
// import RNFetchBlob from 'react-native-fetch-blob'
// import React from 'react';
// export default function UploadData(list,type,key,fnn){
//     let url = 'http://oss.nfzr365.com/api/oss/upload'
    
//     let files = [
//         {name:`${key}`,filename:`${key}.mp4`,data:list[0],type:type}
//     ]
//     let dic = {dir:'app',type:0,voice0:files}
//     RNFetchBlob.fetch('POST',url,
//     {'Content-Type':'multipart/form-data'},dic).then((respond)=>{
       
//         fnn(respond,null);
//     }).catch((error)=>{
//         fnn(null,error);
//     })

   
    
// }