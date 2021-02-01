import {initDB} from './util/database'
import {KATEGORI_STORE_NAME} from './util/databaseConst'

const getAllKategori = async () => {
    try{
        const db = await initDB();
        return await db.getAll(KATEGORI_STORE_NAME)
    }catch(_){
        _;
    }
}

const insertBunchOfKategori = async (newCategories) => {
    try{
        const db = await initDB();
        for(let category of newCategories){
            await db.put(KATEGORI_STORE_NAME , category);
        }
    }catch(_){
        _;
    }

}

export default {
    getAllKategori,
    insertBunchOfKategori
}