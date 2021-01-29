import kategoriNetworkSource from '../../datasource/api/kategori/daftarKategori'
import kategoriCacheSource from "../../datasource/cache/kategori"
import SaveGetter from "../SaveGetter";
const retrieveAll = async() => {
    return SaveGetter(
        kategoriNetworkSource.retrieveAll,
        kategoriCacheSource.getAllKategori,
        kategoriCacheSource.insertBunchOfKategori,
        "Sukses mendapat semua kateogri"
    )

}
const addKategori = async(data, token) => {
    return kategoriNetworkSource.addKategori(data , token)
}

const updateKategori = async(idKategori, data, token) => {
    return kategoriNetworkSource.updateKategori(idKategori , data , token)
}

const deleteOneKategori = async(id, token) => {
    return await kategoriNetworkSource.deleteOneKategori(id , token)
}

const getByName = async(name) => {
    return await kategoriNetworkSource.getByName(name)
}

export default{
    retrieveAll ,
    addKategori ,
    updateKategori ,
    deleteOneKategori,
    getByName
}