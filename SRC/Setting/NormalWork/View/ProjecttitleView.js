import React,{Component} from 'react';
import {View,Text} from 'react-native';
export default class ProjecttitleView extends Component{
    render(){
        let title = '----'
        let des = '----  |  ---'
        let statueStr = '----'
        let statuecolor = '#333'
        if (this.props.model !== null){
            let model = this.props.model
            title = model.nf_proName
            des = `${model.nf_parkId.nf_farmName}  |  ${model.nf_workTypeId.nf_workTypeName}`
        }
        return(
            <View style={{marginLeft:13,marginRight:13,marginTop:10.5,marginBottom:7,borderRadius:10,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#fff',alignItems:'center'}}>
                <View style={{justifyContent:'flex-start',alignItems:"flex-start",marginLeft:18.5,marginBottom:17}}>
                    <Text style={{color:'#000',fontSize:16,marginTop:16}}>{title}</Text>
                    <Text style={{color:'#333',fontSize:14,marginTop:15}}>{des}</Text>
                </View>
                <View style={{width:48,height:48,borderRadius:24,borderWidth:1,justifyContent:'center',alignItems:'center',marginRight:35}}>
                <Text>---</Text>
                </View>
            </View>
        )
    }
}