import React, {Component} from 'react';
// import {Button} from 'antd-mobile'
import {connect} from 'react-redux';
import { getUserList } from '../../redux/chatuser.redux';
import UserCard from '../usercard/usercard'
@connect(
    state => state.chatuser,
    { getUserList }
)

class Boss extends Component{
    componentDidMount(){
        this.props.getUserList('genius');
        // console.log(this.props.userlist);
    }
    render(){
        return <UserCard userlist ={this.props.userlist}></UserCard>
        // return null
    }
};
export default Boss;