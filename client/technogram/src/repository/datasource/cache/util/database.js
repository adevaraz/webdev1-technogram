import {openDB} from 'idb/with-async-ittr'
import {BERITA_STORE_NAME, CURRENT_VERSION, DATABASE_NAME, KATEGORI_STORE_NAME} from "./databaseConst";

// eslint-disable-next-line no-unused-vars
export const initDB = () => {
    if(!('indexedDB' in window)){
        throw Error('Browser doesnt support indexedDB')
    }
    return openDB(DATABASE_NAME , CURRENT_VERSION , {

        upgrade(database) {
            const store =database.createObjectStore(BERITA_STORE_NAME ,  {
                keyPath : 'id_berita',
                autoIncrement : false
            })
            store.createIndex("timestamp" , 'timestamp' , {unique : false})
            store.createIndex("jumlah_likes" , 'jumlah_likes' , {unique : false})

            database.createObjectStore(KATEGORI_STORE_NAME , {
                keyPath : 'id_kategori',
                autoIncrement : false
            })
        }
    })
}