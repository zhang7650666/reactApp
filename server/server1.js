const express = require('express');
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/imooc';
const Schema = new mongoose.Schema({
    user:{
        type:String,
        require:true,
    },
    age:{
        type:Number,
        require:true,
    }
});

let User = mongoose.model('user',Schema);
// 创建数据
// User.create({
//     user:'React',
//     age:33,
// }, (err, data) => {
//     if(err){
//         console.log(err);
//         return;
//     };
//     console.log(data);
// }
// 查找
User.find({}, (err, data) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(data);
})

// 修改
// User.update({user:'vue'},{$set:{age:100}}, (err, data) => {
//     if(err){
//         console.log(err);
//         return;
//     };
//     console.log(data);
// })

// User.remove({user:'vue'}, (err, data) => {
//     if(err){
//         console.log(err);
//         return;
//     };
//     console.log(data);
// })


// 链接mongo
mongoose.connect(DB_URL);
mongoose.connection.on('connected', () => {
    console.log('数据库链接成功');
});
// 创建数据模型
const app = express();
app.get('/data', (req, res) => {
    User.find({}, (err, data) => {
        if(err){
            return res.json({
                Status:0,
                Msg:'数据请求失败'
            })
        }else{
            return res.json({
                Status:1,
                Msg:'success',
                Data:data,
            })
        }
    })
})
// 获取用户信息接口
app.get('/user/info', (req, res) => {
    User.find({}, (err, data) => {
        if(err){
            return res.json({
                Status: 0,
                Msg:'获取用户信息失败',
            })
        } else {
            return res.json({
                Status:1,
                Msg:'success',
                Data:data,
            })
        }
    })
})
app.listen(9093, () => {
    console.log('success');
})