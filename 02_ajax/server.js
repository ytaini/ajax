const { response } = require('express')
const express = require('express')

const app = express()

//req:对请求报文的封装
//resp：对响应报文的封装
app.get("/ajax-get",(req,resp)=>{

  //设置允许跨域
  resp.setHeader('Access-Control-Allow-Origin','*')

  resp.send("hellp ajax get method ")
})

app.all("/ajax-post",(req,resp)=>{
  
  //设置允许跨域
  resp.setHeader('Access-Control-Allow-Origin','*')
  //设置可以接受的请求头信息
  resp.setHeader('Access-Control-Allow-Headers','*')
  
  // resp.send("hellp ajax post method ")
  //响应json数据
  const data = {
    name: 'zhsnagh',
    age:18
  }

  //send函数不能接收对象数据。
  // setTimeout(() => {
    resp.send(JSON.stringify(data))
  // }, 1000);
})


app.get('/jquery-ajax',(request,response) => {


  response.setHeader("Access-Control-Allow-Origin","*")

  const data = {
    name: 'zhangsan'
    ,age:18
  }

  response.send(JSON.stringify(data))
})


app.all('/jquery-ajax-post',(request,response) => {

  response.setHeader("Access-Control-Allow-Headers","*")

  response.setHeader("Access-Control-Allow-Origin","*")

  const data = {
    name: 'wangu'
    ,age: 40
  }

  response.send(JSON.stringify(data))
})


app.get('/home',(req,resp) => {
  // console.log(__dirname);
  resp.sendFile(__dirname + '/index.html')
})

app.get('/jsonp-server',(req,resp) => {
  const data = {
    name: '张三'
    ,age: 19
  }
  const res = JSON.stringify(data)
  //服务器发送的数据为js代码，js代码中调用已存在的函数，函数中的实参即为
  // 传递给客户端的数据。
  resp.send(`handle(${res})`)
})


app.get('/jsonp-server1',(res,resp)=>{
  const data = {
    code : 1,
    msg: '用户名已存在'
  }

  const info = JSON.stringify(data) 
  resp.send(`disponse(${info})`)
})

app.get('/jsonp-server2',(res,resp)=>{
  const data = {
    name:'zhangsab'
    ,city:['湖南','湖北']
  }
  //接收callback参数。callback参数的值为jquery已经定义的函数名。
  let cb = res.query.callback;

  const info = JSON.stringify(data) 
  resp.send(`${cb}(${info})`)
})


app.listen(9000, () => {
  console.log("服务已准备完毕,监听9000端口中！！");
})
