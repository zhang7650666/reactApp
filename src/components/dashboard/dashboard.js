import React, {Component} from 'react';
import {NavBar} from 'antd-mobile';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import NavLinkBar from '../navlink/navlink';
import Boss from '../../components/boss/boss';
import Genius from '../../components/genius/genius';
import User from '../../components/user/user'
import Msg from '../../components/msg/msg'
import {Redirect} from 'react-router-dom'
import {getMsgList, recvMsg} from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim';
@connect(
    state => state,
    { getMsgList, recvMsg }
)
class DashBoard extends Component{
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    render(){
        const {pathname} = this.props.location;
        const user = this.props.user;
        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:user.type == 'genius',
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'Boss列表',
                component:Genius,
                hide:user.type == 'boss',
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg,
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User,
            }
        ]
        const page = navList.find(v => v.path == pathname);
        // console.log(page);
        return (
            <div className="dashboard">
                {pathname !== '/'?<NavBar className="fixed-header" mode="dark">{navList.find(v => v.path === pathname).title}</NavBar>:<Redirect to="/login"/>}
                <div>
                    <QueueAnim type="scaleX" duration={800}>
                        {pathname !== '/'?<Route key={page.path} path={page.path} component={page.component}></Route>:null }
                    </QueueAnim>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}
export default DashBoard;