import React ,{Component} from 'react';
import {View,TouchableOpacity,Text,Image,ScrollView,DeviceEventEmitter} from 'react-native';
import Modal from 'react-native-modal'
import BaseDimension from '../../Base/BaseDimension'
import DateModel from '../../Base/DateModel';
export default class NormalWorkDailySelectFarmPage extends Component{

    static navigationOptions = ({navigation})=>{
        return {
            headerTitle:(<Text style={{fontSize:18,color:'#333'}}>请选择工作园区及苗木</Text>),
            headerBackImage:<Image source={require('../../../img/close.png')} style={{width:12.5,height:12.5,marginLeft:21.5}}/>,
            headerBackTitle: null,
            headerRight:(<TouchableOpacity hitSlop={{top:10,right:10,bottom:10,left:10}}
                onPress = {()=>{
                    DeviceEventEmitter.emit('submit');
                }}
            style={{marginRight:21}}>
                <Image style={{width:16.5,height:11.5}} resizeMode='contain' source={require('../../../img/select.png')}/>
            </TouchableOpacity>)
        }
    }
    constructor(props){
        super(props);
        this.state = {
            selectPark:null,
            plotList:[],
            showModal:false,
            showmodel:null
        }
    }
   
    componentDidMount(){
        let parkModel = this.props.navigation.getParam('parkModel',null);
        let plotList = this.props.navigation.getParam('nf_plotId',[]);
        let seedings = this.props.navigation.getParam('seedings',[]);
        for(i=0;i<plotList.length;i++){
            plotList[i].selected = false
            plotList[i].showStr = plotList[i].nf_plotName
            for(j=0;j<plotList[i].seedlingInfo.length;j++){
                plotList[i].seedlingInfo[j].selected = false
            }
        }
        for(i=0;i<seedings.length;i++){
            for(j=0;j<plotList.length;j++){
                if(plotList[j].id == seedings[i].plotId){
                    let strList = seedings[i].seedlingId.split(',')
                    plotList[j].selected = true
                    let seedsList = plotList[j].seedlingInfo 
                    let str = ''
                    for (k=0;k<seedsList.length;k++){
                        for(m=0;m<strList.length;m++){
                            if (seedsList[k].id == strList[m]){
                                seedsList[k].selected = true
                                str += seedsList[k].nf_seedlingName + ','
                                break
                            }
                        }
                    }
                    str = str.slice(0,str.length-1)
                    plotList[j].showStr = plotList[j].nf_plotName + `(${str})`
                    break
                }
            }

        }
        this.setState({
            selectPark:parkModel,
            plotList:plotList
        })
        this.listener = DeviceEventEmitter.addListener('submit',()=>{
            this._submitInfoPress()
        })
    }
    _submitInfoPress= ()=>{
        let list = this.state.plotList
        let seedIdList = []
        let parkStr = ''
        let timer = new DateModel()
        for(i=0;i<list.length;i++){
            if(list[i].selected){
                let str = ''
                let parkTemp = ''
                for(j=0;j<list[i].seedlingInfo.length;j++){
                    if(list[i].seedlingInfo[j].selected){
                        str += list[i].seedlingInfo[j].id + ',';
                        parkTemp += list[i].seedlingInfo[j].nf_seedlingName + '-' + timer.getNowYMDStr(list[i].seedlingInfo[j].nf_plantTime) + '，'
                    }
                }
                parkTemp = parkTemp.slice(0,parkTemp.length-1)
                parkStr += list[i].nf_plotName + `(${parkTemp})，`
                str = str.slice(0,str.length-1)
                let model = {plotId:list[i].id,seedlingId:str}
                seedIdList.push(model)
            }
        }
       
        parkStr = parkStr.slice(0,parkStr.length-1)
        this.props.navigation.navigate('NormalDailyCreate',{
            nf_plotId:list,
            seedings:seedIdList,
            parkStr:parkStr
        })
    }
    componentWillUnmount(){
        this.listener.remove();
    }
    _farmBtnPress = (model)=>{
        let temp = JSON.parse(JSON.stringify(model))
        this.setState({
            showmodel:temp,
            showModal:true
        })
    }
    _seedPress = (seed)=>{
        seed.selected = !seed.selected
        let selectFarm = this.state.showmodel
        
        for(j=0;j<selectFarm.seedlingInfo.length;j++){
            if(seed.id == selectFarm.seedlingInfo[j].id){
                selectFarm.seedlingInfo[j].selected = seed.selected;
            }  
        }
        this.setState({
            showmodel:selectFarm,
        })
    }
    _submitSeedsPress = ()=>{
        let park = this.state.showmodel;
        let list = this.state.plotList;
        let str = ''
        for(i=0;i<park.seedlingInfo.length;i++){
            if(park.seedlingInfo[i].selected){
                str += park.seedlingInfo[i].nf_seedlingName + ','
            }
        }
        if (str.length > 1){
            str = str.slice(0,str.length-1)
            park.showStr = park.nf_plotName + `(${str})`
            park.selected = true
        }else{
            park.showStr = park.nf_plotName
            park.selected = false
        }
        
        for(i=0;i<list.length;i++){
            if(list[i].id == park.id){
                list[i] = park
            }
        }
        this.setState({
            showmodel:null,
            plotList:list,
            showModal:false
        })

    }
    render(){
        let img = require('../../../img/image_placeholder.png')
        let farms = []
        let parkStr = ''
        let park = this.state.selectPark
        let plotList = this.state.plotList;
        if (park !== null){
             if (park.nf_plotImage.length > 6){
                 img = {uri:park.nf_plotImage}
             }
             parkStr = park.nf_farmName;
        }
        for(i=0;i<plotList.length;i++){
            let farmModel = plotList[i]
            let item = (<TouchableOpacity
            onPress= {()=> this._farmBtnPress(farmModel)}
             style={{marginLeft:21,height:28,padding:19,paddingTop:5,paddingBottom:5,
             borderRadius:14,borderColor:'#00a056',borderWidth:1,marginTop:17,
             backgroundColor:farmModel.selected?'#00a056':'#fff'}}
             key={farmModel.id}>
               <Text style={{color:farmModel.selected?'#fff':'#00a056'}}>{farmModel.showStr}</Text>
            </TouchableOpacity>)
            farms.push(item)
        }
        let screen = new BaseDimension()
        let screenWidth = screen.getScreenWidth();
        let screenHeight = screen.getScreenHeight();
        let navHeight = screen.getNavHeight();
        let seedinfos = []
        let farmstr = ''
        let timer = new DateModel()
        if(this.state.showmodel !== null){
            let showmodel = this.state.showmodel;
            farmstr = showmodel.nf_plotName
            let seedsList =  showmodel.seedlingInfo
            for(i=0;i<seedsList.length;i++){
                let model = seedsList[i]
                let str = model.nf_seedlingName + '-' + timer.getNowYMDStr(model.nf_plantTime)
                let seed = (<TouchableOpacity 
                    onPress = {()=>{
                        this._seedPress(model)
                    }}
                    key = {model.id}
                style={{height:28,borderRadius:14,
                    borderColor:model.selected? '#fff':'#eee',
                    backgroundColor:model.selected ? '#00a05699' : '#fff',
                    borderWidth:1,paddingLeft:14,paddingRight:14,
                justifyContent:'center',marginRight:8,marginBottom:12}}>
                <Text style={{color:model.selected ?'#00a056':'#5b5b5b'}}>{str}</Text>
                </TouchableOpacity>)
                seedinfos.push(seed)
            }
        }else{
            seedinfos = []
        }
        return (<View>
              <View 
            style={{marginLeft:21,height:33.5,paddingTop:12}}>
                <Text style={{color:"#00a056"}}>{parkStr}</Text>
            </View>
            <Image source={img} style={{width:screenWidth-42,height:229,borderRadius:8,marginTop:26,marginLeft:21}} 
            resizeMode="contain"></Image>
            <ScrollView style={{width:'100%',height:screenHeight-299-53-navHeight}}>
            <View style={{flexDirection:'row',padding:21,width:screenWidth,flexWrap:'wrap'}}>
            {farms}
            </View>
            </ScrollView>
            <Modal isVisible={this.state.showModal}
            backdropOpacity={0.1}
            onBackdropPress = {()=>{
                this.setState({
                    showModal:false,
                    showmodel:null,
                })
            }}
             style={{justifyContent:'flex-end',alignItems:'center'}}>
            <View style={{width:screenWidth,height:'35%',backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:45,
                borderBottomColor:'#eee',borderBottomWidth:0.5}} >
                <TouchableOpacity style={{marginLeft:21}} 
                onPress = {()=>{
                    this.setState({
                        showModal:false,
                        showmodel:null
                    })
                }}
                hitSlop={{top:10,bottom:10,left:10,right:10}}>

                    <Image source={require('../../../img/close.png')} style={{width:16.5,height:11.5}} resizeMode='contain'/>
                </TouchableOpacity >
                <Text style={{color:'#333',fontSize:15}}>请选择{farmstr}苗木</Text>
                <TouchableOpacity style={{marginRight:21}}
                onPress = {()=>{
                        this._submitSeedsPress();
                }}
                 hitSlop={{top:10,bottom:10,left:10,right:10}}>
                    <Image source={require('../../../img/select.png')} style={{width:12.5,height:12.5}} resizeMode='contain'/>
                </TouchableOpacity>
            </View>
            <View style={{width:'100%',height:'80%'}}>
                <ScrollView style={{flex:1}}>
                    <View style={{width:'100%',paddingLeft:21,paddingRight:21,marginTop:12.5,flexWrap:'wrap',flexDirection:'row'}}>
                        {seedinfos}
                    </View>
                </ScrollView>
            </View>
            </View>
            </Modal>
        </View>)
    }
}