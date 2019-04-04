import React from 'react';

const HOME = 'http://iot-api.qa.nongfaziran.com/App/';


export default class REQUEST_URL {
    //登录
    LOG_IN = HOME + 'Login/login'
    // 获取验证码
    SEND_MSG = HOME + 'Login/sendSMS'
    // 验证码验证
    VALIDE_MSG = HOME + 'Login/codeValidate'
    //修改密码
    RESET_PSWD   = HOME + 'Login/forgetPass'
}