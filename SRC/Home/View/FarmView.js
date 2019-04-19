import React,{Component} from 'react';
import {View,TouchableOpacity,Text,ScrollView,StyleSheet,Image,Dimensions} from 'react-native';
import commenStyle from '../../Base/CommenStyle';
import UserModel from '../../Base/UserModel';
export default class FarmView extends Component{
    
   setNativeProps = (nativeProps) => {
        this._bottomStation.setNativeProps(nativeProps);
   }
   _framBtnClick = (i)=>{
        this.props.tempNavigation.navigate('ChildFirst',{id:i})
   }
    
    render(){
        
        var list = [];
        var img = require('../../../img/image_placeholder.png')
        if (this.props.farmModel != null){
             list = this.props.farmModel.plotInfo; 
            // alert(JSON.stringify(this.props.farmModel))
             img = {uri:this.props.farmModel.plotPic}  
            
        }
        return(
            <View style={commenStyle.parkBottomContainer}>
            <ScrollView ref = {component => this._scrollView = component}{...this.props}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <Image style={{width:'80%',height:200,marginLeft:20,borderRadius:5}} source={img}/></View> 
            <BottomStationView tempClick={this._framBtnClick} list = {list} ref={component => this._bottomStation}{...this.props}></BottomStationView>
            </ScrollView>
            </View>
        )
    }
}

class BottomStationView extends Component{
   
    render(){
       
        var items = [];
        var col = 0;
        if (this.props.list !== null){
            let length = this.props.list.length;
            col = Math.ceil(length/3);
        }
        for (i = 0;i<col;i ++) {
            let tempList = this.props.list.slice(i*3,(i+1)*3);
            let item = <BottomStationLineView list={tempList} col = {i} key={i} tempClick = {this.props.tempClick} />;
            items.push(item);
        }
        return(<View ref={component => this._view = component} {...this.props}>{items}</View>)
    }
}
class BottomStationLineView extends Component{
   
    _parkBtnClick = async(id)=>{
        alert(`press on ${id}`);
        this.props.tempClick(id);
        let model = new UserModel();
        let company = await model.getDefaultCompany();
        console.log(`1234567890=${company.companyName}`)
    }
    render(){
        var items = [];
        let num = this.props.list.length;
        let col = this.props.col;
        let {width,height} = Dimensions.get('window');
        let gap = 20
        let btnWidth = (width - 20*5)/3;
        for (i = 0;i<num;i ++) {
            let index = col*3 + i;
            let model = this.props.list[i];
            let item = <TouchableOpacity style={[styles.normalCell,{backgroundColor:'#00a056',width:btnWidth}]} 
            key={index}
            onPress = {()=> this._parkBtnClick(index)} >
            <Text style={[styles.cellTitle]}>{model.nf_plotName}</Text></TouchableOpacity>;
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
        alignItems: 'center',
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

