const errorHandler = error =>  {
    console.log(error);
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

export default{
    errorHandler
} 