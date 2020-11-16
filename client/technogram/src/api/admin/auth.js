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

export default{
    signin
}

