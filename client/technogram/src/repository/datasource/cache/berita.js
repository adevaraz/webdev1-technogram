import {initDB} from './util/database'
import {BERITA_STORE_NAME} from './util/databaseConst'

const insertBerita = async (newBerita) => {
    const db = await initDB();
    await db.put(BERITA_STORE_NAME , newBerita);

}

const insertBunchOfBerita = async (newBeritas) => {
    try{
        const db = await initDB();
        for(let berita of newBeritas){
            await db.put(BERITA_STORE_NAME , berita);
        }
    }catch(_){
        _;
    }

}

const getAllBerita = async () => {
    try{
        const db = await initDB();
        return await db.getAll(BERITA_STORE_NAME)

    }catch(_){
        _;
    }
}

export default {
    insertBerita ,
     insertBunchOfBerita,
    getAllBerita
}
