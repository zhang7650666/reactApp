import axios from 'axios';
import io from 'socket.io-client';
// 由于现在是跨域的所以需要这样写
const socket = io('ws://localhost:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息（别人发过来的)
const MSG_RECV = 'MSG_RECV';
// 是否读取信息标识
const MSG_READ = 'MSG_READ';
const initState = {
    chatmsg:[], // 聊天信息
    unread:0, // 唯独信息列表
    users:{},
}

function chat(state = initState, action) {
    switch(action.type){
        case MSG_LIST:
            return {...state, chatmsg:action.payload.data,unread:action.payload.data.filter(v => !v.read && v.to === action.payload.userid).length, users:action.payload.users}
        case MSG_RECV:
            const n = action.payload.msg.to === action.payload.userid? 1:0;
            return {...state, chatmsg:[...state.chatmsg, action.payload.msg], unread:state.unread + n}
        case MSG_READ:
            const {from, num} = action.payload;
            return {...state, chatmsg:state.chatmsg.map(v => {
                    // 神操作
                    // ({...v, read:true})
                    if (v.from === from) {
                        v.read = true;
                    }
                    return v;
                }),unread:state.unread - num,}
        default:
            return state;
    }
}
function msgList(data, users, userid){
    return {
        type:MSG_LIST,
        payload:{ data, users, userid },
    }
}
function getMsgList(){
    return async (dispatch, getState) => {
        const res = await axios.get('/user/getmsglist')
        const userid = getState().user._id;
        if(res.status === 200 && res.data.code === 1) {
            dispatch(msgList(res.data.data, res.data.users, userid))
        }  
    }
}
function sendMsg({from, to, msg}){
    return dispatch => {
        socket.emit('sendmsg', {from, to, msg})
    }
}
function msgRecv(msg, userid){
    return {
        type:MSG_RECV,
        payload:{
            msg,
            userid,
        }
    }
}
function recvMsg(){
    return (dispatch, getState) => {
        socket.on('recvmsg', (data) => {
            const userid = getState().user._id;
            dispatch(msgRecv(data, userid))
        })
    }
}

// 未读信息标记为已读信息
function msgRead(from, userid, num){
    return {
        type:MSG_READ,
        payload:{
            from,
            userid,
            num,
        }
    }
}
function readMsg(from){
    return (dispatch, getState ) => {
        axios.post('/user/readmsg', {from}).then(res => {
            if(res.status === 200 && res.data.code === 1) {
                const userid = getState().user._id;
                dispatch(msgRead(from, userid,res.data.num))
            }
        })
    }
}
export  {
    chat,
    getMsgList,
    sendMsg,
    recvMsg,
    readMsg,
}