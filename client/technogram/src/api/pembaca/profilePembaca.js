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
        const errorResult = await ErrorHandler.errorHandler(err, USER_ROLE, async(newToken) => {
            return await savedBerita(perPage, key, page, newToken);
        })
        return errorResult;
    }
}

export default{
    savedBerita
}