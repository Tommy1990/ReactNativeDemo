import React,{Component} from 'react';
import {View,Text} from 'react-native';
export default class ProjecttitleView extends Component{
    render(){
        let title = '----'
        let des = '----  |  ---'
        let statueStr = '----'
        let statueColor = '#333'
        if (this.props.model !== null){
            let model = this.props.model
            title = model.nf_proName
            des = `${model.nf_parkId.nf_farmName}  |  ${model.nf_workTypeId.nf_workTypeName}`
            switch (model.nf_proStatus) {
                case '0':
                    statueColor='#f5a623'
                    statueStr='待审核'
                    break;
                case '1','4':
                statueColor='#01b211'
                statueStr='项目进行中'
                break;
                case '2':
                statueColor='#e43535'
                statueStr='审核未通过'
                break;
                case '1002':
                statueColor='#f5a623'
                statueStr='已逾期'
                break;
                case '1001':
                statueColor='#f5a623'
                statueStr='废弃待审核'
                break;
                case '6':
                statueColor='#49a286'
                statueStr='待复查'
                break;
                case '3':
                 statueColor = '#49a286'
                 statueStr = "待复查"
                case '5':
                statueColor = '#24a0ea'
                statueStr = "已完成"
                case '1003':
                statueColor = '#e43535'
                statueStr = "逾期完成"
                 case '7':
                 statueColor = '#c4c4c4'
                statueStr = "已废弃"
                default:
                    break;
            }
        }
        return(
            <View style={{marginLeft:13,marginRight:13,marginTop:10.5,marginBottom:7,borderRadius:10,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#fff',alignItems:'center'}}>
                <View style={{justifyContent:'flex-start',alignItems:"flex-start",marginLeft:18.5,marginBottom:17}}>
                    <Text style={{color:'#000',fontSize:16,marginTop:16}}>{title}</Text>
                    <Text style={{color:'#333',fontSize:14,marginTop:15}}>{des}</Text>
                </View>
                <View style={{width:48,height:48,borderRadius:24,borderWidth:1,justifyContent:'center',alignItems:'center',marginRight:35,borderColor:statueColor}}>
                <Text>{statueStr}</Text>
                </View>
            </View>
        )
    }
}