import axios from 'axios'
import {USER_URL , TIMEOUT} from '../const'
import ErrorHandler from '../errorHandler'
const getAll = async() => {
    try{
        const getAllURL = USER_URL + '/all-account' 
        const result = await axios.get(getAllURL);
        return result.data;
    }catch(err){
        return ErrorHandler.errorHandler(err);
    }

}

const searchBy = async(key) => {
    try{
        const searchByURL = USER_URL + `/search?key=${key}`
        const result = await axios.get(searchByURL);
        return result.data;
    }catch(err){
        return ErrorHandler.errorHandler(err);
    }
}

const deleteBy = async(id) => {
    try{
        const deleteByURL = USER_URL + `/delete/${id}` 
        const result = await axios.delete(deleteByURL,
        {
            timeout : TIMEOUT,
            headers: {
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZXMiOiJcImFkbWluXCI7IiwiaWF0IjoxNjA1NTMxMjg1LCJleHAiOjE2MDU1MzQ4ODV9.4SPyiQaCxisglDhTWcqDiDWfnIwdUudNPH_xpHe8WRA"
            }
        }
        );
        return result.data;
    }catch(err){
        return ErrorHandler.errorHandler(err);
    }

}

export default{
    getAll,
    searchBy,
    deleteBy
}