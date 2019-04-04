import React,{Component} from 'react';
import {SafeAreaView,View,TouchableOpacity,Text,StyleSheet,TextInput} from 'react-native';
import commenStyle from '../Base/CommenStyle';
import REQUEST_URL from '../Base/BaseWeb';
import fehchData from '../Base/FetchData';
export default class ResetPSWDScreen extends Component{
    static navigationOptions = {
        header:null,
    }
    constructor(props){
        super(props);
        const {navigation} = this.props;
        this.state = {
            phone:navigation.getParam('phone',''),
            key:navigation.getParam('key',''),
            newPswd:'',
            newPswd2:'',
            submitEnable:false,
            advice:'',
        }
    }
    _closeBtnOnPress = ()=>{
        this.props.navigation.goBack();
    }
    _pswd1InputChanged = (value)=>{
        this.setState({
            newPswd:value,
            submitEnable: (value.length > 5 && value.length <17)&&(this.state.newPswd2.length > 5 && this.state.newPswd2.length < 17)
        })
    }
    _pswd2InputChanged = (value)=>{
        this.setState({
            newPswd2:value,
            submitEnable: (value.length > 5 && value.length <17)&&(this.state.newPswd.length > 5 && this.state.newPswd.length < 17)
        })

    }
    _submitBtnOnpress = () =>{
        this._pwd1.blur();
        this._pwd2.blur();
        let url = new REQUEST_URL();

        if (this.state.newPswd == this.state.newPswd2){
           fehchData(url.RESET_PSWD,{mobile:this.state.phone,pass:this.state.newPswd,key:this.state.key},(response,error)=>{
               if (error !== null){
                   this.setState({
                       advice:error.message,
                   })
               }else{
                   alert('修改成功');
                   this.props.navigation.goBack();
               }
           }) 
        }else{
            this.setState({
                advice:'两次输入密码不一致'
            })
        }
    }
    render(){
        return(<SafeAreaView style={commenStyle.containerNormal}>
        <View style={styles.closeContainer}>
       <TouchableOpacity style={styles.closeBtn} onPress={this._closeBtnOnPress}>
       <Text style={styles.closeBtnTitle}>×</Text>
       </TouchableOpacity></View>
       <View style={[styles.inputContainer,{justifyContent:'center',borderBottomWidth:0}]}>
       <Text style={{color:'#00a056',fontSize:26,fontWeight:'bold'}}>重新设置密码</Text>
       </View>
       <View style={[styles.inputContainer,{marginTop:22}]}>
       <Text style={styles.inputTitle}>新密码</Text>
       <TextInput style={styles.input} 
       placeholder='请输入新密码' 
       maxLength={16}
       value = {this.state.newPswd}
       onChangeText = {this._pswd1InputChanged}
       ref={component=> this._pwd1 = component}/>
       </View>
       <View style={[styles.inputContainer,{marginTop:12}]}>
       <Text style={styles.inputTitle}>确认密码</Text>
       <TextInput style={styles.input} 
       placeholder='请再次输入新密码' 
       maxLength={16}
       value = {this.state.newPswd2}
       onChangeText = {this._pswd2InputChanged}
       ref={component=> this._pwd2 = component}/>
       </View>
       <View style={[styles.inputContainer,{borderBottomWidth:0}]}>
       <Text style={{color:'#f43530',fontSize:14}}>{this.state.advice}</Text>
       </View>
        <TouchableOpacity style={[styles.submitBtn,{backgroundColor: this.state.submitEnable?'#00a056':'#eee'}]}
        disabled={!this.state.submitEnable} 
        onPress={this._submitBtnOnpress}>
        <Text style={{color:'#fff',fontSize:14}}>确认修改</Text>
        </TouchableOpacity>
        </SafeAreaView>)
    }
}

const styles = StyleSheet.create({
    closeContainer:{
        width:'80%',
        height:44,
        marginLeft:0,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    closeBtn:{
        width:44,
        height:44,
        marginTop:22,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    closeBtnTitle:{
        fontSize:40,
        color:'#333',
        fontWeight:'bold',
    },
    inputContainer:{
        width:'80%',
        height:44,
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    inputTitle:{
        color:'#333',
        fontSize:14
    },
    input:{
        width:200,
        height:44,
        marginLeft:20,
    },
    submitBtn:{
        width:'80%',
        height:40,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    }
})