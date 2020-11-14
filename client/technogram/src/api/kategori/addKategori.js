import axios from 'axios'
import {KATEGORI_URL} from '../const'

const addKategori = async(nama_kategori) => {
    try{
        const addKategoriURL = KATEGORI_URL + '/new-category' 
        const result = await axios.post(addKategoriURL , {
            nama_kategori
        },
        );
        return result.data;
    }catch(err){

        return null;
    }
}

export default{
    addKategori
}