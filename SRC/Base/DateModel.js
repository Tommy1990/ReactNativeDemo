import React from 'react';
export default class DateModel {
    getNowYMDStr(){
        let now = new Date()
        return now.toJSON().slice(0,10)
    }
    getNowTimeseconds(){
        let now = new Date()
        return now.getTime()/1000
    }
    getYMDStr(seconds){
        let sec = seconds*1000
        let time = new Date(sec);
        return time.toJSON().slice(0,10)
    }
}