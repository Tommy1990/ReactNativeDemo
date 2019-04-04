import React,{Component} from 'react';
import {View,TouchableOpacity,Text,TextInput,StyleSheet,SafeAreaView} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import commenStyles from '../Base/CommenStyle.js'
import REQUEST_URL from '../Base/BaseWeb'
import fetchData from '../Base/FetchData'
import UserModel from '../Base/UserModel'
export default class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            pwd:'',
            showPwd:false,
            submitBtnEnable:false
        };
    }
    changColors = ()=>{
        this._logBtn.setNativeProps({submitBtnEnable})
    }
    static navigationOptions = {
        header:null,
    }

    _showPswdToggle = ()=>{
        this.setState({
            showPwd: !this.state.showPwd
        })
    }
    _phoneNumChnaged = (text)=>{
        this.setState({phone:text})
        let res = this._vaildLogbtnEnable();
        
        this.setState({
            submitBtnEnable: res,
        })
    }
    _pswdNumChnaged = (text)=>{
        this.setState({pwd:text})
        let res = this._vaildLogbtnEnable();
        this.setState({
            submitBtnEnable: res,
        })
    }
    _vaildLogbtnEnable(){
        let phone = this.state.phone;
        let pswd = this.state.pwd;
        return ((phone.length == 11) && (pswd.length > 5) && (pswd.length < 17))
    }
    _loginBtnclick = () => {
        this._phoneInput.blur();
        this._pswdInput.blur();
        let params = {mobile:this.state.phone,pass:this.state.pwd}
        let url = new REQUEST_URL();
        fetchData(url.LOG_IN,params,(respondData,errorInfo)=>{
            // alert(respondData.userInfo.userName)
            if (errorInfo !== null ){
                alert(errorInfo); 
            }else{
                alert('set data');
                let model = new UserModel();
                model.setLoginData(respondData);
            }
        })
    }
    _forgetBtnClick = () =>{
        this.props.navigation.navigate('Vaild',{
            phone:this.state.phone,
        });
        
    }
    render() {
        return (
           <SafeAreaView style={commenStyles.containerNormal}>
           
           <Text style={styles.title}>农法自然</Text>
           <View style={styles.inputContainer1}>
           <Text style={styles.text}>电话:</Text>
            <TextInput style={styles.input} 
            placeholder="请输入手机号"  
            returnKeyType = 'next'
            returnKeyLabel = '下一项'
            maxLength = {11}
            keyboardType = 'phone-pad'
            onChangeText = {this._phoneNumChnaged}
            value = {this.state.phone}
            ref = {component=> this._phoneInput = component}
            ></TextInput>
           </View>
           <View style={styles.inputContainer2}>
           <Text style={styles.text}>密码</Text>
           <TextInput style={styles.input} 
           placeholder='请输入密码'
           returnKeyType = 'done'
           returnKeyLabel = '完成'
           maxLength = {16}
           textContentType = 'password'
           secureTextEntry = {!this.state.showPwd}
           onChangeText = {this._pswdNumChnaged}
           value = {this.state.pwd}
           ref = {component => this._pswdInput = component}
           >
           </TextInput>
           <TouchableOpacity 
           style={styles.showButton} 
           onPress={this._showPswdToggle} >
           <Text style={styles.showButton}>{this.state.showPwd ? '隐藏' : '显示'}</Text>
           </TouchableOpacity>
           </View>
           <TouchableOpacity style={[styles.button,{backgroundColor: this.state.submitBtnEnable ? '#00a056' : '#ccc'}]}
            onPress={this._loginBtnclick}
            disabled = {!this.state.submitBtnEnable}
            ref ={component => this._logBtn = component}
            >
            <Text style={styles.logBtnTitle}>登录</Text></TouchableOpacity>
            <TouchableOpacity style={styles.fogetButton} onPress={this._forgetBtnClick}>
            <Text style={styles.fogetTitle}>忘记密码</Text>
            </TouchableOpacity>
           </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    title:{
        fontWeight:'bold',
        fontSize:25,
        color:'#00a056',
        marginTop:'50%',
    },
    inputContainer1:{
        width:'80%',
        height:20,
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'center',
        marginTop:45,
    },
    inputContainer2:{
        width:'80%',
        height:20,
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'center',
        marginTop:35,
    },
    text:{
        color:'#333',
        fontSize:14,
        width:35,
    },
    input:{
        width:200,
        marginLeft:20,
        fontSize:14,
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    },
    showButton:{
        color:'#333',
        fontSize:14,
        width:30,
    },
    button:{
        borderColor:'#666',
        width:300,
        height:40,
        borderRadius:20,
        marginTop:45,
        alignItems:'center',
        justifyContent:'center',
    },
    logBtnTitle:{
        color:'white',
        fontSize:15,
        fontWeight:'bold',
    },
    fogetButton:{
        alignItems:'flex-end',
        justifyContent:'center',
        width:300,
        height:40
    },
    fogetTitle:{
        color:'#00a056',
        fontSize:12,
        paddingTop:10,
    }
})