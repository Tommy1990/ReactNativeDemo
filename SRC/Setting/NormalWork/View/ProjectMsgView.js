import React,{Component} from 'react';
import {View,Dimensions,Text,FlatList} from 'react-native'
export default class ProjectMsgView extends Component{
    render(){
        const {width} = Dimensions.get('window')
        if (this.props.list === null){
            return <View style={{width:width,height:this.props.height}}>
            </View>
        }
        return(
            
            <FlatList
                style={{width:width,height:this.props.height}}
                data={this.props.list}
                renderItem = {({item})=> <Text>item</Text>}
                onScrollEndDrag = {(event)=> this._scrolling(event)}
                keyExtractor={(item, index) => index}
            />
        )
    }
    _scrolling = (event)=>{
        let gapY = event.nativeEvent.contentOffset.y;
        this.props.scrollFunc(gapY);
    }
}