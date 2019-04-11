// import express from 'express';
const express = require('express');
const bodyParser = require('body-parser'); // 接收post请求用的
const cookieParser = require('cookie-parser');
const userRouter = require('./user');
// 创建数据模型
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server); // socket.io 与express关联  （上面一行代码也是)
const model = require('./model')
const Chat = model.getModel('chat');
const path = require('path');
// io监听
io.on('connection', (socket) => {
    console.log('user login');
    socket.on('sendmsg', (data) =>{
        console.log('接收到数据了')
        console.log(data);
        const {from, to, msg} = data;
        const chatid = [from, to].sort().join('_');
        console.log(chatid);
        Chat.create({chatid, from , to, content: msg}, (err, doc) => {
            // const chatModel = new Chat({chatid, from , to, content: msg})
            // chatModel.save((err, doc) => {
            //     if(err){
            //         console.log('保存失败');
            //     } else {
            //         console.log('保存成功');
            //         io.emit('recvmsg', Object.assign({}, doc._doc))
            //     }
            // })
            io.emit('recvmsg', Object.assign({}, doc._doc))
           
        })
        // 广播出去
        // io.emit('recvmsg',data)
    })
})
// 开启中间健
app.use(cookieParser());
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use((req, res, next) => {
    if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
        return next();
    };
    return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))
//获取用户信息
server.listen(9093, () => {
    console.log('success');
})