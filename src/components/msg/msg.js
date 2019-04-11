import React, {Component} from 'react';
import {List,Badge} from 'antd-mobile';
import {connect} from 'react-redux'
@connect(
    state => state,
)
class Msg extends Component{
    // 获取最后一条数据
    getLast = (arr) => {
        return arr[arr.length - 1];
    }
    render(){
        // 按聊天用户分组，根据chatid
        if(this.props.chat.chatmsg.length == 0){
            return null;
        }
        console.log(this.props);
        const Item = List.Item;
        const Brief = Item.Brief
        const userid = this.props.user._id;
        const userinfo = this.props.chat.users;
        const msgGroup = {};
        this.props.chat.chatmsg.map(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v);
            return msgGroup;
        })
        const chatList = Object.values(msgGroup).sort((a,b) => {
            const a_last = this.getLast(a).creat_time;
            const b_last = this.getLast(b).creat_time;
            return b_last - a_last;
        })
        console.log(chatList);
        return(
            <div>
                {chatList.map(v => {
                    console.log(v);
                    const lastItem = this.getLast(v);
                    const targetId = userid === v[0].from ? v[0].to: v[0].from;
                    const unReadNum = v.filter( v => !v.read && v.to == userid).length;
                    console.log(unReadNum);
                    const username = userinfo[targetId] && userinfo[targetId].name;
                    const userAvater = userinfo[targetId] && userinfo[targetId].avatar;
                    return(
                        <List  key={lastItem._id}>
                            <Item
                                badge={unReadNum}
                                extra={<Badge text={unReadNum}></Badge>}
                                thumb = {require(`../img/${userAvater}.png`)}
                                arrow="horizontal"
                                onClick={() => {
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                            >{lastItem.content}
                                <Brief>{username}</Brief>
                            </Item>
                        </List>
                    )
                    
                })}  
            </div>
        )
    }
}
export default Msg