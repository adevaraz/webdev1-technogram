import axios from 'axios'
import {TIMEOUT, KATEGORI_URL, BERITA_URL, USER_URL, BASE_URL, ADMIN_ROLE , USER_ROLE} from '../const'
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

const incrementViewer = async(id) => {
    try {
        const currentUrl = BERITA_URL + `/update-reader/${id}`;
        const result = await axios.put(currentUrl, {}, { timeout: TIMEOUT });

        return result.data;
    } catch (error) {
        return ErrorHandler.errorHandler(error);
    }
}

const recentBerita = async ( perPage , key , page ) => {
    try{
        const recentURL = BERITA_URL + '/recent'
        const result = await axios.get(recentURL , {
            timeout : TIMEOUT,
            params : {
                perpage : perPage ||  3,
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
                perpage: perPage || 4,
                category: category || '',
                page: page || 1
            }
        });

        return result.data;
    } catch (error) {
        return ErrorHandler.errorHandler(error);
    }
}

const getUserNotificatedNews = async (token , perPage , key , page )  => {
    try {
        const notificationURL = USER_URL + `/notifikasi`;
        const result = await axios.get(notificationURL, 
            {
            timeout: TIMEOUT, 
            headers: {
                "Authorization": token,
            },
            params : {
                perpage : perPage ||  6,
                key : key || '',
                page : page || 1
            }
        });
        return result.data;
    } catch (err) {
        const errorResult = await ErrorHandler.errorHandler(err , USER_ROLE , async (newToken) => {
            return await getUserNotificatedNews(newToken ,  perPage , key , page);
        })
        return errorResult;
    }
}

const savedBeritaList = async ( perPage , key , page, token ) => {
    try{
        const savedURL = USER_URL + '/get-save'
        const result = await axios.get(savedURL , {
            timeout : TIMEOUT,
            params : {
                perpage : perPage ||  6,
                key : key || '',
                page : page || 1
            },
            headers: {
                'Authorization' : `${token}`
            }
        });
        return result.data;
    }catch(err){
        return ErrorHandler.errorHandler(err);
    }
}

export default{
    getAllKategori,
    uploadImg,
    deleteImg,
    save,
    update,
    get,
    incrementViewer,
    recentBerita,
    popularBerita,
    getByCat,
    savedBeritaList,
    getUserNotificatedNews
};
