import React, {Component} from 'react';
import {Button, NavBar, InputItem, List, TextareaItem} from 'antd-mobile';
import {connect} from 'react-redux';
import { Redirect} from 'react-router-dom'
import AvatarSelector from '../avatar/avatar';
import {update} from '../../redux/user.redux';
@connect(
    state => state.user,
    {update}
)
class BossInfo extends Component{
    state = {
        title:'It',
        company:'中国',
        money:'100000000000000',
        desc:'工作少，薪资高'
    }
    // 招聘职位选择
    handleChange(key, val){
        this.setState({
            [key]:val
        })
    }
    // 保存信息
    handleSave = () => {
        this.props.update(this.state);
    }
    render(){
        const path = this.props.location.pathname
		const redirect = this.props.redirectTo
        return (
            <div className="bossinfo">
                {redirect && redirect != path ? <Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark">Boss完善信息</NavBar>
                <AvatarSelector selectAvatar={(imgname) => {
                    this.setState({
                        avatar:imgname,
                    })
                }}></AvatarSelector> 
                <List>
                    <InputItem 
                        onChange = { (v) => this.handleChange('title', v)}
                        placeholder="请输入你要招聘的职位"
                    >招聘职位</InputItem>
                    <InputItem 
                        onChange = { (v) => this.handleChange('company', v)}
                        placeholder="请输入你的公司名称"
                    >公司名称</InputItem>
                    <InputItem 
                        onChange = { (v) => this.handleChange('money', v)}
                        placeholder="请输入你的薪资范围"
                    >职位薪资</InputItem>
                    <TextareaItem
                        onChange = { (v) => this.handleChange('desc', v)}
                        placeholder="请输入你对职位的要求"
                        rows = {3}
                        autoHeight
                        title="职位要求"
                    ></TextareaItem>
                    <Button type="primary" onClick={this.handleSave}>保存</Button>    
                </List>
            </div>
        )
    }
}

export default BossInfo;