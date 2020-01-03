module.exports = function(req, res, next){
    
    const id = req.header('x-auth-token');
    //Check if no token
    if(!id){
        return res.status(401).json({msg: 'Authorization denied.'});
    }

    //Verify token
    try{
        req.user = id;
        next();
    }catch(err){
        res.status(401).json({msg: 'Token is not valid'});
    }
}