// middleware for authentication
const {User}=require('../db/index')
function userMiddleware(req, res, next) {
    username=req.headers.username;
    password=req.headers.password;
    User.findOne({
        username: username,
        password: password
    })
    .then(function(value){
        if(value){
            next();
        }else{
            res.status(403).json({
                msg:"User doesn't exist"
            })
        }
    })
}

module.exports = userMiddleware;