import beritaNetworkSource from "../../datasource/api/berita/berita"

const getAllKategori = async () => {
    return await beritaNetworkSource.getAllKategori()
};

const uploadImg = async (formData) => {
    return await beritaNetworkSource.uploadImg(formData)
};

const deleteImg = async (image) => {
    return await beritaNetworkSource.deleteImg(image)
};

const save = async (data , token) => {
    return await beritaNetworkSource.save(data,token)
};

const update = async (idBerita, data , token) => {
    return await beritaNetworkSource.update(idBerita , data ,token)
};

const get = async (id) => {
    return await beritaNetworkSource.get(id)
};

const incrementViewer = async(id) => {
    return await beritaNetworkSource.incrementViewer(id)
}

const recentBerita = async ( perPage , key , page ) => {
    return await beritaNetworkSource.recentBerita(perPage , key , page)
}

const getAllBerita = async () => {
    return await beritaNetworkSource.getAllBerita()
};

const popularBerita = async ( perPage , key , page ) => {
    return await beritaNetworkSource.popularBerita(perPage , key , page)
}

const getByCat = async (perPage, category, page) => {
    return await beritaNetworkSource.getByCat(perPage , category , page)
}

const getUserNotificatedNews = async (token , perPage , key , page )  => {
    return await beritaNetworkSource.getUserNotificatedNews(token , perPage , key , page)
}

const savedBeritaList = async ( perPage , key , page, token ) => {
    return await beritaNetworkSource.savedBeritaList(perPage , key , page , token)
}

export default{
    getAllKategori,
    uploadImg,
    deleteImg,
    save,
    update,
    get,
    incrementViewer,
    recentBerita,
    popularBerita,
    getByCat,
    savedBeritaList,
    getUserNotificatedNews,
    getAllBerita
};
