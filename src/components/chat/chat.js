import React,{Component} from 'react';
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile';
// import io from 'socket.io-client';
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util';
import QueueAnim from 'rc-queue-anim';
// 由于现在是跨域的所以需要这样写
// const socket = io('ws://localhost:9093')
@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends Component{
    state = {
        text:'',
        msg:[]
    };
    componentDidMount(){
        // socket.on('recvmsg', (data) => {
        //     this.setState({
        //        msg: [...this.state.msg, data.text],
        //     })
        // })
        // this.props.searcha();
        console.log(this.props); 
        // this.props.history.push(this.props.location.pathname)                
        // this.props.history.push(`/${this.props.location.pathname}`)
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
        
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        },0)
    }
    componentWillUnmount(){
        // console.log(this.props.match.params.user);
        const to = this.props.match.params.user;
        this.props.readMsg(to);
    }
    handleSubmit = () => {
        // console.log(this.state.text)
        // console.log(this.props);
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        // console.log(from);
        // console.log(to);
        const msg = this.state.text;
        this.props.sendMsg({from, to, msg})
        // socket.emit('sendmsg', {text:this.state.text})
        this.setState({
            text:'',
            showEmoji:false,
        })
    }
    // 表情展示
    handleEmoji = () =>{
        this.setState({
            showEmoji:!this.state.showEmoji,
        })
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        },0)
    }
    render(){
        const emoji = '😁 😂 😃 😄 😅 😆 😉 😊 👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 💄 💍 🌂 ☂ 💼 😁 😂 😃 😄 😅 😆 😉 😊 👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 💄 💍 🌂 ☂ 💼 😁 😂 😃 😄 😅 😆 😉 😊 👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 💄 💍 🌂 ☂ 💼 😁 😂 😃 😄 😅 😆 😉 😊 👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 💄 💍 🌂 ☂ 💼 😁 😂 😃 😄 😅 😆 😉 😊 👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 💄 💍 🌂 ☂ 💼 😁 😂 😃 😄 😅 😆 😉 😊 👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 💄 💍 🌂 ☂ 💼 😁 😂 😃 😄 😅 😆 😉 😊 👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 💄 💍 🌂 ☂ 💼'
                        .split(' ')
                        .filter(v => v)
                        .map(v => ({text:v}))
        const userid = this.props.match.params.user;
        // console.log(userid)
        const Item = List.Item;
        const users = this.props.chat.users
        // userid  聊天的ID
        // this.props.user._id  // 登录的ID
        const chatId = getChatId(userid, this.props.user._id);
        const chatmsg = this.props.chat.chatmsg.filter((v) => v.chatid == chatId);
        // console.log(this.props.chat.chatmsg)
        if(!users[userid]){
            return null
        }
        return(
            <div id="chat-page">
                <NavBar 
                    mode="dark"
                    icon={<Icon type="left"></Icon>}
                    onLeftClick={() =>{
                        this.props.history.goBack()
                    }}
                >{users[userid].name}</NavBar>
                <QueueAnim type="scale" delay={100}>
                    {chatmsg.map(v => {
                        // console.log(v.from);
                        const avatar = users[v.from].avatar?require(`../img/${users[v.from].avatar}.png`):null;
                        return v.from == userid?(
                            <List key={v._id}>
                                <Item
                                    thumb={avatar}
                                >{v.content}</Item>
                            </List>
                        ):(
                            <List key={v._id}>
                                <Item className="chat-me"
                                    extra={<img src={avatar}/>}
                                >{v.content}</Item>
                            </List>
                        )
                        // return <p key={v._id}>{v.content}</p>
                    })}
                </QueueAnim>
                
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange = {(v) => {
                                this.setState({
                                    text:v
                                })
                            }}
                            // onKeyPress={this.handleSubmit}
                            extra = {
                                <div>
                                    <span style={{marginRight:15}} onClick={this.handleEmoji}>😁</span>
                                    <span onClick={this.handleSubmit}>发送</span>
                                </div>
                            }
                        >信息</InputItem>
                    </List>
                    {this.state.showEmoji ? (<Grid 
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow ={4}
                        isCarousel = {true}
                        onClick={(el) => {
                            this.setState({
                                text:`${this.state.text}${el.text}`
                            })
                        }}
                    />):null}
                </div>
            </div>
        )
    }
}
export default Chat;