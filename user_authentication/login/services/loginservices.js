const dbhandle = require('../../../database/dbhandler')

exports.getUserInfo = getUserInfo;

function getUserInfo(opts){
    return new Promise( async(resolve, reject)=>{
        {
        let values=[]
        values.push(opts.user_email);
        values.push(opts.user_password)
        let query = 'SELECT * FROM user_details WHERE user_email = ? AND user_password = ?';
        let result = await dbhandle.mysqlQueryPromise({module : "login", api : "login"}, "loginCredintials", query, values);  
        resolve(result) ;
        }
    });
    
}