import React, {Component} from 'react';
import { List, InputItem,Radio, WhiteSpace, Button} from 'antd-mobile';
import Logo from '../../components/logo/logo'; // logo组件
import {connect} from 'react-redux';
import { Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux';
import imoocFrom from '../imooc-from/imooc-from'
@connect(
    state => state.user,
    {register},
)
@imoocFrom
class Register extends Component{
    // constructor(props){
    //     super(props);
    //     this.register = this.register.bind(this);
    // }
    componentDidMount(){
        // console.log(this.props.location.state);
        this.props.handleChange('type','genius')
    }
    // state = {
    //     user:'',
    //     pwd:'',
    //     repeartPwd:'',
    //     type:'genius', // 牛人  或则  boss
    // }
    // 获取用户名
    // handleChange(key,val){
    //     this.setState({
    //         [key]:val,
    //     })
    // }
    // 注册
    handleRegister = () => {
        this.props.register(this.props.state);
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return(
            <div className="login-container">
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect>:null}
                <Logo></Logo>
                {/* <h3>注册页面</h3> */}
                <WhiteSpace/>
                <List>
                    {this.props.msg !== 'success' ? <p className="error-msg">{this.props.msg}</p>:null}
                    <WhiteSpace/>
                    <InputItem
                        onChange={(v) =>this.props.handleChange('user', v)}
                    >用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange ={v => this.props.handleChange('pwd',v)}
                    >密码</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange = { v => this.props.handleChange('repeartPwd', v)}
                    >确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem 
                        checked={this.props.state.type == 'genius'}
                        onChange = { v => this.props.handleChange('type', 'genius')}
                    >牛人</RadioItem>
                    <RadioItem 
                        checked={this.props.state.type == 'boss'}
                        onChange = { v => this.props.handleChange('type', 'boss')}
                    >boss</RadioItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                    
                </List>
                <WhiteSpace/>
            </div>
        )
    }
}
export default Register