const dbhandle = require('../../../database/dbhandler')

exports.emailExist = emailExist;
exports.phoneExist = phoneExist;
exports.insertuserData = insertuserData;


async function emailExist(emails){
    let query = "SELECT * FROM user_details WHERE user_email = ?";
    var email = [];
    email.push(emails)
    var result = await dbhandle.mysqlQueryPromise({module : "signUp", api : "signUp"}, "EmailExist", query, email)
    try {
        if (result[0].user_id)
          return false;
      }
      catch (error) {
        return true;
      }
}

async function phoneExist(phones){
    let query = "SELECT * FROM user_details WHERE user_phone_number = ?";
    var phone = [];
    phone.push(phones);
    var result = await dbhandle.mysqlQueryPromise({module : "signUp", api : "signUp"}, "phoneExist", 
    query, phone)
    try {
        if (result[0].user_id)
          return false;
      }
      catch (error) {
        return true;
      }
}

async function insertuserData(data){
       let query = "INSERT INTO user_details (user_name, user_email, user_phone_number," +
        "user_password, user_access_token) VALUES(?,?,?,?,?)"
        
        let result = await dbhandle.mysqlQueryPromise({module : "insertData", api : "signUp"}, "inserUserDetails",
        query,data)
        if(result.affectedRows){
          return result
        }  
}