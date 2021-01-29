import actionNetwrokSource from '../../datasource/api/pembaca/actions'
const like = async (id, category, token) => {
    return await actionNetwrokSource.like(id , category , token)
}

const isLiked = async (token, newsId) => {
    return await actionNetwrokSource.isLiked(token , newsId)
}

const saveBerita = async (id, token) => {
    return await actionNetwrokSource.saveBerita(id , token)
}

const isSaved = async (token, newsId) => {
    return await actionNetwrokSource.isSaved(token , newsId)
}

export default {
    like,
    isLiked,
    saveBerita,
    isSaved
}