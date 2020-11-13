import axios from 'axios'
import {TIMEOUT, KATEGORI_URL, BERITA_URL, BASE_URL} from '../const'
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

const save = async (data) => {
    try {
        const saveUrl = BERITA_URL + "/new-news";
        const result = await axios.post(saveUrl, data, {timeout:TIMEOUT, headers: {
            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInJvbGVzIjoiXCJhZG1pblwiOyIsImlhdCI6MTYwNTI4MDQ5OCwiZXhwIjoxNjA1Mjg0MDk4fQ._LSVrguGw3I1nNgZmm8i1qkkd4Ffqliq_2XUm3gU8lQ",
        }});
        return result.data;
    } catch (err) {
        return ErrorHandler.errorHandler(err);
    }
};

export default{
    getAllKategori,
    uploadImg,
    deleteImg,
    save
};
