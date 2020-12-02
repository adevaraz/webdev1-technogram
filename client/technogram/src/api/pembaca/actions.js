import axios from 'axios'
import {TIMEOUT, USER_URL} from '../const'
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
        return ErrorHandler.errorHandler(err);
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
        return ErrorHandler.errorHandler(error);
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
        return ErrorHandler.errorHandler(error);
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
        return ErrorHandler.errorHandler(error);
    }
}

export default {
    like,
    isLiked,
    saveBerita,
    isSaved
}