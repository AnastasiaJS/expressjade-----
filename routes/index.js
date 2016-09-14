var express = require('express');
var userDao = require('./../dao/userDao');
var multipart = require('connect-multiparty');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});
router.get('/card_inner', function(req, res, next) {
  res.render('card_inner.ejs');
});

router.get('/showUser',function (req,res,next) {
  // 判断是否登录
  if(req.session.isLogin==true){
    //===============================
    userDao.queryAll(req, res, next);
  }
  else {
    res.send("您无权限访问！");
  }
});
router.get('/query',function (req,res,next) {
  res.render('query.ejs');
  
});
router.get('/queryName',function (req,res,next) {
  userDao.searchUserByname(req, res, next);
});

router.get('/login',function (req,res,next) {
  res.render('login.ejs');
});
router.post('/login2',function (req,res,next) {
  userDao.loginJudge(req,res,next)
});
router.get('/logout',function (req,res,next) {
  userDao.logout(req,res,next)
});
router.get('/register',function (req,res,next) {
  res.render('register.ejs');
});
router.post('/register2', multipart(),function (req,res) {
  userDao.add(req,res)
});
router.get('/update',function (req,res,next) {
  // res.render("update.ejs")
  userDao.updateById(req,res)
});
router.post('/update2', multipart(),function (req,res,next) {
  console.log("======================================")
  userDao.update(req,res,next)
});
router.get("/delete",function (req,res,next) {
  userDao.deleteById(req,res,next);
  userDao.queryAll(req, res, next);
});
router.get("/dynamic",function (req,res,next) {
  res.render('dynamic.ejs');
});
router.post("/dynamic2",multipart(),function (req,res,next) {
  userDao.userMultipleUpload(req, res, next);
});

module.exports = router;
