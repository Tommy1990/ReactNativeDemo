import React,{Component} from 'react';
import {View,TouchableOpacity,Text,ScrollView,StyleSheet} from 'react-native';
import commenStyle from '../../Base/CommenStyle';
import UserModel from '../../Base/UserModel';
export default class WeatherStationView extends Component{
    
   setNativeProps = (nativeProps) => {
        this._bottomStation.setNativeProps(nativeProps);
   }
   _framBtnClick = (i)=>{
        this.props.tempNavigation.navigate('ChildFirst',{id:i})
   }
    render(){
        return(
            <View style={commenStyle.parkBottomContainer}>
            <ScrollView ref = {component => this._scrollView = component}{...this.props}>
            <BottomStationView tempClick={this._framBtnClick} num = {16} ref={component => this._bottomStation}{...this.props}></BottomStationView>
            </ScrollView>
            </View>
        )
    }
}

class BottomStationView extends Component{
   
    render(){
        var items = [];
        let row = 3;
        let last = this.props.num % 3
        let col = Math.ceil(17/3);
        for (i = 0;i<col;i ++) {
            let item = <BottomStationLineView num={i==col-1 ? last : 3} col = {i} key={i} tempClick = {this.props.tempClick} />;
            items.push(item);
        }
        return(<View ref={component => this._view = component} {...this.props}>{items}</View>)
    }
}
class BottomStationLineView extends Component{
   
    _parkBtnClick = (id)=>{
        alert(`press on ${id}`);
        this.props.tempClick(id);
        let model = new UserModel();
        let company = model.getDefaultCompany();
    }
    render(){
        var items = [];
        let num = this.props.num;
        let col = this.props.col;
        for (i = 0;i<num;i ++) {
            let index = col*3 + i;
            let item = <TouchableOpacity style={[styles.normalCell,{backgroundColor:'#00a056'}]} 
            key={index}
            onPress = {()=> this._parkBtnClick(index)} >
            <Text style={[styles.cellTitle]}>{`W${index }地块`}</Text></TouchableOpacity>;
            items.push(item);
        }
        return(<View style={styles.colContainer} ref={component => this._view = component} {...this.props}>{items}</View>)
    }
}

const styles = StyleSheet.create({
    normalCell:{
        borderRadius:20,
        height:40,
        marginLeft:20,
        justifyContent:'center',
    },
    cellTitle:{
        color:'#333',
        fontSize:16,
        padding:10,
    },
    colContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        marginTop:17,
        marginLeft:17,
        marginRight:17,
    }
});

