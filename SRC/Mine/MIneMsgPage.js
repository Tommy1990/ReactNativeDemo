import React,{Component} from 'react';
import {View,Image,Dimensions,Platform,TouchableOpacity,Text,FlatList} from 'react-native';
import DateModel from '../Base/DateModel';
import REQUEST_URL from '../Base/BaseWeb';
import fehchData from '../Base/FetchData';

export default class MineMsgPage extends Component{
   constructor(props){
       super(props);
       this.state={
           leftList:[],
           rightList:[],
           currentPage:1,
           totalPage:1,
       }
   }
   componentDidMount(){
        this._setData();
   }
   _setData = ()=>{
       let list = [{id:1,title:'项目消息',num:0,isSelected:true},
       {id:2,title:'警报消息',num:0,isSelected:false},
       {id:3,title:'日志消息',num:0,isSelected:false}]
       this.setState({
           leftList:list
       })
       this._fetchMsgNums(list);
       this._fetchMsgList(list[0].id)
   }
   _fetchMsgNums = (list)=>{
       let url = new REQUEST_URL()
       let para = {};
       fehchData(url.MINE_MSG_NUM,para,(respond,err)=>{
           if(err !== null){
               alert(err.message)
           }else{
               for (j=0;j<list.length;j++){
                   for(i=0;i<respond.length;i++){
                       if (respond[i].nf_type == list[j].id){
                           list[j].num = respond[i].num
                           break
                       }
                       if(i === respond.length -1){
                           list[j].num = 0
                       }
                   }
                   if (respond.length === 0){
                       list[j].num = 0
                   }
               }
               this.setState({
                   leftList:list
               })
           }
       })
   }
   _fetchMsgList = (id)=>{
        let url = new REQUEST_URL();
        let para ={type:id,page:this.state.currentPage,limit:20}
        fehchData(url.MINE_MSG_LIST,para,(respond,err)=>{
            if (err !== null){
                alert(err.message)
            }else{
                let list = this.state.rightList;
                if(this.state.currentPage == 1){
                    list = respond.data
                }else{
                    list = [...list,...respond.data]
                }
                this.setState({
                    currentPage:respond.current_page,
                    totalPage:respond.pageCount,
                    rightList:list
                })

            }
        })
   }
   _postRightItemRead = (item)=>{
        let url = new REQUEST_URL();
        let para = {id:item.id};
        fehchData(url.MINE_MSG_READ,para,(respond,err)=>{
            if (err !== null){
                alert(err.message)
            }else{
                this._fetchMsgNums(this.state.leftList);
            }
        })
   }
    _backPress = ()=>{
        this.props.navigation.goBack();
    }
    _readAllPress = ()=>{
        let url = new REQUEST_URL();
        let para = {}
        fehchData(url.MINE_MSG_ALL_READ,para,(respond,err)=>{
            if(err !== null){
                alert(err.message)
            }else{
                this._fetchMsgNums(this.state.leftList);
            }
        })
    }
    _leftItemPress = (item)=>{
        let list = this.state.leftList;
        for (i=0;i<list.length;i++){
            if (list[i].id === item.id){
                list[i].isSelected = true
                this._fetchMsgList(list[i].id)
            }else{
                list[i].isSelected = false
            } 
        }
        this.setState({
            leftList:list
        })

    }
    _rightItemPress = (item)=>{
        if (item.nf_isSeeStatus === 0){
            this._postRightItemRead(item)
        }
    }
    render(){
        let {width,height} = Dimensions.get('window');
        let statueHeight = 44+ 20;
        if(Platform.OS === 'ios' && height > 811){
            statueHeight = 44+44
        }
        return(
           <View style={{flex:1,backgroundColor:'#fff'}}>
               <View style={{width:'100%',height:statueHeight,borderBottomWidth:1,borderBottomColor:'#eee',
                position:'relative',alignItems:'flex-end',justifyContent:'space-between',flexDirection:'row'}}>
                <TouchableOpacity 
                onPress= {()=> this._backPress()}
                hitSlop={{left:20,right:20,top:20,bottom:10}}
                style={{alignItems:'center',justifyContent:'center',marginLeft:21,marginBottom:16.5}}>
                <Image source={require('../../img/back.png')} style={{width:10,height:17}} resizeMode='contain'></Image>
                </TouchableOpacity>
                <View
                style={{marginBottom:16.5,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>消息提醒</Text>
                </View>
                <TouchableOpacity 
                onPress = {()=> this._readAllPress()}
                hitSlop={{left:20,right:20,top:20,bottom:10}}
                style={{alignItems:'center',justifyContent:'center',marginRight:21,marginBottom:16.5}}>
                    <Text style={{color:'#333',fontSize:14}}>全部已读</Text>
                </TouchableOpacity>
                </View>
                <View style={{width:'100%',height:height-statueHeight,flexDirection:'row'}}>
                <FlatList
                style={{width:'34%',height:'100%',borderRightColor:'#eee',borderRightWidth:1}}
                data= {this.state.leftList}
                renderItem = {({item})=>(
                    <TouchableOpacity 
                    onPress={()=> this._leftItemPress(item)}
                    style={{width:'100%',height:53,justifyContent:'center',alignItems:'center',
                    backgroundColor: item.isSelected ? '#00a056' : '#fff',position:'relative'}}>
                        <Text style={{color: item.isSelected ? '#fff' : '#333'}}>{item.title}</Text>
                        <View style={{position:'absolute',borderRadius:10,height:20,
                        backgroundColor:'red',opacity: item.num === 0 ? 0 : 1,
                        alignItems:'center',justifyContent:'center',top:9,right:12}}>
                        <Text>{item.num > 99 ? '99+' : item.num}</Text>
                        </View>
                    </TouchableOpacity>
                    )}
                keyExtractor= {({item,index})=> index*10000}
                />
                <FlatList
                    style={{width:'67%',height:'100%'}}
                    data={this.state.rightList}
                    renderItem = {({item})=>(
                        <TouchableOpacity
                        onPress = {()=>this._rightItemPress(item)}
                        style={{width:'100%',justifyContent:'flex-start',padding:14,paddingRight:21.5}}>
                            <Text style={{fontSize:14,color: item.nf_isSeeStatus?"#eee" : '#333',textAlign:'left'}}
                            numberOfLines={0}>{item.nf_content}</Text>
                            <View style={{width:'100%',marginTop:10,flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{color:item.nf_isSeeStatus?'#eee':'blue'}}>
                                {(new DateModel).getYMDHms(item.nf_createTime)}
                            </Text>
                            <Text style={{color:item.nf_isSeeStatus?'#eee':'blue'}}>查看详情</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                        keyExtractor={(item,index) => item !== null ? item.id : index*1000}
                />
                </View>
           </View>
        )
    }
}