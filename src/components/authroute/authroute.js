import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadData} from '../../redux/user.redux';
import axios from 'axios';
@withRouter
@connect(
    state => state.user,
    {loadData}
)
class AuthRoute extends Component{
    componentDidMount(){
        const publicList = ['/login','/register'];
        const pathname = this.props.location.pathname;
        // 如果已经是当前的路由了直接返回
        if(publicList.indexOf(pathname) > -1){
            return null;
        }
        // console.log(this.props.location)
        // this.props.userinfo()
        axios.get('/user/info').then((res) => {
            if(res.data.code === 1){
                this.props.loadData(res.data.data);
                if(this.props.location.pathname.indexOf('chat') > -1){
                    // this.props.history.push(this.props.location.pathname)
                } else {
                    // this.props.history.push('/login')
                    // this.props.history.push(res.data.data.type)
                }
            } else {
                this.props.history.push('/login')
            }
        })
        // 1、是否登录
        // 2、现在的URL地址，login 是否需要跳转的
        // 3、用户的type 是牛人还是boss
        // 4、用户是否完善信息（选择头像，个人简介）
    }
    render(){
        return null
    }
}
export default AuthRoute;