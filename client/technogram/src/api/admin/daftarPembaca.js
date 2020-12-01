import axios from 'axios'
import {USER_URL , TIMEOUT , ADMIN_ROLE} from '../const'
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

const searchBy = async(params) => {
    try{
        const searchByURL = USER_URL + `/search`
        const result = await axios.get(searchByURL, {params});
        return result.data;
    }catch(err){
        return ErrorHandler.errorHandler(err);
    }
}

const deleteBy = async(id , token) => {
    try{
        const deleteByURL = USER_URL + `/delete/${id}` 
        const result = await axios.delete(deleteByURL,
        {
            timeout : TIMEOUT,
            headers: {
                "Authorization": token
            }
        }
        );
        return result.data;
    }catch(err){

        /*
        Sangat berpotensi terjadi infinite loop bila access token memiliki waktu active yang sangat singkat
        , loop akan berhenti saat user refresh page.
        */
        const errorResult = await ErrorHandler.errorHandler(err , ADMIN_ROLE , async (newToken) => {
            return await deleteBy(id , newToken);
        })
        return errorResult;
    }

}

export default{
    getAll,
    searchBy,
    deleteBy
}