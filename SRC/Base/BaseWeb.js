import React from 'react';

const HOME = 'http://iot-api.qa.nongfaziran.com/';


export default class REQUEST_URL {
    //登录
    LOG_IN = HOME + 'App/Login/login'
    // 获取验证码
    SEND_MSG = HOME + 'App/Login/sendSMS'
    // 验证码验证
    VALIDE_MSG = HOME + 'App/Login/codeValidate'
    //修改密码
    RESET_PSWD   = HOME + 'App/Login/forgetPass'
    //获取气象站数据
    PARK_WEATHER_STATION_DATA = HOME + 'App/Park/sensorData'
    //获取24小时天气数据
    PARK_WEATHER_REPORT_DATA = HOME + 'App/Parkinfo/getNowDayWeather'
    //get 15-days-long time weather
    PARK_WEATHER_15_REPORT_DATA = HOME + 'App/Parkinfo/getFifteenDayWeather';
    //get farms info
    PARK_FARM_DATA = HOME + 'App/Park/plotData';
    //get video list info
    PARK_VIDEO_LIST_DATA = HOME + 'Com/Video/farmCameraList'
    //get video info
    PARK_VIDEO_DETAIL_INFO = HOME + 'Com/Video/getCameraInfo';
    //get EZ token
    PARK_VIDEO_EZ_TOKEN = HOME + 'Com/Video/getAccessToken';
    //EZ Control start
    PARK_VIDEO_EZ_CONTROL_START = 'https://open.ys7.com/api/lapp/device/ptz/start'
    //EZ control stop
    PARK_VIDEO_EZ_CONTROL_STOP  = 'https://open.ys7.com/api/lapp/device/ptz/stop'
}