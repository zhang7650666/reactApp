import axios from 'axios';
const USER_LIST = 'USER_LIST';
const initState = {
    userlist: []
};

function chatuser(state = initState, action){
    switch(action.type){
        case USER_LIST:
            return {...state, userlist:action.payload}
        default:
            return state;
    }
}
function userList(data){
    return {
        type:USER_LIST,
        payload:data,
    }
}
function getUserList(type){
    // console.log(type);
    return dispatch => {
        axios.get('/user/list?type=' + type).then((res) => {
            if(res.status === 200 && res.data.code === 1){
                // console.log(res.data.data);
                dispatch(userList(res.data.data))
            }
        })
    }
}
export {
    chatuser,
    getUserList,
}