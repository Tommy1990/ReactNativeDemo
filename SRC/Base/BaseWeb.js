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
    //获取气象站数据
    PARK_WEATHER_STATION_DATA = HOME + 'Park/sensorData'
    //获取24小时天气数据
    PARK_WEATHER_REPORT_DATA = HOME + 'Parkinfo/getNowDayWeather'
    //get 15-days-long time weather
    PARK_WEATHER_15_REPORT_DATA = HOME + 'Parkinfo/getFifteenDayWeather';
    //get farms info
    PARK_FARM_DATA = HOME + 'Park/plotData';
}