const jwt = require('jsonwebtoken')
const cache = require("../util/cache");


const validateToken = async ( req  , role) => {
    const token = req.get('Authorization')
    console.log('oyyyyyy');
    console.log('ini tokennn : ' + token);
    try{
        if(!token){
            const error = new Error('Not Authenticated');
            error.statusCode = 401;
            error.cause = "Please Use given authorization token"
            throw error
        }
        const isValid = await cache.getAsync(token);
        console.log("apakah valid" + isValid)
        if(isValid){
            const error = new Error('Not Authenticated');
            error.statusCode = 401;
            error.cause = "Your token is invalid"
            throw error
        }
    
        let decodedToken;
        try{
            decodedToken = jwt.verify(token , process.env.JWT_SECRET_KEY);
            if(decodedToken.roles !== role){
                const error = new Error('Forbidden Access')
                error.statusCode = 401;
                error.cause = "You have no access to this endpoint"
                throw error;
            }
            const key = role + decodedToken.id.toString()
            const userRequest = await cache.getAsync(key);
            const userCache = JSON.parse(userRequest);
            console.log(decodedToken.iat);
            console.log(userCache.lastPasswordChange);
            if(userCache.isDeleted || decodedToken.iat < userCache.lastPasswordChange){
                const error = new Error('Invalid credential')
                error.statusCode = 401;
                error.cause = "Please relogin to get new token"
                throw error;
            }
        }catch(err){
            throw err;
        }
    
        if(!decodedToken){
            const error = new Error('Not Authenticated');
            error.statusCode = 401;
            throw error
    
        }
        req.decodedToken = decodedToken;
        req.token = token;
        return req
    }catch(err){
        return err;
    }
}

exports.validateAdmin = async (req , res , next) => {
    const validate = await validateToken(req , process.env.ADMIN_PREFIX);
    if(!(validate instanceof Error)){
        next();
    }else{
        next(validate);
    }
}
exports.validateUser = async (req , res , next) => {
    const validate = await validateToken(req , process.env.PEMBACA_PREFIX);
    if(!(validate instanceof Error)){
        next();
    }else{
        next(validate);
    }
}

