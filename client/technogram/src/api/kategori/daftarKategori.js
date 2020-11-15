import axios from 'axios'
import {KATEGORI_URL, TIMEOUT} from '../const'
import errorHandler from '../errorHandler'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZXMiOiJcImFkbWluXCI7IiwiaWF0IjoxNjA1NDM1NjU0LCJleHAiOjE2MDU0MzkyNTR9.dqwZjTCnMuLJuCrSXkW9xz3LaLt1DkpSmNGPJpJ1WTE'
const retrieveAll = async() => {
    try{
        const retrieveURL = KATEGORI_URL + '/get' 
        const result = await axios.get(retrieveURL);
        return result.data;
    }catch(err){
        return errorHandler.errorHandler(err);
    }

}
const addKategori = async(namakategori) => {
    try{
        const addKategoriURL = KATEGORI_URL + '/create' 
        const result = await axios.post(addKategoriURL , {
            namakategori
        }, {
            timeout : TIMEOUT,
            headers: {
                'Authorization' : `${token}`
            }
        }
        );
        return result.data;
    }catch(err){

        return errorHandler.errorHandler(err);
    }
}

const updateKategori = async(namakategori, id) => {
    try{
        const updateKategoriURL = KATEGORI_URL + '/update/' +id; 
        const result = await axios.put(updateKategoriURL , {
            namakategori
        }, {
            timeout : TIMEOUT,
            headers: {
                'Authorization' : `${token}`
            }
        }
        );
        return result.data;
    }catch(err){

        return errorHandler.errorHandler(err);
    }
}

const deleteOneKategori = async(id) => {
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

        return errorHandler.errorHandler(err);
    }
}

const deleteAllKategori = async() => {
    try{
        const deleteKategoriURL = KATEGORI_URL + '/delete-all'; 
        const result = await axios.delete(deleteKategoriURL ,  {
            timeout : TIMEOUT,
            headers: {
                'Authorization' : `${token}`
            }
        }
        );
        return result.data;
    }catch(err){

        return errorHandler.errorHandler(err);
    }
}
export default{
    retrieveAll ,
    addKategori ,
    updateKategori ,
    deleteOneKategori,
    deleteAllKategori
}