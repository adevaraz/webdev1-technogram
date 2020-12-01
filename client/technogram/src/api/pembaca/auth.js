import axios from 'axios'
import { USER_URL } from '../const'
import ErrorHandler from '../errorHandler'

const signOut = async(token) => {
    try{
        const url = USER_URL + '/sign-out'
        const result = axios.post(url , {} , {
            headers : {
                'Authorization' : token
            }
        })
        return result.data
    }catch(err){
        return ErrorHandler.errorHandler(err);
    }
}

export default{
    signOut
}