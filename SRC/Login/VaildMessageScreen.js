import React,{Component} from 'react';
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,TextInput} from 'react-native';
import CommenStyle from '../Base/CommenStyle'
import REQUST_URL from '../Base/BaseWeb'
import fetchData from '../Base/FetchData'
export default class VaildMessageScreen extends Component{
    static navigationOptions = {
        header:null,
    }
    constructor(props){
        super(props);
        const {navigation} = this.props;
        const phoneNum = navigation.getParam('phone','')
        this.state = {
            phone:phoneNum,
            msg:'',
            showMsg:'点击获取验证码',
            msgGetEnable:phoneNum.length == 11,
            submitEnable:false,
            msgToken:'',
            timeDuration:10,
        };
    }
    _closeBtnOnpress = ()=>{
        this.props.navigation.goBack();
    }
    _phoneChanged = (value)=>{
        this.setState({
            phone:value,
        });
        if (this.state.phone.length >= 10){
            this.setState({
                msgGetEnable:true,
            })
        }else{
            this.setState({
                msgGetEnable:false,
            })
        }
    }
    _msgChanged = (value)=>{
        this.setState({
            msg:value,
        })
    }
    _msgBtnOnpress = () => {
        let url = new REQUST_URL();
        fetchData(url.SEND_MSG,{mobile:this.state.phone,type:0},(responde,error)=>{
            if (error!=null){
                alert(error)
            }else{
                this.setState({
                    msgToken:responde.key,
                })
            }
        })
     this._phoneInput.blur();
       let timer = setInterval(()=>{
            let time = this.state.timeDuration - 1;
            if (time > 0){
                this.setState({
                    timeDuration:time,
                    showMsg:`${time}s后再次获取数据`,
                    msgGetEnable:false,
                })

            }else{
                this.setState({
                    timeDuration:10,
                    showMsg:'获取验证码',
                    msgGetEnable:true,
                }) ;
                clearInterval(timer);
            }
            
        },1000)
    }
    render(){
        
        return(<SafeAreaView style={CommenStyle.container}>
        <View style={styles.closeContainer}>
        <TouchableOpacity style={styles.closeBtn} onPress={this._closeBtnOnpress}>
        <Text style={styles.closeBtnTitle}>✘</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.title}>手机验证</Text>
        <View style={styles.phoneContainer}>
        <Text style={styles.phoneTitle}>手机:</Text>
        <TextInput style={styles.phoneInput}
         value={this.state.phone} 
         onChangeText={this._phoneChanged} 
         placeholder='请输入手机号'
         returnKeyType='done'
         maxLength={11}
         keyboardType = 'phone-pad'
         ref = {componet => this._phoneInput = componet}
         />
        </View>
        <View style={styles.pswdContainer}>
        <Text style={styles.msgTitle}>验证码:</Text>
        <TextInput style={styles.msgInput} 
        value={this.state.msg} 
        onChangeText={this._msgChanged} 
        placeholder='请输入短信验证码'
        maxLength={4}
        keyboardType = 'numeric'
        ref = {component => this._pswdInput = component}/>
        <TouchableOpacity style={[styles.msgBtn,{backgroundColor: this.state.msgGetEnable ? '#00a056' : '#eee'}]}
         onPress={this._msgBtnOnpress}
         disabled = {!this.state.msgGetEnable}
         >
        <Text style={[styles.msgBtnTitle,{color: this.state.msgGetEnable ? '#fff' : '#333'}]}>{this.state.showMsg}</Text>
        </TouchableOpacity>
        </View>
        </SafeAreaView>)
    }
}

const styles = StyleSheet.create({
    closeContainer:{
        width:'80%',
        height:44,
        marginTop:22,
        marginLeft:44,
        alignItems:'flex-start',
        justifyContent:'flex-start',
    },
    closeBtn:{
        width:44,
        height:44,
        
    },
    closeBtnTitle:{
        fontSize:20,
        fontWeight:'bold',
    },
    title:{
        fontSize:36,
        fontWeight:'bold',
        marginLeft:44
    },
    phoneContainer:{
        width:'80%',
        height:44,
        alignItems:'center',
        justifyContent:'flex-start',
        flexDirection:'row',
        marginTop:44,
        marginLeft:44,
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
    },
    phoneTitle:{
        fontSize:14,
        color:'#333',
        
    },
    phoneInput:{
        marginLeft:20,
        width:180,
        height:40,
    },
    pswdContainer:{
        width:'80%',
        height:44,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop:20,
        marginLeft:44,
        borderBottomColor:'#eee',
        borderBottomWidth:1,
    },
    msgTitle:{
        fontSize:14,
        color:'#333',
    },
    msgInput:{
        marginLeft:20,
        width:140,
        height:40,
    },
    msgBtn:{
        width:100,
        height:25,
        borderRadius:12.5,
        marginRight:0,
        justifyContent:'center',
        alignItems:'center',
    },
    msgBtnTitle:{
       
        fontSize:14,
    }
})