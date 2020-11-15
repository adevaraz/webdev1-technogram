import axios from 'axios'
import {NEWS_URL, TIMEOUT} from '../const'
import ErrorHandler from '../errorHandler'

const getAll = async() => {
    try {
        const getAllURL = NEWS_URL + '/all-news'
        const result = await axios.get(getAllURL);
        return result.data;
    } catch(err) {
        return ErrorHandler.errorHandler(err);
    }
}

const searchBy = async(key) => {
    try {
        const searchByURL = NEWS_URL + `/search?key=${key}`
        const result = await axios.get(searchByURL);
        return result.data;
    } catch(err) {
        return ErrorHandler.errorHandler(err);
    }
}

const publish = async(id) => {
    try {
        const publishByURL = NEWS_URL + `/publish/${id}`
        const result = await axios.put(publishByURL, {
            timeout : TIMEOUT,
            headers: {
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInJvbGVzIjoiXCJhZG1pblwiOyIsImlhdCI6MTYwNTQxOTUwMiwiZXhwIjoxNjA1NDIzMTAyfQ.wSHP7ZEu-9QReF8QSj720hWcgbCoyeJAMBi98C3Hcec"
            }
        })
        return result.data;
    } catch(err) {
        return ErrorHandler.errorHandler(err);
    }
}

const deleteBy = async(id) => {
    try{
        const deleteByURL = NEWS_URL + `/delete/${id}` 
        const result = await axios.delete(deleteByURL,
        {
            timeout : TIMEOUT,
            headers: {
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInJvbGVzIjoiXCJhZG1pblwiOyIsImlhdCI6MTYwNTQxOTUwMiwiZXhwIjoxNjA1NDIzMTAyfQ.wSHP7ZEu-9QReF8QSj720hWcgbCoyeJAMBi98C3Hcec"
            }
        })
        return result.data;
    }catch(err){
        return ErrorHandler.errorHandler(err);
    }
}

export default {
    getAll,
    searchBy,
    publish,
    deleteBy
}