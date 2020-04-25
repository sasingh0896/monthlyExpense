const dbhandle = require('../../../database/dbhandler')

exports.getUserInfo = getUserInfo;

function getUserInfo(opts) {
    let apiReference = {
        module: "login",
        api: "login"
    }
    return new Promise(async (resolve, reject) => {
        {
            let query = " SELECT * FROM user_details WHERE user_email = ? ";
            await dbhandle.mysqlQueryPromise(apiReference, "loginCredintials", query, opts)
                .then((result) => {
                        resolve(result)
                        
                    },
                    (error) => reject(error));
        }
    });

}