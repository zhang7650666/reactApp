import React, {Component} from 'react';
import { List, InputItem, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {login} from '../../redux/user.redux';
import { Redirect} from 'react-router-dom'
import Logo from '../../components/logo/logo'
import imoocFrom from '../imooc-from/imooc-from'

// function hello() {
//     console.log('hello imooc i love react')
// }
// // hello();
// function Handleaa(fn){
//     return function(){
//         console.log('高阶组件1')
//         fn()
//         console.log('高阶组件2')
//     }
// }
// hello = Handleaa(hello)
// hello();


// function WraperHello(Comp){
    // 高阶组件的属性代理
    // class WrapComp extends Component{
    //     render(){
    //         return(
    //             <div>
    //                 <p>这是一个高阶组件</p>
    //                 <Comp {...this.props}></Comp>
    //             </div>
    //         )
    //     }
    // }

    // 高阶组件的反向继承
//     class WrapComp extends Comp{
//         componentDidMount(){
//             console.log('高阶组件新加生命周期')
//         }
//         render(){
//             return <Comp></Comp>
//         }
//     }
//     return WrapComp;
// }
//  Hello = WraperHello(Hello)
// @WraperHello
// class Hello extends Component{
//     render(){
//         return <h2>高阶组件</h2>
//     }
// }

@connect(
    state => state.user,
    {login}
)
@imoocFrom

class Login extends Component{
    // state = {
    //     user:'',
    //     pwd:'',
    // }
    // 登录
    handleLogin = () => {
        this.props.login(this.props.state);
        // this.props.history.push('/login');
    }
    // 注册
    handleRegister = () => {
        this.props.history.push('/register');
        // this.props.history.push({pathname:'/register',state:{val:123}});
    }
    // 用户名密码
    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     })
    // }
    render(){
        return(
            <div className="login-container">
                {(this.props.redirectTo && this.props.redirectTo !=='/login')? <Redirect to={this.props.redirectTo}></Redirect>:null}
                <Logo></Logo>
                <List>
                    {this.props.msg !== 'success' ? <p className="error-msg">{this.props.msg}</p>:null}
                    <InputItem
                        onChange={v => this.props.handleChange('user',v)}
                    >用户</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v => this.props.handleChange('pwd',v)}
                    >密码</InputItem>
                </List>
                <WhiteSpace/>
                <Button type="primary" onClick={this.handleLogin}>登录</Button>
                <WhiteSpace/>
                <Button type="primary" onClick={this.handleRegister}>注册</Button>
            </div>
        )
    }
}
export default Login