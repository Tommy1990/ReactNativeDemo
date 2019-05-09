
import UserModel from './UserModel';
import DeviceInfo from 'react-native-device-info';
 export default async function fehchData(url,params,fn){
     transData(params,async (str)=>{
        var request = new XMLHttpRequest();
        request.onreadystatechange =  (e)=>{
        if (request.readyState !== 4){
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
            console.log(`1234567890 error status=${JSON.stringify(error.status)}`)
            fn(null, error);
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
        request.open('POST',url,true);
        request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        if((token != null) &&(token.length > 6)){
            request.setRequestHeader('userid',userID);
            request.setRequestHeader('sign',token);
            request.setRequestHeader('appVersion',appVersion);
            request.setRequestHeader('devType',devType);
            request.setRequestHeader('system',system);
            request.setRequestHeader('time',time);
        }
        request.send(str);
     })
     
    
    

 }

function transData(params,fnn) {
    var paramStr = ''
    for (item in params){
        paramStr += `${item}=${params[item]}&`
    }
    let res = paramStr.slice(0,paramStr.lastIndexOf('&'));
    fnn(res);
 }

