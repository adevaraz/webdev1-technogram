const errorHandler = error =>  {
    if(error.code === 'ECONNABORTED'){
        return processTimeoutError();
    }
    if(error.response === undefined){
        return processUnknownError(); 
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

export default{
    errorHandler
}
