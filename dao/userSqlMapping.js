
//定义 了一个实体user对象，对象里有6个变量；6个sql语句用来操作数据库
var register = {
    register_insert:'INSERT INTO register VALUES(?,?)',
    register_update:'update register set Password=?  where Id=?',
    register_delete: 'delete from register where Id=?',
    register_queryById: 'select * from register where Id=?',
    register_queryAll: 'select * from register',

    user_insert:'INSERT INTO user VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    user_update:'update user set Password=?  where Uid=?',
    user_delete: 'delete from user where Uid=?',
    user_queryById: 'select * from user where Uid=?',
    user_queryAll: 'select * from user'
};
module.exports = register;
// module.exports = user;