import axios from 'axios';
import {getRedirectPath} from './../util';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT'
const initState = {
    redirectTo:'',
    msg:'', // 提示信息
    user:'',
    type:'genius', // 牛人  或则  boss
}
function user(state = initState, action) {
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state, isAuth:true, msg:'success', redirectTo: getRedirectPath(action.payload), ...action.payload};
        case LOAD_DATA:
            return {...state, ...action.payload};
        case LOGOUT:
            return {...initState, redirectTo:'/login'}
        case ERROR_MSG:
            return {...state, isAuth:false, msg:action.msg};
        default:
            return state;
    }
}
function errorMsg(msg){
    return {
        type:ERROR_MSG,
        msg:msg
    }
}

function authSuccess(data){
    return {
        type:AUTH_SUCCESS,
        payload:data
    }
}
// 注册
function register({user, pwd, repeartPwd, type}){
    if(!user || !pwd || !type){
        return errorMsg('用户名或密码不能为空');
    };
    if(pwd !== repeartPwd){
        return errorMsg('密码和确认密码不一致');
    };
    return dispatch => {
        axios.post('/user/register', {user, pwd, type}).then((res) => {
            if(res.status === 200 && res.data.code === 1) {
                dispatch(authSuccess({user, pwd, type}))
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    } 
}
// 登录
function login({user,pwd}){
    if(!user || !pwd){
        return errorMsg('用户名或密码不能为空');
    }
    return dispatch => {
        axios.post('/user/login',{user,pwd}).then((res) => {
            if(res.status === 200 && res.data.code === 1){
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}
 // 获取用户信息
 function loadData(data){
     return {
        type: LOAD_DATA,
        payload: data,
     }
 }

// 保存boss填写信息
function update(data){
    return dispatch => {
        axios.post('/user/update', data).then((res) => {
            if (res.status === 200 && res.data.code === 1) {
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
// 刷新页面
function searcha(){
   return dispatch => {
    axios.get('/user/search').then((res) => {
        if (res.status === 200 && res.data.code === 1) {
            dispatch(authSuccess(res.data.data))
        } else {
            dispatch(errorMsg(res.data.msg))
        }
    })
   } 
}
// 登出
function logoutSubmit(){
    return { type:LOGOUT }
}
export {
    user,
    register,
    login,
    loadData,
    update,
    logoutSubmit,
    searcha,
}