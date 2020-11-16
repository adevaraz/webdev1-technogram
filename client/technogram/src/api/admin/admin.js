import axios from 'axios'
import {ADMIN_URL , TIMEOUT} from '../const'
import ErrorHandler from '../errorHandler'
const addAdmin = async(username, password)=>{
    try{
    const addAdminURL = ADMIN_URL + '/new-admin'
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOiJcImFkbWluXCI7IiwiaWF0IjoxNjA1NTIwNTE4LCJleHAiOjE2MDU1MjQxMTh9.9OhWCj2IyJiGuUoEYmHJOvKb7lHW17ivAcxfohEk9es"
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