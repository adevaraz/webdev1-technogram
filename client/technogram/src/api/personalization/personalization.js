import axios from 'axios'
import {ADMIN_ROLE, KATEGORI_URL, TIMEOUT} from '../const'
import errorHandler from '../errorHandler'

const retrieveAll = async() => {
    try{
        const retrieveURL = KATEGORI_URL + '/get' 
        const result = await axios.get(retrieveURL);
        return result.data;
    }catch(err){
        return errorHandler.errorHandler(err);
    }

}

const getByName = async(name) => {
    try {
        const currentUrl = KATEGORI_URL + '/get-id';
        
        const result = await axios.get(currentUrl, {
            params: {
                name: name || ''
            }
        });

        return result.data;
    } catch (err) {
        return errorHandler.errorHandler(err);
    }
}

export default{
    retrieveAll ,
    getByName
}