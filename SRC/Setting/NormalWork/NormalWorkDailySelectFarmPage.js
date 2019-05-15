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
        for(i=0;i<seedings.length;i++){
            for (j=0;j<seedings.length;j++){

            }
        }
        this.setState({
            selectPark:parkModel,
            plotList:plotList
        })
        this.listener = DeviceEventEmitter.addListener('submit',()=>{

        })
    }
    componentWillUnmount(){
        this.listener.remove();
    }
    _farmBtnPress = (model)=>{
        this.setState({
            showmodel:model,
            showModal:true
        })
    }
    _seedPress = (seed)=>{
        seed.selected = !seed.selected;
        let list = this.state.plotList;
        for(i=0;i<list.length;i++){
            if (list[i].id == seed.nf_plotId){
                for(j=0;j<list[i].seedlingInfo.length;j++){
                    if(seed.id == list[i].seedlingInfo[j].id){
                        list[i].seedlingInfo[j].selected = seed.selected;
                        break;
                    }
                }
                break;
            }
        }
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
               <Text style={{color:farmModel.selected?'#fff':'#00a056'}}>{farmModel.nf_plotName}</Text>
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
            let seedsList = this.state.showmodel.seedlingInfo
            for(i=0;i<seedsList.length;i++){
                let str = seedsList[i].nf_seedlingName + '-' + timer.getNowYMDStr(seedsList[i].nf_plantTime)
                let seed = (<TouchableOpacity 
                    onPress = {()=>{
                        this._seedPress(seedsList[i])
                    }}
                    key = {seedsList[i].id}
                style={{height:28,borderRadius:14,borderColor:'#eee',borderWidth:1,paddingLeft:14,paddingRight:14,
                justifyContent:'center',marginRight:8,marginBottom:12}}>
                <Text style={{color:'#5b5b5b'}}>{str}</Text>
                </TouchableOpacity>)
                seedinfos.push(seed)
            }
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
                    showModal:false
                })
            }}
             style={{justifyContent:'flex-end',alignItems:'center'}}>
            <View style={{width:screenWidth,height:'35%',backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:45,
                borderBottomColor:'#eee',borderBottomWidth:0.5}} >
                <TouchableOpacity style={{marginLeft:21}} 
                onPress = {()=>{
                    this.setState({
                        showModal:false
                    })
                }}
                hitSlop={{top:10,bottom:10,left:10,right:10}}>

                    <Image source={require('../../../img/close.png')} style={{width:16.5,height:11.5}} resizeMode='contain'/>
                </TouchableOpacity >
                <Text style={{color:'#333',fontSize:15}}>请选择{farmstr}苗木</Text>
                <TouchableOpacity style={{marginRight:21}}
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