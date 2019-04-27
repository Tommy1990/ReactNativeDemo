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
        proStatusList = [
            {title:'待审核',id:'0'},{title:'进行中',id:'1'},{title:'修改待审核',id:'4'},{title:'已逾期',id:'1002'},
            {title:'已完成',id:'5'},{title:'项目废弃',id:'7'}
        ];
        proRelationList = [
            {title:'我创建的',id:'0'},{title:'我参与的',id:'1'},{title:'抄送我的',id:'2'},{title:'我审批的',id:'3'}
        ];
        monthList = [];
        for (i = 1;i<13;i++){
            let model = {title:`${i}月`,id:`${i}`};
            monthList.push(model);
        }
        let model = new UserModel();
        let companyList = await model.getCompanyList();
        let selectID = this.props.navigation.getParam('id','');
        for (i = 0;i <companyList.length;i++ ){
            let company = companyList[i];
            if (company.id === selectID){
                console.log(`=======${JSON.stringify(company)}`)
                let list = company.park;
                let tempList = []
                for (j=0;j<list.length;j++){
                    let temp = {title:list[j].nf_farmName,id:list[i].id}
                    tempList.push(temp);
                }
                this.setState({
                    parks:tempList,
                })
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
                renderItem = {({item})=>{
                    return(<View style={{width:'100%',marginLeft:21,marginTop:20,marginRight:21}}>
                        <Text style={{color:'#333',fontSize:14}}>{item.des}</Text>
                        <RenderItem  list={item.data} />
                    </View>)
                 }    
                }
                keyExtractor={(item, index) => index}
            />
            <View style={{position:'absolute',flexDirection:'row',left:0,bottom:0,
            width:'100%',height:50,shadowColor:'0003',shadowOffset:{width:2,height:2},justifyContent:'flex-start',alignItems:'center'
            }}
            >
                <TouchableOpacity style={{width:'30%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                    <Text>重置</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'70%',height:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'#00a056'}}>
                    <Text style={{color:'#fff'}}>确认</Text>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
        )
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
           let temp = <RenderColItem list={list} key={i}/>
           
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

        for(i=0;i<this.props.list.length;i++){
            let model = this.props.list[i];
            let leftGap = i === 0 ? 0 : 13
            let item =(<TouchableOpacity
             style={{justifyContent:'center',alignItems:'center',height:24,borderRadius:12,borderWidth:1,borderColor:'#eee',marginLeft:leftGap}}>
                <Text key={i} style={{marginLeft:13,marginRight:13}}>{model.title} </Text>
            </TouchableOpacity>)
            items.push(item);
        }
        return(
            <View style={{flexDirection:'row',justifyContent:'flex-start',marginTop:14}}>{items}</View>
        )
    }
}