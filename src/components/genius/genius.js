import React, {Component} from 'react';
import {getUserList} from '../../redux/chatuser.redux'
import {connect} from 'react-redux';
import UserCard from '../usercard/usercard';
@connect(
    state => state.chatuser,
    {getUserList}
)

class Genius extends Component{
    componentDidMount(){
        this.props.getUserList('boss');
        // console.log(this.props.userlist)
    }
    render(){
        return <UserCard userlist={this.props.userlist}></UserCard>
    }
}
export default Genius