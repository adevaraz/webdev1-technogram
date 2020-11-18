import axios from 'axios'
import {BERITA_URL, TIMEOUT} from '../const'
import ErrorHandler from '../errorHandler'

const getAll = async() => {
    try {
        const getAllURL = BERITA_URL + '/all-news'
        const result = await axios.get(getAllURL);
        return result.data;
    } catch(err) {
        return ErrorHandler.errorHandler(err);
    }
}

const searchBy = async(key) => {
    try {
        const searchByURL = BERITA_URL + `/search?key=${key}`
        const result = await axios.get(searchByURL);
        return result.data;
    } catch(err) {
        return ErrorHandler.errorHandler(err);
    }
}

const publish = async(id) => {
    try {
        const publishByURL = BERITA_URL + `/publish/${id}`
        const result = await axios.put(publishByURL, {
            timeout : TIMEOUT,
            headers: {
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInJvbGVzIjoiXCJhZG1pblwiOyIsImlhdCI6MTYwNTY3ODk3NSwiZXhwIjoxNjA1NjgyNTc1fQ.enNWV5rcH0PtbeWBwg1yKSd9b3dApK6VHq3whVCCSEw"
            }
        })
        return result.data;
    } catch(err) {
        return ErrorHandler.errorHandler(err);
    }
}

const deleteBy = async(id) => {
    try{
        const deleteByURL = BERITA_URL + `/delete/${id}` 
        const result = await axios.delete(deleteByURL,
        {
            timeout : TIMEOUT,
            headers: {
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInJvbGVzIjoiXCJhZG1pblwiOyIsImlhdCI6MTYwNTY3ODk3NSwiZXhwIjoxNjA1NjgyNTc1fQ.enNWV5rcH0PtbeWBwg1yKSd9b3dApK6VHq3whVCCSEw"
            }
        })
        return result.data;
    }catch(err){
        return ErrorHandler.errorHandler(err);
    }
}

// const deleteAll = async() => {
//     try{
//         const deleteAll = NEWS_URL + '/delete-all'
//         const result = await axios.delete(deleteAll,
//         {
//             timeout : TIMEOUT,
//             headers: {
//                 "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInJvbGVzIjoiXCJhZG1pblwiOyIsImlhdCI6MTYwNTYyMTM0MiwiZXhwIjoxNjA1NjI0OTQyfQ.7YzYqk4TAxr6RPHjd2pUtOXyyMpKk8ELQ_B_iFQiew4"
//             }
//         })
//         return result.data;
//     }catch(err){
//         return ErrorHandler.errorHandler(err);
//     }
// }

export default {
    getAll,
    searchBy,
    publish,
    deleteBy,
    //deleteAll
}