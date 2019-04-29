import React,{Component} from 'react';
import {View,Text,TouchableOpacity,Slider,Dimensions,Animated,DeviceEventEmitter} from 'react-native';
import UserModel from '../../../Base/UserModel';
import DateModel from '../../../Base/DateModel';

export default class ProjectStatueView extends Component{
    state={
        value:this.props.model.nf_proPlan,
        showText:false,
        cahngeEnable:false,
        timeColor:'#00a056',
        timeRate:'0%',
        beginStr:'-----',
        endStr:'------'
    }
    componentDidMount(){
        this._setData()
    }
    _setData = async()=>{
        let model = this.props.model;
        let {width} = Dimensions.get('window');
        let marginLeft = (width -(13*2 + 17.5*2)) * (this.props.model.nf_proPlan/100) - 17.5;
        DeviceEventEmitter.emit('sliderMove',marginLeft)
        let show = (model.nf_proPlan === '100' || model.nf_proPlan === '0');
        this.setState({
            showText:!show
        })
        let user = new UserModel();
        let userid = await user.getUserID();
        this.setState({
            cahngeEnable:((userid === model.nf_createUserId.id) && (model.nf_proStatus === '1' || model.nf_proStatus === '1002'))
        })
        let time = new DateModel();
        let now = time.getNowTimeseconds();
        let beginTime = model.nf_beginTime;
        let endTime = model.nf_endTime;
        let finishTime = model.nf_finshTime;
        
        this.setState({
            timeColor:(finishTime - endTime > 0 || endTime - now > 0) ? '#00a056' : 'red'
        })
        let rate = Math.floor((now - beginTime)/(endTime - beginTime)*10) 
        this.setState({
            timeRate:rate > 10 ? '100%' : `${rate}0%`,
            beginStr: time.getYMDStr(beginTime),
            endStr: time.getYMDStr(endTime)
        })


    }

    render(){
        
        let {width} = Dimensions.get('window');
        let num = this.state.value/1;
        return(
            <View style={{marginLeft:13,marginRight:13,marginTop:7,marginBottom:7,borderRadius:5,backgroundColor:'#fff'}}>
                <View style={{flexDirection:'row',marginLeft:17.5,marginTop:10,alignItems:'center'}}>
                <Text style={{color:'#333',fontSize:14}}>项目进度</Text>
                <Text style={{color:'#666',fontSize:12}}>（向右滑动调整项目进度）</Text>
                <TouchableOpacity 
                style={{backgroundColor:this.state.cahngeEnable?'#00a056':'#eee',marginLeft:48.5,
                borderRadius:6,justifyContent:'center',alignItems:'center',width:73,height:24.5}}
                onPress={()=> alert('')}>
                <Text style={{color:this.state.cahngeEnable?'#fff':'#333',fontSize:14}}>确认调整</Text>
                </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:17.5}}>
                <MoveView/>
                <Text style={{opacity: this.state.showText?1.0:0.0}}>{this.state.value}%</Text>
                </View>
                <Slider style={{marginLeft:17.5,marginRight:17.5,marginTop:7}}
                maximumValue={100}
                minimumValue={0}
                minimumTrackTintColor='#00a056'
                disabled={!this.state.cahngeEnable}
                onSlidingComplete={(value)=> {
                    let marginLeft = (width -(13*2 + 17.5*2)) * (value/100) - 17.5;
                    DeviceEventEmitter.emit('sliderMove',marginLeft)
                }}
                onValueChange={(value)=>
                    this.setState({
                        value:value,
                        showText:!(value === 100 || value === 0)
                    })
                }
                step={10}
                value={num}
                thumbTintColor='#00a056'
                />
                <View style={{marginLeft:17.5,marginRight:17.5,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text>0%</Text><Text>100%</Text>
                </View>
                <Text style={{marginLeft:17.5,marginTop:10}}>时间进度</Text>
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:17.5,marginRight:17.5,marginTop:10,justifyContent:'space-between'}}>
                <View style={{position:'relative',borderRadius:3,height:6,backgroundColor:'#eee',width:'80%'}}>
                <View style={{position:'absolute',borderRadius:3,height:6,width:this.state.timeRate,backgroundColor:this.state.timeColor}}></View>
                </View>
                <Text style={{color:this.state.timeColor}}>{this.state.timeRate}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:17.5,marginRight:17.5,marginTop:6,marginBottom:10}}>
                <Text>{this.state.beginStr}</Text>
                <Text>{this.state.endStr}</Text>
                </View>
            </View>
        )
    }
}


class MoveView extends Component{
 
    state = {
        value: new Animated.Value(0)
    }

    _animated = (toValue) =>{
        Animated.timing(this.state.value,this.setState({
            value:toValue
        }),1000)
    }
    componentDidMount(){
        this.listener = DeviceEventEmitter.addListener('sliderMove',(e)=>{
            this._animated(e)
        })
    }
    componentWillUnmount(){
        this.listener.remove();
    }
    render(){
        
        return(
            <Animated.View style={{...this.props.style,width:this.state.value,height:10}}></Animated.View>
        )
    }
}