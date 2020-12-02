import AdminAuth from './admin/auth'
import {ADMIN_ROLE} from './const'

const EXPIRED_JWT = 'jwt expired'

const  errorHandler = async (error ,  role , callback) =>  {
    if(error.code === 'ECONNABORTED'){
        return processTimeoutError();
    }
  
    if(error.response === undefined){
        return processUnknownError(); 
    }

    if(error.response.data.message === EXPIRED_JWT){
        //If jwt expired process this handler
        const result =  await expiredAccessToken(role , callback);
        return result;
    }
  
    return processError(error);
}

const processError = error => {
    const errorResponse = error.response;
    const statusCode = errorResponse.status;
    const message = errorResponse.data.message;

    let cause;
    if(errorResponse.data.cause instanceof Array){
       cause = errorResponse.data.cause[0].msg;
    }else{
        cause = errorResponse.data.cause;
        if(cause === 'Unknown') {
            return processUnknownError();
        }
    }

    const extractedError =  new Error(message);
    extractedError.statusCode = statusCode;
    extractedError.cause = cause;
    return extractedError;
}

const processUnknownError = () => {
    const unknownError = new Error('Unknown error');
    unknownError.cause = 'Error tidak diketahui , silahkan hubungi tim technogram'
    return unknownError;
}

const processTimeoutError = ()=> {
    const timeoutError = new Error('Timeout error');
    timeoutError.cause = 'Connection Timeout , Cek koneksi anda'
    return timeoutError;
} 

/*
@params role == CONST , ROLE DARI ACCOUNT USER/ADMIN, see const.js file
@params callback == DEFINISIKAN CALLBAKC YANG DIINGINKAN BILA USER BERHASIL MENDAPATKAN ACCESS TOKEN BARU
*/
const expiredAccessToken = async (role , callback) => {
    let result;
    try{
        if(role === ADMIN_ROLE){
            result = await AdminAuth.getRefreshToken();
        }else{
            result = new Error('You may relogin');
        }
        if(result instanceof Error){
            
            return result
        }
        const lastCall = await callback(result.token) || result.token;
        return lastCall;
    }catch(err){
        return errorHandler(err)
    }


}

export default{
    errorHandler
}
