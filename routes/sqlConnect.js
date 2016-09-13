/**
 * Created by Administrator on 2016/8/30.
 */
var mysql=require('mysql')
var options={
    host:'localhost',
    port:'3306',
    database:'onlineshopping_demo',
    user:'root',
    password:'123'
}
var conn=mysql.createConnection(options)

conn.connect();

exports.conn=conn;
