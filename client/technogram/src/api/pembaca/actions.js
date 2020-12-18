import axios from 'axios'
import {TIMEOUT, USER_URL, USER_ROLE} from '../const'
import ErrorHandler from '../errorHandler'

const like = async (id, category, token) => {
    try {
        const currentUrl = USER_URL + `/like-news`;
        const result = await axios.post(currentUrl, {}, {
            timeout : TIMEOUT,

            params : {
                news: id,
                category: category || ''
            },
            
            headers: {
                "Authorization": token,
            }
        });

        return result.data;
    } catch (err) {
        const errorResult = await ErrorHandler.errorHandler(err, USER_ROLE, async(newToken) => {
            return await like(id, category, newToken);
        })
        return errorResult;
    }
}

const isLiked = async (token, newsId) => {
    try {
        const currentUrl = USER_URL + `/like-state`;

        const result = await axios.get(currentUrl, {
            timeout : TIMEOUT,

            params : {
                news: newsId,
            },
            
            headers: {
                "Authorization": token,
            }
        });

        return result.data;
    } catch (error) {
        const errorResult = await ErrorHandler.errorHandler(error, USER_ROLE, async(newToken) => {
            return await isLiked(newToken, newsId);
        })
        return errorResult;
    }
}

const saveBerita = async (id, token) => {
    try {
        const currentUrl = USER_URL + `/save-news`;

        const result = await axios.post(currentUrl, {}, {
            timeout : TIMEOUT,

            params : {
                news: id
            },
            
            headers: {
                "Authorization": token
            }
        });

        return result.data;
    } catch (error) {
        const errorResult = await ErrorHandler.errorHandler(error, USER_ROLE, async(newToken) => {
            return await saveBerita(id, newToken);
        })
        return errorResult;
    }
}

const isSaved = async (token, newsId) => {
    try {
        const currentUrl = USER_URL + `/save-state`;

        const result = await axios.get(currentUrl, {
            timeout : TIMEOUT,

            params : {
                news: newsId,
            },
            
            headers: {
                "Authorization": token,
            }
        });

        return result.data;
    } catch (error) {
        const errorResult = await ErrorHandler.errorHandler(error, USER_ROLE, async(newToken) => {
            return await isSaved(newToken, newsId);
        })
        return errorResult;
    }
}

export default {
    like,
    isLiked,
    saveBerita,
    isSaved
}