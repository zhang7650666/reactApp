const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/imooc-chat';
// 链接mongo
mongoose.connect(DB_URL);
mongoose.connection.on('connected', () => {
    console.log('数据库链接成功')
})
const models = {
    user: {
       'user':{ type: String, required: true },
       'pwd': { type: String, required: true },
       'repeartPwd': { type: String},
       'type': { type: String, required: true },
       'avatar': { type: String },
       'desc': { type: String },
       'title': { type: String }, // 职位名称
       // 如果是boss下面的字段还是要用到的
       'company': { type: String },
       'money': { type: String },
    },
    chat: {
        'chatid':{type:String,require:true},
        'from':{type:String, require:true},
        'to':{type:String, require:true},
        'read':{type:Boolean, default:false},
        'content':{type:String, reuqire:true, default:''},
        'creat_time':{type:Number,default:new Date().getTime()}
    },
}
for( let m in models) {
    mongoose.model(m, models[m]);
}
module.exports = {
    getModel: function(m){
        return mongoose.model(m);
    }
}

