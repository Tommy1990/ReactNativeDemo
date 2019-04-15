import React,{Component} from 'react';
import {SafeAreaView,View,Text,TouchableOpacity,Image,ScrollView,StyleSheet,Dimensions} from 'react-native';
import commenStyle from '../../Base/CommenStyle';
export default class WeatherStationView extends Component{

    render(){
        var list = []
        for (i=0;i<10;i++){
            let model = {};
            model.img = `park_icon${i}`;
            switch(i){
                case 0:
                model.id = 4;
                break;
                case 1:
                model.id = 10;
                break;
                case 2:
                model.id = 1;
                break;
                case 3:
                model.id = 2;
                break;
                case 4:
                model.id = 7;
                break;
                case 5:
                model.id = 8;
                break;
                case 6:
                model.id = 3;
                break;
                case 7:
                model.id = 9;
                break;
                case 8:
                model.id = 5;
                break;
                case 9:
                model.id = 6;
                break;
            }
            list.push(model);
        }
        let {width,height} = Dimensions.get('window');
        let imgWidth = width - 42;
        return(<View style={commenStyle.parkBottomContainer}>
            <ScrollView >
            <Image style={{width:imgWidth,height:200,marginLeft:21,borderRadius:5}} source={require('../../../img/image_placeholder.png')}/>
            <CollectionView list = {list} style={styles.colContainer}/>
            </ScrollView>
        </View>)
    }
}
class CollectionView extends Component{
    render(){
        let num = this.props.list.length;
        let cols = Math.ceil(num / 3);
        let last = num % 3;
        var items = [];
        for (i = 0;i < cols ; i ++){
            let children = this.props.list.slice(i*3,(i+1)*3);
            let item = <ColView list = {children} key = {i} index={i}></ColView>
            items.push(item);

        }
        return(
            <View >{items}</View>
        )
    }
}
class ColView extends Component{
    _onPress = (model)=>{
        
    }
    render(){
        let num = this.props.list.length;
        var items = [];
        let {width,height} = Dimensions.get('window');
        let gap = 11.5;
        let cellWidth = (width - 42 - gap * 2)/3
        for (i=0; i < num; i++){
            let model = this.props.list[i];
            let col = this.props.index;
            
            let item = <TouchableOpacity style={{width:cellWidth,height:109.5,marginLeft:gap,borderRadius:10,backgroundColor:'#fff',justifyContent:'flex-start',alignItems:'center'}}
                        onPress={()=> this._onPress(model)} key={col*3 + i}>
            <Image style={{width:27.5,height:27,resizeMode:'contain',marginTop:25}} source={{uri:model.img}} />
            <Text>{model.val}</Text>
            </TouchableOpacity>
            items.push(item);
            console.log(`1234567890the${col*3 + i} = ${model.img}`);
        }
        return(
        <View style = {{flexDirection:'row', alignItems:'center',justifyContent:'flex-start',width:'100%',height:120,marginLeft:10}}>
        {items}
        </View>)
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
