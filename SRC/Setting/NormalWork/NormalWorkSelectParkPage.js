import React,{Component} from 'react';
import {View,Image,TouchableOpacity,ScrollView,Text,DeviceEventEmitter} from 'react-native';
import REQUEST_URL from '../../Base/BaseWeb';
import fehchData from '../../Base/FetchData';
import BaseDimension from '../../Base/BaseDimension'
export default class NormalWorkSelectParkPage extends Component{
    static navigationOptions = ({navigation}) =>{
        return({
            headerTitle:<Text style={{color:'#333',fontSize:18}}>工作园区及地块</Text>,
            headerBackImage:<Image source={require('../../../img/close.png')} style={{width:12.5,height:12.5,marginLeft:21}} resizeMode='contain'/>,
            headerRight:(<TouchableOpacity style={{marginRight:21}} 
            hitSlop={{top:20,bottom:20,right:20,left:20}}
            onPress={()=>{
                DeviceEventEmitter.emit('submitSelectFarms');
            }}> 
                <Image source={require('../../../img/select.png')} style={{width:16.5,height:11.5}} resizeMode='contain'/>
            </TouchableOpacity>)
        })
    }
    constructor(props){
        super(props);
        this.state={
            list:[],
            selectPark:null
        }
    }
    componentDidMount(){
        
    
        let parksList = this.props.navigation.getParam('parksList',[]);
        let companyId = this.props.navigation.getParam('companyId','');
        let farmIds = this.props.navigation.getParam('farmIds','')
        let selectPark = this.props.navigation.getParam('selectPark',null)
        if (parksList.length > 0){
            if (selectPark !== null){
                let farmIdslist = farmIds.split(',')
                for(i=0;i<selectPark.massifList.length;i++){
                    let farm = selectPark.massifList[i]
                    for(j=0;j<farmIdslist.length;j++){
                        if(farm.id == farmIdslist[j]){
                            farm.selected = true;
                            break
                        }
                    }
                }
                for(i=0;i<parksList.length;i++){
                    parksList[i].selected = parksList[i].id === selectPark.id
                }
            }
            this.setState({
                list:parksList,
                selectPark:selectPark
            })
        }else{
            this._fetchData(companyId,selectPark);
        }
        this.listener = DeviceEventEmitter.addListener('submitSelectFarms',(e)=>{
            let list = this.state.selectPark.massifList
            let idStr = ''
            let parkStr = `${this.state.selectPark.nf_farmName}:\n`
            for(i=0;i<list.length;i++){
                if (list[i].selected){
                    idStr += list[i].id + ','
                    parkStr += list[i].nf_plotName + ','
                }
                if(i == list.length-1){
                    idStr = idStr.slice(0,idStr.length-1)
                    parkStr = parkStr.slice(0,parkStr.length-1);
                }
            }
            let parklist = this.state.list
            for(i=0;i<parklist.length;i++){
                parklist[i].selected = false;
                for(j=0;j<parklist[i].massifList.length;j++){
                    parklist[i].massifList[j].selected = false;
                }
            }
            this.props.navigation.navigate('NormalCreate',{parksList:parklist,farmIds:idStr,parkStr:parkStr,
                selectPark:this.state.selectPark,index:2})
        })
    }
    componentWillUnmount(){
        if(this.listener){
            this.listener.remove();
        }
        
    }
    _fetchData = (companyId,selectPark)=>{
        let url = new REQUEST_URL();
        let para = {companyId:companyId}
        fehchData(url.WORK_NORMAL_FARMS_LIST,para,(respond,err)=>{
            if(err !== null){
                alert(err.message)
            }else{
                if (selectPark !== null){
                    for(i=0;i<respond.length;i++){
                        respond[i].selected = selectPark.id === respond[i].id
                    }
                }else{
                    for(i=0;i<respond.length;i++){
                        respond[i].selected = i == 0;
                    }
                    this.setState({
                        selectPark:respond[0]
                    })
                }
                this.setState({
                    list:respond,
                })
            }
        })
    }
    _parkBtnPress = (model)=>{
        let list = this.state.list;
        for(i=0;i<list.length;i++){
            list[i].selected = list[i].id == model.id;
        }
        this.setState({
            list:list,
            selectPark:model,
        })
    }
    _farmBtnPress = (model) =>{
        model.selected = !model.selected
        let park = this.state.selectPark
        for(i=0;i<park.massifList.length;i++){
            if (park.massifList[i].id == model.id){
                park.massifList[i].selected = model.selected
                break
            }
        }
        this.setState({
            selectPark:park,
        })

    }
    render(){
        let items = []
        for (i=0;i<this.state.list.length;i++){
            let model = this.state.list[i]
            let item = (<TouchableOpacity 
            onPress={()=> this._parkBtnPress(model)}
            style={{marginLeft:21,height:33.5,paddingTop:12,paddingBottom:6.5}}
            key={model.id}>
                <Text style={{color:model.selected?"#00a056":'#333'}}>{model.nf_farmName}</Text>
            </TouchableOpacity>)
            items.push(item)
        }
        let img = require('../../../img/image_placeholder.png')
        let farms = []
        if (this.state.selectPark !== null){
             if (this.state.selectPark.nf_plotImage.length > 6){
                 img = {uri:this.state.selectPark.nf_plotImage}
             }
             let park = this.state.selectPark
            
             for(i=0;i<park.massifList.length;i++){
                 let farmModel = park.massifList[i]
                 let item = (<TouchableOpacity
                 onPress= {()=> this._farmBtnPress(farmModel)}
                  style={{marginLeft:21,height:28,padding:19,paddingTop:5,paddingBottom:5,
                  borderRadius:14,borderColor:'#00a056',borderWidth:1,marginTop:17,
                  backgroundColor:farmModel.selected?'#00a056':'#fff'}}
                  key={farmModel.id}>
                    <Text style={{color:farmModel.selected?'#fff':'#00a056'}}>{farmModel.nf_plotName}</Text>
                 </TouchableOpacity>)
                 farms.push(item)
             }
        }

        let screen = new BaseDimension()
        let screenWidth = screen.getScreenWidth();
        let screenHeight = screen.getScreenHeight();
        let navHeight = screen.getNavHeight();
        return(
            <View style={{flex:1,justifyContent:'flex-start',alignItems:'center'}}>
            <View style={{width:'100%',height:33.5}}>
            <ScrollView style={{width:screenWidth,height:33.5}} horizontal={true}>
            {items}
            </ScrollView>
            </View>
            <Image source={img} style={{width:screenWidth-42,height:229,borderRadius:8,marginTop:26}} resizeMode="contain"></Image>
            <ScrollView style={{width:'100%',height:screenHeight-299-53-navHeight}}>
            <View style={{flexDirection:'row',padding:21,width:screenWidth,flexWrap:'wrap'}}>
            {farms}
            </View>
            </ScrollView>
            </View>
        )
    }
}