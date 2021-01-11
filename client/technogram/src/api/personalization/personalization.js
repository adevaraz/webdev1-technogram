import axios from 'axios'
import { KATEGORI_URL, USER_URL, USER_ROLE, TIMEOUT} from '../const'
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

const addPersonalize = async(category, token) => {
    try {
        
        const addPersonalizeURL = USER_URL + '/add-personalize'
        const result = await axios.post( addPersonalizeURL ,{},{
            timeout : TIMEOUT,

            params : {
                category: category, 
            },
            headers: {
                    "Authorization": token,
                }
            }
        );
        
        return result.data;
    }catch (err) {
        const errorResult = await errorHandler.errorHandler(err, USER_ROLE, async(newToken) => {
            return await addPersonalize(category, newToken);
        })
        return errorResult;
    }
}
export default{
    retrieveAll ,
    getByName,
    addPersonalize
}