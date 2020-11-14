import axios from 'axios'
import {ADMIN_URL , TIMEOUT} from '../const'
import ErrorHandler from '../errorHandler'
const addAdmin = async(username, password)=>{
    try{
    const addAdminURL = ADMIN_URL + '/new-admin'
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOiJcImFkbWluXCI7IiwiaWF0IjoxNjA1MzU2ODM4LCJleHAiOjE2MDUzNjA0Mzh9.Vr55xXXLwdvMnGETmRHVH9ipmW1IrgNPAHHDIq2o_Wk"
    const result = await axios.post(addAdminURL, {
        username,
        password
    },{
        headers:{
            'Authorization' : `${token}`
        }
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
    addAdmin
}