const express = require("express")
const app=express()
const session = require("express-session")
const mongoose = require("mongoose")
const ejs = require("ejs")
const e = require("express")


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//导入用到的包
//链接数据库
mongoose.connect('mongodb://172.21.2.236:27017/190110910228');
//定义一些变量
var queryres = ""

const schema_user = {
    username: String,
    userpwd: String,
    admin: Boolean 

}
const schema_stock = {
    code:String,
    name:String,
    price:String
}

//定义模型
const userdata = mongoose.model('users', schema_user);
const stockdata = mongoose.model('stocks', schema_stock);

// 新建管理员admin
userdata.find({username:"admin"},(err,data)=>{
    if(data == 0){
        user2 = new userdata({ 
            username: "admin",
            userpwd: "123",
            admin: true });
        user2.save()
    }
})
// stockdata.insertMany(
//     {
//         code: "000001",
//         name: "平安银行",
//         price: "RMB100.0"
//     }
// )
//启用session的中间件
app.use(session({
    secret: '190110910228',
    resave: true,
    saveUninitialized: true
}))

//设置use的默认页面
app.use('/',express.static('public'))

//登录响应
app.post('/login', (req, res)=>{
    // console.log(req.body.password)
    var un = req.body.username
    var up = req.body.password
    userdata.find({username:un},(err,data)=>{
        if(data == 0){
            res.send("登陆失败！")
        }
        else if(data[0]._doc.userpwd == up){
            req.session.userinfo = un 
            req.session.adminco = data[0]._doc.admin
            console.log(req.session.adminco)
            ejs.renderFile("./public/search.html",{},(err,str)=>{
                res.send(str)
            })
        }
    })

})

//注册响应
app.post('/register', (req, res)=>{
    // console.log(req.body.password)
    var un = req.body.username
    var up = req.body.password
    var up_again = req.body.password_again
    userdata.find({username:un},(err,data)=>{
        if(data == 1){
            res.send("注册失败！用户名已存在！")
        }
        else if(up != up_again){
            res.send("注册失败！两次输入的密码不一致！")
        }
        else {
            user2 = new userdata({ 
                username: un,
                userpwd: up,
                admin: false});
            user2.save()
            ejs.renderFile("./public/search.html",{},(err,str)=>{
                res.send(str)
            })
        }
    })
})

app.post('/admin', (req,res)=>{
    if(req.body.submit1 == "添加管理员"){
        adminco = req.session.adminco
        if(adminco == false){
            res.send("您不是管理员！")
        }
        else{
            var an = req.body.adminname
            var ap = req.body.adminpwd
            if(an == "" || ap ==""){res.send("帐号密码不能为空！")}
            else{
                userdata.find({username:an},(err,data)=>{
                    if(data == 1){
                        res.send("管理员已存在！")
                    }
                    else {
                        user2 = new userdata({ 
                            username: an,
                            userpwd: ap,
                            admin: true});
                        user2.save()
                        res.send("添加成功！")
                    }
                })
            }
        }
    }

    if(req.body.submit1 == "添加股票信息"){
        adminco = req.session.adminco
        if(adminco == false){
            res.send("您不是管理员！")
        }
        else{
            var cd = req.body.code
            var nm = req.body.name
            var pi = req.body.price
            if(cd == "" || nm =="" || pi ==""){res.send("信息不能为空！")}
            else{
                userdata.find({username:cd},(err,data)=>{
                    if(data == 1){
                        res.send("股票已存在！")
                    }
                    else {
                        user2 = new stockdata({ 
                            code: cd,
                            name: nm,
                            price: pi});
                        user2.save()
                        res.send("添加成功！")
                    }
                })
            }
        }
    }
})

app.post('/user', (req,res)=>{
    var sc = req.body.scode
    if(sc == ""){res.send("查询不能为空！")}
    else{
        stockdata.find({code:sc},(err,data)=>{
            if(data == 0){
                res.send("该股信息不存在！")
            }
            else {
                console.log(data[0])
                var snm = data[0]._doc.name
                var spi = data[0]._doc.price
                res.send("查询成功！该股票是："+snm+",价格为："+spi)
            }
        })
    }
})
app.listen(50228)