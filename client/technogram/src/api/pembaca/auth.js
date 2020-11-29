import axios from 'axios'
import {USER_URL , TIMEOUT} from '../const'
import ErrorHandler from '../errorHandler'
const signin = async(email , password) => {
    try{
        const signinURL = USER_URL + '/sign-in' 
        
        const result = await axios.post(signinURL , {
            email,
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

const signup = async(email , username, password) => {
    try{
        const signupURL = USER_URL + '/create' 
        console.log(email)
        console.log(username)
        console.log(password)
        const result = await axios.post(signupURL , {
            email,
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
        const url = USER_URL +  '/refresh';
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
        const url = USER_URL + '/signout'
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
    signup,
    getRefreshToken,
    logout
}
