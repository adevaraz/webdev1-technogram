import userNetworkSouce from '../../datasource/api/pembaca/profilePembaca'

const savedBerita = async ( perPage , key , page, token ) => {
    return await userNetworkSouce.savedBerita(perPage , key , page , token)
}

export default{
    savedBerita
}