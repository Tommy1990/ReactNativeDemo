import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
export default class UserModel{
    
    setLoginData(param){
       this.setToken(param.token);
       this.setUserID(param.userInfo.userId);
       this.setUserName(param.userInfo.userName);
       this.setCompanyList(JSON.stringify(param.companyInfo));
    }
    cleanLoginData(){
        this.setToken('');
        this.setUserID('');
        this.setUserName(''); 
        this.setCompanyList('');
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
           console.log(`1234567890json=${objlist}`)
           return objlist;
        }catch(error){
            console.log(error);
        }
    }
    getDefaultCompany = () => {
        let list = this.getCompanyList();
        
        for(i = 0;i < list.count;i++){
            let model = list[i];
            
            if (model.userInCompanyStatus == '1'){
                return model;
            }
            if (i == (list.count-1)){
                alert('unfind')
                return {};
            }
        }
        
    }
    
}

