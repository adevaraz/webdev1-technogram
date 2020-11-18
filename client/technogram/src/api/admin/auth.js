import axios from 'axios'
import {ADMIN_URL , TIMEOUT} from '../const'
import ErrorHandler from '../errorHandler'
const signin = async(username , password) => {
    try{
        const signinURL = ADMIN_URL + '/signin' 
        const result = await axios.post(signinURL , {
            username,
            password
        },
        {
            timeout : TIMEOUT,
            withCredentials : true
        }
        );
        return result.data;
    }catch(err){
        return ErrorHandler.errorHandler(err);
    }

}

const getRefreshToken = async() => {
    try{
        const url = ADMIN_URL +  '/refresh';
        const result =await axios.post(url , {} , {
            timeout : TIMEOUT,
            withCredentials : true
        })
        return result.data;
    }catch(err){
        return ErrorHandler.errorHandler(err);
    }
}

const logout = async(token) => {
    try{
        const url = ADMIN_URL + '/signout'
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
    signin,
    getRefreshToken,
    logout
}
