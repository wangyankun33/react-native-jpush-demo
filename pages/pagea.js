import React,{Component} from 'react';
import {View,Text,Button} from 'react-native';
import JPush from 'jpush-react-native';

export default class Pagea extends Component{
    constructor(props){
        super(props);
        this.state={
            RegistrationID:''
        };
    }
    componentDidMount(): void {
        JPush.notifyJSDidLoad((data)=>{});
        JPush.getRegistrationID((registId)=>{
            console.log(registId);
            this.setState({RegistrationID:registId.toString()})
        });
        ///接收推送事件
        JPush.addReceiveNotificationListener((message)=>{
            console.log('message',message);
            alert('推送信息'+message.alertContent);
        });
        ///接收自定义消息 仅仅android
        JPush.addReceiveCustomMsgListener((message)=>{
            console.log('message',message);
            alert('接收自定义消息'+message);
        });
        ///点击推送事件
        JPush.addReceiveOpenNotificationListener((data)=>{
            console.log('data',data);
        });
    }
    componentWillUnmount(): void {
        JPush.removeReceiveNotificationListener(()=>{});
        JPush.removeReceiveOpenNotificationListener(()=>{});
        JPush.removeReceiveCustomMsgListener((cb)=>{});
    }

    render(){
        let {navigate}=this.props.navigation;
        let state=this.state;
        return (
            <View>
                <Text>这是A页面</Text>
                <Text>注册Id:{state.RegistrationID}</Text>
                <Button title={'跳转B页面'} onPress={()=>navigate("pageb")}/>
            </View>
        );
    }
}
