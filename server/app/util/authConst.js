// User Access Token expired in 2 hours (calculated in seconds 7200 seconds) 
const USER_ACCESSTOKEN_EXPIRED = 60 * 60 *  2;

//User Refresh token expired in 7 days (calculated in seconds )
const USER_REFRESHTOKEN_EXPIRED = 60 * 60 * 24 * 7;

// User Cache Expired  , access token + 2 minutes (to make sure all token expired)
const USER_REDIS_EXPIRED = USER_ACCESSTOKEN_EXPIRED  + 2 *60

// Admin Access Token expired in 1 hours (calculated in seconds 3600 seconds) 
const ADMIN_ACCESSTOKEN_EXPIRED = 60 * 60


//Admin Refresh token expired in 2 days (calculated in seconds )
const ADMIN_REFRESHTOKEN_EXPIRED = 60 * 60 * 24 * 2;


// Admin Cache Expired  , access token + 2 minutes (to make sure all token expired)
const ADMIN_REDIS_EXPIRED = ADMIN_ACCESSTOKEN_EXPIRED  + 2 *60


module.exports = {
    UserConst : {
        USER_ACCESSTOKEN_EXPIRED,
        USER_REFRESHTOKEN_EXPIRED,
        USER_REDIS_EXPIRED
    },
    AdminConst : {
        ADMIN_ACCESSTOKEN_EXPIRED,
        ADMIN_REFRESHTOKEN_EXPIRED,
        ADMIN_REDIS_EXPIRED
    }
}