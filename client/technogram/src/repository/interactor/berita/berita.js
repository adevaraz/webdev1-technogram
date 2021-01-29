import beritaNetworkSource from "../../datasource/api/berita/berita"
import beritaCacheSource from "../../datasource/cache/berita"
import kategoriNetworkSource from "../../datasource/cache/kategori"
import SaveGetter from "../SaveGetter";
const getAllKategori = async () => {
    return SaveGetter(
        beritaNetworkSource.getAllKategori,
        kategoriNetworkSource.getAllKategori,
        kategoriNetworkSource.insertBunchOfKategori,
        "Sukses mendapat semua kateogri"
    )
};

const uploadImg = async (formData) => {
    return await beritaNetworkSource.uploadImg(formData)
};

const deleteImg = async (image) => {
    return await beritaNetworkSource.deleteImg(image)
};

const save = async (data, token) => {
    return await beritaNetworkSource.save(data, token)
};

const update = async (idBerita, data, token) => {
    return await beritaNetworkSource.update(idBerita, data, token)
};

const get = async (id) => {
    return await beritaNetworkSource.get(id)
};

const incrementViewer = async (id) => {
    return await beritaNetworkSource.incrementViewer(id)
}

const recentBerita = async (perPage, key, page) => {
    return await SaveGetter(
        async() => {
            return await beritaNetworkSource.recentBerita(perPage , key , page)
        },
        async() => {
            return await beritaCacheSource.recentBerita(perPage , key , page)
        },
        beritaCacheSource.insertBunchOfBerita,
        "Success get berita from cache"

    )
}

const getAllBerita = async () => {
    return await SaveGetter(
        beritaNetworkSource.getAllBerita ,
        beritaCacheSource.getAllBerita ,
        beritaCacheSource.insertBunchOfBerita,
        "Berhasil mendapatkan semua berita ")
};

const popularBerita = async (perPage, key, page) => {
    return await SaveGetter(
        async() => {
            return await beritaNetworkSource.popularBerita(perPage , key , page)
        },
        async() => {
            return await beritaCacheSource.mostLikedBerita(perPage , key , page)
        },
        beritaCacheSource.insertBunchOfBerita,
        "Success get berita from cache"

    )
}

const getByCat = async (perPage, category, page) => {
    return await beritaNetworkSource.getByCat(perPage, category, page)
}

const getUserNotificatedNews = async (token, perPage, key, page) => {
    return await beritaNetworkSource.getUserNotificatedNews(token, perPage, key, page)
}

const savedBeritaList = async (perPage, key, page, token) => {
    return await beritaNetworkSource.savedBeritaList(perPage, key, page, token)
}

export default {
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
