
//定义 了一个实体user对象，对象里有6个变量；6个sql语句用来操作数据库
var user = {
    insert:'INSERT INTO user(UserId,UserPassword , UserName, Gender,BirthDate,Pic) VALUES(?,?,?,?,?,?)',
    update:'update user set UserPassword=? , UserName=?, Gender=?,BirthDate=?,Pic=? where UserId=?',
    delete: 'delete from user where UserId=?',
    queryById: 'select * from user where UserId=?',
    queryByGender: 'select * from user where Gender=?',
    // queryByName: 'select * from user where UserName=?',
    queryAll: 'select * from user'
};
module.exports = user;