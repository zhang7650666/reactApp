const express = require('express');
const Router = express.Router();
const utils = require('utility'); // 密码加密插件
const model = require('./model')
const User = model.getModel('user');
const Chat= model.getModel('chat');
const _filter = {'pwd':0, '__v':0}; // 不希望密码暴露出来做的处理
// Chat.remove({}, (err,doc) =>{
//     console.log('数据清楚成功')
// })
// 查看用户列表
Router.get('/test',function(req, res){
	User.find({},function(err,doc){
		return res.json({code:0,data:doc})
	})
})
Router.get('/list', (req, res) => {
    // User.remove({},(err, doc) => {});
    const {type} = req.query;
    User.find({type}, (err, doc) => {
        if(err) {
            _err(res)
        } else {
            res.json({
                code: 1,
                msg: 'success',
                data:doc,
            })
        }
    })
})
// 获取用信息
Router.get('/info', (req, res) => {
    const {userid} = req.cookies;
    if(!userid){
        return _err({ res:res, msg:'未登录' })
    }
    User.findOne({_id:userid},_filter, (err, doc) => {
        if(err){
            _err({ res, msg:'没有找到相应id' })
        }else {
           return res.json({
                code:1,
                msg:'success',
                data:doc
            })
        }
    })
   
})
// 注册
Router.post('/register', (req, res) => {
    const {user, type, pwd} = req.body;
    User.findOne({user},_filter, (err, doc) => {
        if(err) {
           return  _err({ res, msg:'后台查找失败' })
        } else {
           if(doc){
              return res.json({
                   code:0,
                   msg:'用户名重复',
               })
           } else {
               const userModel = new User({user, type,pwd:md5Pwd(pwd)})
               userModel.save((err, doc) => {
                   if(err){
                     return _err({ res, msg:'后台保存失败' })
                   } else {
                       const {user, type, _id} = doc;
                       res.cookie('userid', _id);
                       return res.json({
                           code:1,
                           msg:'success',
                           data:{user, type, _id}
                       })
                   }
               })
            //    User.create({user, type,pwd:md5Pwd(pwd)}, (err, doc) => {
            //      if(err) {
            //         return _err({ res, msg:'后台注册失败' })
            //      } else {
            //         return res.json({
            //              code: 1,
            //              msg:'注册成功'
            //          })
            //      }
            //    })
           }
        }
    })
})
// 登录
Router.post('/login', (req, res) => {
    console.log(req.body);// 获取post的传值方式
    const {user, pwd} = req.body;
    User.findOne({user,pwd:md5Pwd(pwd)}, _filter, (err, doc) => {
        if(err){
            _err({res, msg:'用户名或密码错误'})
        }else{
            // 判断有没有查找导数据
            if(doc == null || doc.length == 0){
                return res.json({
                    code:0,
                    msg:'此用户不存在',
                })
            } else {
                res.cookie('userid', doc._id)
               return res.json({
                    code:1,
                    msg:'success',
                    data:doc,
                })
            }
        }
    })
});

// 保存boss信息
Router.post('/update', (req, res) => {
    const userid = req.cookies.userid;
    if(!userid){
        return json.dumps({
            code:0,
            msg:'你还未登录，请去登录'
        })
    }
    const params = req.body;
    console.log(params);
    User.findByIdAndUpdate(userid, params, (err, doc) => {
        const data = Object.assign({}, {
            user:doc.user,
            type:doc.type,
        }, params);
        console.log(data);
        return res.json({
            code:1,
            msg:'success',
            data:data
        })
    })
})
// 获取聊天信息列表
Router.get('/getmsglist', (req, res) =>{
    const userid = req.cookies.userid;
    // 查找多个条件用$or
    //{'$or':[{from:id, to:id}]}
    User.find({}, (err, userDoc) => {
        if(err){
            _err({res, msg:'查找用户信息失败'})
        }else {
            let users = {};
            userDoc.forEach((item) => {
                users[item.id] = {
                    name:item.user,
                    avatar:item.avatar,
                }
            });

            Chat.find({$or: [ {from:userid} , {to:userid} ]}, (err,doc) => {
                if(err){
                    _err({res, msg:'为查找到聊天信息'})
                } else {
                    res.json({
                        code:1,
                        msg:'success',
                        data:doc,
                        users:users
                    })
                }
            })
        }
    })
    
})
// 修改为阅读过的信息请求
Router.post('/readmsg', (req, res) => {
    const userid = req.cookies.userid;
    const {from } = req.body;
    console.log(userid, from);
    // from 指的是对方
    // userid  指的是当前登录的
    Chat.update(
        {from, to:userid},
        {$set:{read:true}},
        {'multi':true},
         (err, doc) => {
             console.log(doc);
            if(err){
                return  _err({res, msg:'修改为已度过的信息失败'})
            }else{
                return res.json({
                    code:1,
                    msg:'success',
                    num:doc.nModified,
                })
            }
    })
})
// 统一错误处理
function _err(obj){
    obj.res.json({
        code: 0,
        msg: obj.msg
    })
}
// md5加密
function md5Pwd(pwd){
    let item = 'lean_imooc_!!!???_@@';
    return utils.md5(utils.md5(pwd + item))
}
module.exports = Router;