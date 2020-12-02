import axios from 'axios'
import {TIMEOUT, USER_URL, USER_ROLE} from '../const'
import ErrorHandler from '../errorHandler'

const savedBerita = async ( perPage , key , page, token ) => {
    try{
        const savedURL = USER_URL + '/get-save'
        const result = await axios.get(savedURL , {
            timeout : TIMEOUT,
            params : {
                perpage : perPage ||  6,
                key : key || '',
                page : page || 1
            },
            headers: {
                'Authorization' : `${token}`
            }
        });
        return result.data;
    }catch(err){
        return ErrorHandler.errorHandler(err);
    }
}

export default{
    savedBerita
}