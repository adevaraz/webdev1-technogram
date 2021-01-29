import daftarPembacaNetworkSource from '../../datasource/api/admin/daftarPembaca'
const getAll = async() => {
    return await daftarPembacaNetworkSource.getAll()
}

const searchBy = async(params) => {
    return await daftarPembacaNetworkSource.searchBy(params)
}

const deleteBy = async(id , token) => {
    return await daftarPembacaNetworkSource.deleteBy(id , token)
}

export default{
    getAll,
    searchBy,
    deleteBy
}