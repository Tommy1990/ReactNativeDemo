import React,{Component} from 'react';
import {SafeAreaView,View,SectionList,ScrollView,TouchableOpacity,Text,Image,FlatList,Dimensions} from 'react-native';
import UserModel from '../../Base/UserModel';
export default class NormalWorkSelectPage extends Component{
    static navigationOptions = ({navigation}) =>{

        return({
            headerTitle:<Text style={{color:'#333',fontSize:18}}>筛选</Text>,
            headerBackImage:<Image source={{uri:'123'}}/>,
            headerRight:(<TouchableOpacity style={{marginRight:21}} 
            hitSlop={{top:20,bottom:20,right:20,left:20}}
            onPress={()=>{
                navigation.goBack();
            }}> 
                <Image source={require('../../../img/close.png')} style={{width:13,height:13}}/>
            </TouchableOpacity>)
        })
    }
    constructor(props){
        super(props);
        this.state = {
            proStatusList:[],
            proRelationList:[],
            monthList:[],
            parks:[],
        }
    }
    componentDidMount(){
        this._setData();
    }
    _setData = async()=>{
        let proStatueArr = this.props.navigation.getParam('proStatusStr','').split(',');
        let proRelationArr = this.props.navigation.getParam('proRelationStr','').split(',');
        let parksArr = this.props.navigation.getParam('parksStr','').split(',');
        let timeArr = this.props.navigation.getParam('timeStr','').split(',');
        
        proStatusList = [
            {title:'待审核',id:'0',isSelected:false},{title:'进行中',id:'1',isSelected:false},
            {title:'修改待审核',id:'4',isSelected:false},{title:'已逾期',id:'1002',isSelected:false},
            {title:'已完成',id:'5',isSelected:false},{title:'项目废弃',id:'7',isSelected:false}
        ];
        proRelationList = [
            {title:'我创建的',id:'0',isSelected:false},{title:'我参与的',id:'1',isSelected:false},
            {title:'抄送我的',id:'2',isSelected:false},{title:'我审批的',id:'3',isSelected:false}
        ];
        monthList = [];
        for (i = 1;i<13;i++){
            let model = {title:`${i}月`,id:`${i}`,isSelected:false};
            monthList.push(model);
        }
        for (i = 0;i< proStatueArr.length;i++){
            for (j=0;j<proStatusList.length;j++){
                if (proStatusList[j].id == proStatueArr[i]){
                    proStatusList[j].isSelected = true;
                }
            }
        }
        for (i = 0;i< proRelationArr.length;i++){
            for (j=0;j<proRelationList.length;j++){
                if (proRelationList[j].id == proRelationArr[i]){
                    proRelationList[j].isSelected = true;
                }
            }
        }
        for (i = 0;i< timeArr.length;i++){
            for (j=0;j<monthList.length;j++){
                if (monthList[j].id == timeArr[i]){
                    monthList[j].isSelected = true;
                }
            }
        }

        let model = new UserModel();
        let companyList = await model.getCompanyList();
        let selectID = this.props.navigation.getParam('company','');
        for (i = 0;i <companyList.length;i++ ){
            let company = companyList[i];
            if (company.id === selectID.id){
                let list = company.park;
                let tempList = []
                for (j=0;j<list.length;j++){
                    let temp = {title:list[j].nf_farmName,id:list[j].id,isSelected:false}
                    tempList.push(temp);
                }
                
                for (i = 0;i< parksArr.length;i++){
                    for (j=0;j<tempList.length;j++){
                        if (tempList[j].id == parksArr[i]){
                            tempList[j].isSelected = true;
                        }
                    }
                }
                this.setState({
                    parks:tempList,
                })
                break;
            }
        }
        
        this.setState({
            proStatusList:proStatusList,
            proRelationList:proRelationList,
            monthList:monthList
        })
    }
    render(){
        return(
            <SafeAreaView style={{position:'relative'}}>
            <FlatList
                style={{width:'100%',height:'100%'}}
                data={[{des:'项目进度',data:this.state.proStatusList},
                {des:'项目关系',data:this.state.proRelationList},
                {des:'园区', data:this.state.parks},
                {des:'时间',data:this.state.monthList}
                ]}
                renderItem = {({item,index})=>{
                    
                    return(<View style={{width:'100%',marginLeft:21,marginTop:20,marginRight:21}}>
                        <Text style={{color:'#333',fontSize:14}}>{item.des}</Text>
                        <RenderItem  list={item.data} index = {index} itemPress={this._itemPress}/>
                    </View>)
                 }    
                }
                keyExtractor={(item, index) => index}
            />
            <View style={{position:'absolute',flexDirection:'row',left:0,bottom:0,
            width:'100%',height:50,shadowColor:'0003',shadowOffset:{width:2,height:2},justifyContent:'flex-start',alignItems:'center'
            }}
            >
                <TouchableOpacity 
                style={{width:'30%',height:'100%',justifyContent:'center',alignItems:'center'}}
                onPress={()=> this._clearSelect()}>
                    <Text>重置</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress ={()=> this._submitClick()}
                style={{width:'70%',height:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'#00a056'}}>
                    <Text style={{color:'#fff'}}>确认</Text>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
        )
    }
    _submitClick = ()=>{
        let proStatusStr = '';
        let proRelationStr ='';
        let parksStr = '';
        let timeStr = '';
        for (i=0;i<this.state.proStatusList.length;i++){
            if (this.state.proStatusList[i].isSelected){
                proStatusStr += this.state.proStatusList[i].id + ','
            }
        }
        proStatusStr = proStatusStr.slice(0,proStatusStr.length-1);
        for (i=0;i<this.state.proRelationList.length;i++){
            if (this.state.proRelationList[i].isSelected){
                proRelationStr += this.state.proRelationList[i].id + ','
            }
        }
        proRelationStr = proRelationStr.slice(0,proRelationStr.length-1);
        for (i=0;i<this.state.parks.length;i++){
            if (this.state.parks[i].isSelected){
                parksStr += this.state.parks[i].id + ','
            }
        }
        parksStr = parksStr.slice(0,parksStr.length-1);
        for (i=0;i<this.state.monthList.length;i++){
            if (this.state.monthList[i].isSelected){
                timeStr += this.state.monthList[i].id + ','
            }
        }
        timeStr = timeStr.slice(0,timeStr.length-1);
        this.props.navigation.navigate('Normalwork',{
            proStatusStr:proStatusStr,
            proRelationStr:proRelationStr,
            parksStr:parksStr,
            timeStr:timeStr,
            changed:true
        })

    }
    _clearSelect = ()=>{
        let list = this.state.proStatusList;
        for(i=0;i<list.length;i++){
            list[i].isSelected = false;
        }
        this.setState({proStatusList:list})
        list = this.state.proRelationList;
        for(i=0;i<list.length;i++){
            list[i].isSelected = false;
        }
        this.setState({proRelationList:list})
        list = this.state.parks;
        for(i=0;i<list.length;i++){
            list[i].isSelected = false;
        }
        this.setState({parks:list})
        list = this.state.monthList;
        for(i=0;i<list.length;i++){
            list[i].isSelected = false;
        }
        this.setState({monthList:list})
    }
    _itemPress = (model,index)=>{
        var list = [];
        switch(index){
            case 0:
            list = this.state.proStatusList;
            break;
            case 1:
            list = this.state.proRelationList;
            break;
            case 2:
            list = this.state.parks;
            break;
            case 3:
            list = this.state.monthList;
            break;
        }
        for (i=0;i<list.length;i++){
            if (model.id == list[i].id){
                list[i].isSelected = model.isSelected;
            }
        }
        switch(index){
            case 0:
            this.setState({
                proStatusList:list})
            break;
            case 1:
            this.setState({
                proRelationList:list
            });
            break;
            case 2:
            this.setState({
                parks:list
            });
            break;
            case 3:
            this.setState({
                monthList:list
            });
            break;
        }
    }
}

class RenderItem extends Component{

    render(){
        if (this.props.list === null){
            return <View></View>
        }
        items = []
        let tempList = []
        //分组
        let {width,height} = Dimensions.get('window');
        let maxLength = width - 44 - 80;
        for (i=0;i<this.props.list.length;i++){
            let temp = this.props.list[i];
            if (tempList.length < 3){
                tempList.push(temp)
            }else{
                let tempStr = ''
                for (j=0;j<tempList.length;j++){
                    let model = tempList[j];
                    tempStr += model.title;
                }
                let viewWidth = tempList.length * (28 + 13) - 13 + (tempStr.length)*13
                if (viewWidth < maxLength){  
                    tempList.push(temp)
                } else{
                    let num = tempList.length
                    let item = []
                    for (s=0;s<num;s++){
                        item.push(tempList[s]);
                     }
                    items.push(item);
                    for (s=0;s< num;s++){
                     tempList.pop();
                    } 
                    i --;
                }
                
            }
            if ((i === (this.props.list.length -1)) && (tempList.length !== 0)){
                let item = []
                let num = tempList.length
                for (s=0;s<num;s++){
                    item.push(tempList[s]);
                }
                items.push(item);
                for (s=0;s< num;s++){
                    tempList.pop();
                }
                
            }
        }
        //元素
        let cols = []
       
        for (i=0;i<items.length;i++){
            let list = items[i];
            let index = new Number(this.props.index)
           let temp = <RenderColItem 
           list={list} key={i + index * 100000 } 
           index = {this.props.index} 
           itemPress={this.props.itemPress}/>
           cols.push(temp);
        }
       
        return(
            <View style={{width:'100%',marginTop:3}}>
                {cols}
            </View>
        )
    }
}
class RenderColItem extends Component{

    
    render(){
        if (this.props.list.length === 0){
            return <View></View>
        }
       
        let items = [];
        _itemPress = (model,index)=>{
            model.isSelected = !model.isSelected;
            this.props.itemPress(model,index);
        }
        for(i=0;i<this.props.list.length;i++){
            let model = this.props.list[i];
            let leftGap = i === 0 ? 0 : 13
            let item =(<TouchableOpacity
            onPress = {()=> _itemPress(model,this.props.index)}
                key={i}
             style={{justifyContent:'center',alignItems:'center',height:24,borderRadius:12,borderWidth:1,marginLeft:leftGap,
             borderColor: model.isSelected ? '#fff' : '#eee',backgroundColor:model.isSelected?'#00a05610' : '#fff'}}>
                <Text  style={{marginLeft:13,marginRight:13,color:model.isSelected?'#00a056':'#333'}}>{model.title} </Text>
            </TouchableOpacity>)
            items.push(item);
        }
        return(
            <View style={{flexDirection:'row',justifyContent:'flex-start',marginTop:14}}>{items}</View>
        )
    }
}