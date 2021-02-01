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
const addKategori = async(data, token) => {
    try{
        const addKategoriURL = KATEGORI_URL + '/create' 
        const result = await axios.post(addKategoriURL , data, {
            timeout : TIMEOUT,
            headers: {
                'Authorization' : `${token}`
            }
        }
        );
        return result.data;
    }catch(err){
        const errorResult = await errorHandler.errorHandler(err, ADMIN_ROLE, async(newToken) => {
            return await addKategori(data, newToken);
        })
        return errorResult;
    }
}

const updateKategori = async(idKategori, data, token) => {
    try{
        console.log(data);
        const updateKategoriURL = KATEGORI_URL + `/update/${idKategori}`; 
        const result = await axios.put(updateKategoriURL , data,
        {
            timeout : TIMEOUT,
            headers: {
                'Authorization' : `${token}`
            }
        }
        );
        return result.data;
    }catch(err){
        const errorResult = await errorHandler.errorHandler(err, ADMIN_ROLE, async(newToken) => {
            return await updateKategori(data, newToken);
        })
        return errorResult;
    }
}

const deleteOneKategori = async(id, token) => {
    try{
        const deleteKategoriURL = KATEGORI_URL + '/delete/' +id; 
        const result = await axios.delete(deleteKategoriURL ,  {
            timeout : TIMEOUT,
            headers: {
                'Authorization' : `${token}`
            }
        }
        );
        return result.data;
    }catch(err){
        const errorResult = await errorHandler.errorHandler(err, ADMIN_ROLE, async(newToken) => {
            return await deleteOneKategori(id, newToken);
        })
        return errorResult;
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
    addKategori ,
    updateKategori ,
    deleteOneKategori,
    getByName
}