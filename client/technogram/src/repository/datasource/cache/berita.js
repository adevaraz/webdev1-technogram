import {initDB} from './util/database'
import {BERITA_STORE_NAME} from './util/databaseConst'

const insertBerita = async (newBerita) => {
    try{
        const db = await initDB();
        await db.put(BERITA_STORE_NAME , newBerita);
    }catch (_){
        console.log(_)
    }
}

const insertBunchOfBerita = async (newBeritas) => {
    try{
        const db = await initDB();
        for(let berita of newBeritas){
            berita.timestamp = new Date(berita.waktu_publikasi).getTime()
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

const recentBerita = async (_perPage, key, page) => {
    try{
        const currentPage = page || 1;
        const perPage = _perPage || 5;
        const offset = (currentPage-1) * perPage;
        const searchKey = key || ""

        const result = []
        const db = await initDB();
        let cursor = await db.transaction(BERITA_STORE_NAME , 'readonly').store.index('timestamp').openCursor(null , "prev");
        while(cursor){
            const berita = cursor.value
            if(berita.judul.includes(searchKey) || berita.kategori_berita === searchKey){
                result.push(berita)
            }
            cursor = await cursor.continue();
        }
        return result.slice(offset , offset +  perPage)
    }catch(_){
        console.log(_);
    }

}

const popularBerita = async (_perPage, key, page) => {
    try{
        const currentPage = page || 1;
        const perPage = _perPage || 5;
        const offset = (currentPage-1) * perPage;
        const searchKey = key || ""

        const result = []
        const db = await initDB();
        let cursor = await db.transaction(BERITA_STORE_NAME , 'readonly').store.index('jumlah_likes').openCursor(null , "prev");
        while(cursor){
            const berita = cursor.value
            if(berita.judul.includes(searchKey) || berita.kategori_berita === searchKey){
                result.push(berita)
            }
            cursor = await cursor.continue();
        }
        return result.slice(offset , offset +  perPage)
    }catch(_){
        console.log(_);
    }

}

const get = async (id) => {
    try {
        const db = await initDB();
        return await db.get(BERITA_STORE_NAME , IDBKeyRange.only(parseInt(id)));
    } catch (_) {
        console.log(_);
    }
}

export default {
    insertBerita ,
    insertBunchOfBerita,
    getAllBerita,
    recentBerita,
    mostLikedBerita: popularBerita,
    get
}
