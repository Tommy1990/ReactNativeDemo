import React from 'react';

const HOME = 'http://iot-api.qa.nongfaziran.com/';

// const HOME = 'http://iot-api.pro.nongfaziran.com/';

export default class REQUEST_URL {
    //登录
    LOG_IN = HOME + 'App/Login/login'
    // 获取验证码
    SEND_MSG = HOME + 'App/Login/sendSMS'
    // 验证码验证
    VALIDE_MSG = HOME + 'App/Login/codeValidate'
    //修改密码
    RESET_PSWD   = HOME + 'App/Login/forgetPass'
    //reset default company
    MINE_RESET_COMPANY = HOME + 'App/Generalitems/changeDefaultCom'
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
    //EZ save point 
    PARK_VIDEO_EZ_CONTROL_POINT_SAVE = 'https://open.ys7.com/api/lapp/device/preset/add'
    //EZ move to point
    PARK_VIDEO_EZ_CONTROL_MOVE_POINT = 'https://open.ys7.com/api/lapp/device/preset/move'
    //EZ clean point
    PARK_VIDEO_EZ_CLEAN_POINT = 'https://open.ys7.com/api/lapp/device/preset/clear'

    //get normal project list
    WORK_NORMAL_PROJECT_LIST =  HOME + 'App/Generalitems/projectList'
    //get normal project detail
    WORK_NORMAL_PROJECT_DETAIL  = HOME + 'App/Projects/selectProjectInfo'
    //get normal project daily data
    WORK_NORMAL_PROJECT_DAILY_DATA = HOME + 'App/Projects/projectLogList'
    //get normal project msg data
    WORK_NORMAL_PROJECT_MSG_DATA    = HOME + 'App/Projects/getProjectLeavingMessageList'

    //post text Msg
    WORK_NORMAL_PROJECT_MSG_POST    = HOME + 'App/Projects/projectLeavingMessage'
    //post voice msg
    WORK_NORMAL_PROJECT_VOICE_MSG   = 'http://oss.nfzr365.com/api/oss/upload'
    //get persons in company
    MINE_STRUCT_DATA                = HOME + 'App/Company/frameworkSelect'
    //get total msgcount
    MINE_MSG_TOTAL_NUM              = HOME + 'App/News/countNoticeNum'
    // get  msg list
    MINE_MSG_LIST            = HOME + 'App/News/newsInfoList'
    // get msg num 
    MINE_MSG_NUM            = HOME + 'App/News/countAllTypeNum'
    // msg read 
    MINE_MSG_READ           = HOME + 'App/News/updateNoticeMessageDeputyStatus'
    // msg all read
    MINE_MSG_ALL_READ       = HOME + 'App/News/updateAllNoticeMessage'

}