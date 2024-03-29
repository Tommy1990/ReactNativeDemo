
import AsyncStorage from '@react-native-community/async-storage';
export default class UserModel{
    
    setLoginData(param){
       this.setToken(param.token);
       this.setUserID(param.userInfo.userId);
       this.setUserName(param.userInfo.userName);
       this.setCompanyList(JSON.stringify(param.companyInfo));
       this.setUserModel(param);
    }
    cleanLoginData(){
        this.setToken('');
        this.setUserID('');
        this.setUserName(''); 
        this.setCompanyList('');
        this.setUserModel('');
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
    getUserModel = async()=>{
        try{
            let model = await AsyncStorage.getItem('USERMODEL');

            return JSON.parse(model);
        }catch(error){
            return '';
        }
    }
    setUserModel = async(value)=>{
        try{
            let str = JSON.stringify(value);
            await AsyncStorage.setItem('USERMODEL',str);
        }catch(error){
            console.log(error.message);
        }
    }
    setUserName = async(value)=>{
        try {
            await AsyncStorage.setItem('USERNAME',value);
        }catch(error){
            console.log(error)
        }
    }
    setCompanyList = async(value) => {
        try{
            await AsyncStorage.setItem('ComapanyList',value);
            
        }catch(error){
            console.log(error);
        }
    }
    getCompanyList = async() =>{
        try {
           let json = await AsyncStorage.getItem('ComapanyList');
           let objlist = JSON.parse(json);
           return objlist;
        }catch(error){
            console.log(error);
            return [];
        }
    }
    getDefaultCompany = async() => {
        let list = await this.getCompanyList();
        for(i = 0;i < list.length;i++){
            let model = list[i];
            if ((model.userInCompanyStatus == '1')&& (model.isDefault == '1')){
                return model;
            }
            if (i == (list.length-1)){

                return {};
            }
        }
        
    }
    
}

