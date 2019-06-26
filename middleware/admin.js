const config  = require('config');

module.exports = function(req, res, next){
    // if not need auth so next()
    if(!config.get("requiresAuth"))
        return next();

    // if need auth, user must be admin, if not return error 403
    if(!req.user.isAdmin)
        return res.status(403).send('Access Denied');
    
    next();
}