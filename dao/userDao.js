var $conf = require("./../conf/db");
var $sql = require('./userSqlMapping');
// var formidable = require('formidable')

var path=require("path")
var fs = require('fs')
var mysql = require('mysql');
var uuid = require('node-uuid');
var crypto = require('crypto');
var url=require("url")

//创建连接池
var pool = mysql.createPool($conf);
//得到链接对象
var queryAll = function (req, res, next) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err.message);
            return;
        }
        else {
            connection.query($sql.queryAll, function (err, result) {
                if (err) {
                    console.log("错误：" + err.message);
                    return;  //退出query方法，后面的代码不执行了；
                }
                console.log(JSON.stringify(result));
                // 输出JSON到界面
                res.render("showUser.ejs",{users:result});
                // res.send(JSON.stringify(result))
                connection.release();
            });
        }
    });
}

var update = function (req, res, next) {
    var param = req.body;
    //================upload==========================
    console.log(req.files);
    var filename = req.files.updatePic.originalFilename || path.basename(req.files.updatePic.path);
    console.log("filename:"+filename);
    console.log("dirname:"+path.dirname(__filename));
    //copy file to a public directory
    // 加密
    var v=uuid.v4();
    var suffix=filename.substr(filename.lastIndexOf("."));
    var _myFileName=v+suffix;
    console.log("_myFileName=========="+_myFileName)
    var targetPath =   path.resolve(__dirname, '../') + '/public/upload/' + _myFileName;
    //copy file
    fs.createReadStream(req.files.updatePic.path).pipe(fs.createWriteStream(targetPath));
    //return file url

    // var myFileName=req.files.updatePic.originalFilename;
    if(param.UserName == null || param.Gender == null || param.UserId == null) {
        console.log("param.UserName == null");
        res.json({code: 500, msg: {url: 'http://' + req.headers.host + '/' + filename}});
    }
    pool.getConnection(function(err, connection) {
        connection.query($sql.update,  [ param.UserPassword,param.UserName, param.Gender, param.BirthDate,_myFileName,param.UserId], function(err, result) {
            if (err) {
                console.log(err.message);
                res.json({code: 500, msg: {url: 'http://' + req.headers.host + '/public/upload/' + filename}});
            }
            else {
                // 使用页面进行跳转提示
                if (result.affectedRows > 0) {
                    //res.render('suc', {  result: result   }); // 第二个参数可以直接在jade中使用
                    console.log('/./../upload/' + filename)

                    res.json({code: 200, msg: {url: '/upload/' + filename}});

                } else {
                    res.json({code: 500, msg: {url: '/upload/' + filename}});

                    res.render('fail', {
                        result: result
                    });
                }
            }
            connection.release();
        });
    });
}

var deleteById=function (req,res,next) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err.message);
            return;
        }
        else {
            connection.query($sql.delete,[req.query.id], function (err, result) {
                if (err) {
                    console.log("错误：" + err.message);
                    return;  //退出query方法，后面的代码不执行了；
                }
                // res.render("/showUser",{users:result})
                // res.json({code: 200, msg: {users:result}});
                connection.release();
            });
        }
    });
}
//post参数获取
var add = function (req, res) {
    var param = req.body;
    console.log(req.files.Pic.length);

    //================upload==========================
    console.log(req.files);
    console.log("req.files.Pic.originalFilename:"+req.files.Pic.originalFilename);
    console.log("req.files.Pic.path:"+req.files.Pic.path);
    var filename = req.files.Pic.originalFilename || path.basename(req.files.Pic.path);
    console.log("filename:"+filename);
    console.log("dirname:"+path.dirname(__filename));
    console.log("  path.resolve(__dirname, '../'):"+  path.resolve(__dirname, '../'));
    //copy file to a public directory

    /*-------------filename------------------*/
    var v=uuid.v4();
    var suffix=filename.substr(filename.lastIndexOf("."));
    var _myFileName=v+suffix;

    console.log("_myFileName:" + _myFileName);
    /*-------------filename------------------*/
    var targetPath =   path.resolve(__dirname, '../') + '/public/upload/' + _myFileName;
    console.log("targetPath:"+targetPath);
    console.log("req.files.files.path:"+req.files.Pic.length);
    //copy file
    fs.createReadStream(req.files.Pic.path).pipe(fs.createWriteStream(targetPath));
    //return file url


//================insert==========================
    console.log(" userId :"+param.UserId);
    console.log(" UserName :"+param.UserName);
    console.log(" UserPassword :"+param.UserPassword);
    console.log(" Gender :"+param.Gender);
    console.log(" BirthDate :"+param.BirthDate);
    console.log(" Pic :"+filename);

    if(param.UserName == null || param.Gender == null || param.UserId == null) {
        console.log("param.UserName == null");
        //res.render('fail', {        result: result    });
        res.json({code: 500, msg: {url: 'http://' + req.headers.host + '/' + filename}});

    }

    /*-------------string md5------------------*/
    var hash = crypto.createHash("md5");
    hash.update(param.UserPassword);          //直接对"123456"字符串加密
    var encode = hash.digest('hex');
    console.log("string:" + encode);


    pool.getConnection(function(err, connection) {
        console.log('ok 1 ok 1 ok 1 ok 1 ok 1 ok 1 ok ok')

        connection.query($sql.insert,  [ param.UserId,encode,param.UserName, param.Gender, param.BirthDate,_myFileName], function(err, result) {
            if (err) {
                console.log(err.message+'22222222222222222');
                // res.render('fail', {
                //     result: result
                // });
                res.json({code: 500, msg: {url: 'http://' + req.headers.host + '/' + filename}});

            }
            else {
                // 使用页面进行跳转提示
                if (result.affectedRows > 0) {
                    console.log('ok ok ok o k ok ok ok ok')
                    //res.render('suc', {  result: result   }); // 第二个参数可以直接在jade中使用
                    res.json({code: 200, msg: {url: 'http://' + req.headers.host + '/' + filename}});

                } else {
                    res.json({code: 500, msg: {url: 'http://' + req.headers.host + '/' + filename}});

                    res.render('fail', {
                        result: result
                    });
                }
            }
            connection.release();
        });
    });
};
var userMultipleUpload=function (req, res) {
    var sqlUserPic="INSERT INTO userpic(UserId,Pic) VALUES";
    var param = req.body;
    console.log("UserDao userMultipleUpload：");
    console.log(req.files);
    console.log(req.files.multPic.length);
    for(var i=0;i<req.files.multPic.length;i++){
        //================upload==========================
        console.log(req.files);
        console.log("req.files.files.originalFilename:"+req.files.multPic[i].originalFilename);
        console.log("req.files.files.path:"+req.files.multPic[i].path);
        var filename = req.files.multPic[i].originalFilename || path.basename(req.files.multPic[i].path);
        console.log("filename:"+filename);
        console.log("dirname:"+path.dirname(__filename));
        console.log("  path.resolve(__dirname, '../'):"+  path.resolve(__dirname, '../'));
        //copy file to a public directory

        /*-------------filename------------------*/
        var v=uuid.v4();
        var suffix=filename.substr(filename.lastIndexOf("."));
        var _myFileName=v+suffix;

        console.log("_myFileName:" + _myFileName);
        /*-------------filename------------------*/
        var targetPath =   path.resolve(__dirname, '../') + '/public/upload/' + _myFileName;
        console.log("targetPath:"+targetPath);
        console.log("req.files.files.path:"+req.files.multPic[i].length);
        //copy file
        fs.createReadStream(req.files.multPic[i].path).pipe(fs.createWriteStream(targetPath));
        sqlUserPic+="('"+param.UserId+"','"+_myFileName+"'),"
    }
    sqlUserPic=sqlUserPic.substr(0,sqlUserPic.length-1);
    console.log(" sqlUserPic :"+sqlUserPic);
    //================insert==========================

    pool.getConnection(function(err, connection) {
        connection.query(sqlUserPic, function(err, result) {
            if (err) {
                console.log(err.message);
                res.json({code: 500, msg: {url: 'http://' + req.headers.host + '/' + filename}});
            }
            else {
                // 使用页面进行跳转提示
                if (result.affectedRows > 0) {
                    res.json({code: 200, msg: {url: 'http://' + req.headers.host + '/' + filename}});
                } else {
                    res.json({code: 500, msg: {url: 'http://' + req.headers.host + '/' + filename}});
                }
            }
            connection.release();
        });
    });
};

//get参数获取
var updateById = function (req, res, next) {
    //var id = +req.query.UserId; // 为了拼凑正确的sql语句，这里要转下整数
    var _id = req.query.id;

    console.log("_id:" + _id);
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryById, _id, function (err, result) {
            // res.send(JSON.stringify(result));//往页面发送JSON字符串数据；
            // res.render('query.ejs')
            res.render("update.ejs",{users:result})

            connection.release();

        });
    });
};
var searchUserByname = function (req, res, next) {
    //var id = +req.query.UserId; // 为了拼凑正确的sql语句，这里要转下整数
    var name = req.query.searchName;
    var str = "%" + name + "%"
    pool.getConnection(function (err, connection) {
        connection.query("select * from user where UserName like ? or UserId like ?", [str, str], function (err, result) {
           console.log(JSON.stringify(result))
            res.send(JSON.stringify(result));//往页面发送JSON字符串数据；
            // res.render('query.ejs')
            connection.release();
        });
    });
};
var loginJudge = function (req, res, next) {

    var id = req.body.uid;
    var pwd = req.body.pwd;
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryAll, function (err, result) {
            for (var i = 0; i < result.length; i++) {
                console.log(result[i].UserId+"===>"+result[i].UserPassword)
                if (id == result[i].UserId) {
                    if(pwd == result[i].UserPassword){
                        req.session.user_id = id;
                        req.session.isLogin = true;
                        console.log('========'+req.session.user_id);
                        console.log('========'+req.session.isLogin);
                        // return;
                        res.send('<a href="/">点击返回</a>');
                        // break;
                    }
                    else{
                        continue;
                    }
                }
                else{
                    // return;
                }
            }
            // res.send("该用户不存在！");

            connection.release();
            return;
        });
    });
}
var logout = function (req, res, next) {

    req.session.isLogin = false;
    req.session.user_id = null;
    res.send("注销成功！")

}
exports.queryAll = queryAll;
exports.add = add;
exports.updateById = updateById;
exports.searchUserByname = searchUserByname;
exports.loginJudge = loginJudge;
exports.logout = logout;
exports.update = update;
exports.update = update;
exports.deleteById = deleteById;
exports.userMultipleUpload = userMultipleUpload;