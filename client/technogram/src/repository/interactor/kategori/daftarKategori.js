import kategoriNetworkSource from '../../datasource/api/kategori/daftarKategori'
const retrieveAll = async() => {
    return kategoriNetworkSource.retrieveAll()

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