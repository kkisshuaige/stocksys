## 1）项目设计部分：

### （1）项目总体构成；

​	项目包括4个html前端文件，所需的css、js文件，一个app.js后端文件及readme.md。

### （2）引入的包在项目中的作用相关说明

​	express:静态网页的制作

​	mongoose:数据库的链接和使用

​	ejs:渲染字段

​	express-session:保留状态变量

### （3）项目目录结构和各个部分的说明。

![image-20211231023941213](/home/osuser/.config/Typora/typora-user-images/image-20211231023941213.png)

public中的asset、css和js文件夹内保存前端html所需配置

public中保存：

index.html——主页面

login.html——登陆页面

register.html——注册页面

search.html——功能页面

app.js文件保存在public外部，是后端文件，用于调用各函数，实现前端功能。

## 2）使用说明书：

本项目是股票查询及信息管理系统的简易实现。用户分别为管理员和普通用户，管理员可以新增管理员、修改股票信息、新增股票信息、查询股票信息等，普通用户仅可查询股票信息。

本项目需要登录才能进行，管理员默认账号为：admin，密码为：123

注册仅允许普通用户注册，且用户名不能重复，两次密码必须正确。

运行方式：

在终端运行 node app.js，打开网页即可

## 3）开发日记

2021/12/29：制定项目计划及方针

2021/12/30：完成各功能实现

2021/12/31：部署，并同步至GitHub

2021/12/31：项目结束，完成readme文件上传。