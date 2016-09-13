var conn=require('./sqlConnect')
var fs=require('fs')
var ejs=require('ejs')
var querystring = require("querystring");

var connect=conn.conn

exports.resShowUser=function (req,res) {

    res.writeHead(200,'{"Content-Type":"text/html";"charset=utf-8"}')
    connect.query('select * from user','',function (err,result,fields) {
        var data="<head><meta charset='utf-8'/></head>"+'<table style="border: solid 1px red"><tr>'
        
        if(err){
            console.log('错误：'+err.message)
            return;
        }
        res.write(JSON.stringify(result))
        res.end()

    })
}