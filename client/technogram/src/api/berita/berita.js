import axios from 'axios'
import {TIMEOUT, KATEGORI_URL, BERITA_URL, BASE_URL, ADMIN_ROLE} from '../const'
import ErrorHandler from '../errorHandler'

const getAllKategori = async () => {
    try {
        const kategoriUrl = KATEGORI_URL + "/get";
        const result = await axios.get(kategoriUrl,{},{timeout:TIMEOUT});
        return result.data;
    } catch (err) {
        return ErrorHandler.errorHandler(err);
    }
};

const uploadImg = async (formData) => {
    try {
        const beritaUrl = BERITA_URL + "/new-image";
        const result = await axios.post(beritaUrl,formData,{timeout:TIMEOUT});
        return result.data;
    } catch (err) {
        return ErrorHandler.errorHandler(err);
    }
};

const deleteImg = async (image) => {
    try {
        //http://localhost:3000/app/public/images/eadd632f-3adc-4cc4-b891-831ef19f9c95.jpeg
        const imageUrl = image.substring(BASE_URL.length + 1, image.length);
        const deleteImageUrl = BERITA_URL + "/delete-image";
        const result = await axios.post(deleteImageUrl, {url_gambar: imageUrl}, {timeout:TIMEOUT});
        return result.data; 
    } catch (err) {
        return ErrorHandler.errorHandler(err);
    }
};

const save = async (data , token) => {
    try {
        const saveUrl = BERITA_URL + "/new-news";
        const result = await axios.post(saveUrl, data, {timeout:TIMEOUT, headers: {
            "Authorization": token,
        }});
        return result.data;
    } catch (err) {
        const errorResult = await ErrorHandler.errorHandler(err , ADMIN_ROLE , async (newToken) => {
            return await save(data , newToken);
        })
        return errorResult;
    }
};

const update = async (idBerita, data , token) => {
    try {
        const updateUrl = BERITA_URL + `/update/${idBerita}`;
        const result = await axios.put(updateUrl, data, {timeout: TIMEOUT, headers: {
            "Authorization": token,
        }});
        return result.data;
    } catch (err) {
        const errorResult = await ErrorHandler.errorHandler(err , ADMIN_ROLE , async (newToken) => {
            return await save(data , newToken);
        })
        return errorResult;
    }
};

const get = async (id) => {
    try {
        const getUrl = BERITA_URL + `/${id}`;
        const result = await axios.get(getUrl, {}, {timeout: TIMEOUT});
        return result.data;
    } catch (err) {
        return ErrorHandler.errorHandler(err);
    }
};


const recentBerita = async ( perPage , key , page ) => {
    try{
        const recentURL = BERITA_URL + '/recent'
        const result = await axios.get(recentURL , {
            timeout : TIMEOUT,
            params : {
                perpage : perPage ||  6,
                key : key || '',
                page : page || 1
            }
        });
        return result.data;
    }catch(err){
        return ErrorHandler.errorHandler(err);
    }
}

const popularBerita = async ( perPage , key , page ) => {
    try{
        const recentURL = BERITA_URL + '/most-liked'
        const result = await axios.get(recentURL , {
            timeout : TIMEOUT,
            params : {
                perpage : perPage ||  6,
                key : key || '',
                page : page || 1
            }
        });
        return result.data;
    }catch(err){
        return ErrorHandler.errorHandler(err);
    }
}

const getByCat = async (perPage, category, page) => {
    try {
        const currentUrl = BERITA_URL + '/';

        const result = await axios.get(currentUrl, {
            params: {
                perpage: perPage || 1,
                category: category || '',
                page: page || 1
            }
        })

        return result.data;
    } catch (error) {
        return ErrorHandler.errorHandler(error);
    }
}

export default{
    getAllKategori,
    uploadImg,
    deleteImg,
    save,
    update,
    get,
    recentBerita,
    popularBerita,
    getByCat
};
