import React, {Component} from 'react';
import {Button, NavBar, InputItem, TextareaItem, List} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update} from '../../redux/user.redux';
import AvatarSelector from '../avatar/avatar';
@connect(
    state => state.user,
    {update}
)
class GeniusInfo extends Component{
    state = {
        title:'',
        desc:'',
    }
    // 记录输入内容
    handleChange(key, val){
        this.setState({
            [key]:val
        })
    }
    // 保存
    handlSave = () => {
        this.props.update(this.state);
    }
    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo
        return(
            <div className="geniusinfo">
               {redirect && redirect !== path ? <Redirect to={redirect}></Redirect>:null}
               <NavBar mode="dark">牛人完善信息页</NavBar>
               <AvatarSelector selectAvatar={(imgname) => {
                this.setState({
                    avatar:imgname,
                })
            }}></AvatarSelector>
                <List>
                    <InputItem
                        onChange = {(v) => this.handleChange('title', v)}
                    >求职岗位</InputItem>
                    <TextareaItem
                        onChange = {(v) => this.handleChange('desc', v)}
                        title="个人见解"
                        rows = {3}
                        autoHeight
                    >
                    </TextareaItem>
                </List>
                <Button type="primary" onClick={this.handlSave}>保存</Button>
            </div>
        )
    }
}
export default GeniusInfo;